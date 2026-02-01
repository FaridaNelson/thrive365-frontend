import "./GoalPage.css";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";

function GoalPage() {
  const navigate = useNavigate();
  const { goalId } = useParams();

  const [saving, setSaving] = useState(false);
  const [goal, setGoal] = useState(null);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // status should come from backend goal.status
  const isPaused = goal?.status === "paused";

  useEffect(() => {
    let ignore = false;

    async function loadGoal() {
      try {
        setLoading(true);
        setError("");
        const data = await api(`/goals/${goalId}`); // backend has GET /goals/:goalId
        if (ignore) return;

        setGoal(data);
        setSteps(Array.isArray(data.steps) ? data.steps : []);
      } catch (e) {
        if (!ignore) setError(e.message || "Failed to load goal");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadGoal();
    return () => {
      ignore = true;
    };
  }, [goalId]);

  const progressPercent = useMemo(() => {
    if (!steps.length) return 0;
    const doneCount = steps.filter((s) => s.done).length;
    return Math.round((doneCount / steps.length) * 100);
  }, [steps]);

  const toggleStep = async (index) => {
    if (isPaused || saving) return;
    // Update UI immediately (optimistic update)
    const prevSteps = steps; // rollback reference
    const nextSteps = steps.map((s, i) =>
      i === index ? { ...s, done: !s.done } : s,
    );
    setSteps(nextSteps);
    // Save to backend
    try {
      setSaving(true);
      const updated = await api(`/goals/${goalId}`, {
        method: "PATCH",
        body: JSON.stringify({ steps: nextSteps }),
      });
      // Update local state with response from backend
      if (updated?.goal) {
        setGoal(updated.goal);
        setSteps(updated.goal.steps || nextSteps);
      }
    } catch (e) {
      // rollback if save fails
      setSteps(steps);
      setError(e.message || "Failed to save step progress");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePause = async () => {
    if (!goal || saving) return;

    const prevGoal = goal; // rollback reference
    const nextStatus = goal.status === "paused" ? "active" : "paused";
    // Optimistic update
    setGoal((g) => ({ ...g, status: nextStatus }));

    try {
      setSaving(true);
      const updated = await api(`/goals/${goalId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
      if (updated?.goal) setGoal(updated.goal);
      else setGoal((g) => ({ ...g, status: updated.status || nextStatus }));
    } catch (e) {
      // rollback on error
      setGoal(prevGoal);
      setError(e.message || "Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  // Guard render
  if (loading) return <p style={{ padding: 24 }}>Loading goal...</p>;
  if (error) return <p style={{ padding: 24 }}>Error: {error}</p>;
  if (!goal) return <p style={{ padding: 24 }}>Goal not found.</p>;

  const cover = goal.imageUrls?.[0];

  return (
    <div className={`goal-page ${isPaused ? "goal-page--paused" : ""}`}>
      <div className="goal-page__content">
        <header className="goal-page__header">
          <h1 className="goal-page__title">{goal.title}</h1>
          <h2 className="goal-page__category">{goal.category}</h2>
        </header>
        {cover ? (
          <img className="goal-page__image" src={cover} alt="Goal Image" />
        ) : (
          <div className="goal-page__image goal-page__image--placeholder">
            No Image Available
          </div>
        )}
        <div className="goal-page__card">
          <h3 className="goal-page__card-title">Steps to achieving goal</h3>
          <ul className="goal-page__steps">
            {steps.map((step, idx) => (
              <li
                key={step._id || idx}
                className={`goal-page__step ${step.done ? "is-done" : ""}`}
                onClick={() => toggleStep(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleStep(idx);
                }}
                aria-pressed={step.done}
              >
                <span
                  className={
                    step.done
                      ? "goal-page__dot goal-page__dot--done"
                      : "goal-page__dot"
                  }
                />
                <span className="goal-page__step-text">{step.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="goal-page__progress">
          <div
            className="goal-page__progress-bar"
            style={{
              background: `color-mix(in srgb, ${
                goal.displayColor || "blue"
              } 40%, transparent)`,
            }}
          >
            <div
              className="goal-page__progress-fill"
              style={{
                width: `${progressPercent}%`,
                background: `${goal.displayColor || "blue"}`,
              }}
            />
          </div>
        </div>

        <div className="goal-page__actions">
          <button
            className="goal-page__btn goal-page__btn--primary"
            disabled={isPaused || saving}
            type="button"
          >
            Edit Goal
          </button>

          <button
            className="goal-page__btn goal-page__btn--primary"
            type="button"
            onClick={handleTogglePause}
            disabled={saving}
          >
            {goal.status === "paused" ? "Resume Goal" : "Pause Goal"}
          </button>

          <button
            type="button"
            className="goal-page__btn goal-page__btn--danger"
            onClick={() => navigate(`/goals/${goalId}/delete`)}
          >
            Delete Goal
          </button>
        </div>

        <div className="goal-page__back">
          <Link to="/dashboard" className="goal-page__back-btn">
            Return to Dashboard
          </Link>
        </div>

        <div className="goal-page__notes">
          <label htmlFor="notes">Notes</label>
          <input
            id="notes"
            type="text"
            placeholder="Add any notes you need"
            value={goal.notes || ""}
          />
        </div>
      </div>
    </div>
  );
}

export default GoalPage;
