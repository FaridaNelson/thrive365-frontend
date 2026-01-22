import "./GoalPage.css";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";

function GoalPage() {
  const navigate = useNavigate();
  const { goalId } = useParams();

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
        const data = await api(`/goals/${goalId}`); // <-- backend has GET /goals/:goalId
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

  const toggleStep = (index) => {
    if (isPaused) return;
    setSteps((prev) =>
      prev.map((s, i) => (i === index ? { ...s, done: !s.done } : s)),
    );
  };

  // Guard render
  if (loading) return <p style={{ padding: 24 }}>Loading goal...</p>;
  if (error) return <p style={{ padding: 24 }}>Error: {error}</p>;
  if (!goal) return <p style={{ padding: 24 }}>Goal not found.</p>;

  return (
    <div className={`goal-page ${isPaused ? "goal-page--paused" : ""}`}>
      <div className="goal-page__content">
        <header className="goal-page__header">
          <h1 className="goal-page__title">{goal.title}</h1>
          <h2 className="goal-page__category">{goal.category}</h2>
        </header>

        <div className="goal-page__card">
          <h3 className="goal-page__card-title">Steps to achieving goal</h3>
          <ul className="goal-page__steps">
            {steps.map((step, idx) => (
              <li
                key={idx}
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
          <div className="goal-page__progress-bar">
            <div
              className="goal-page__progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="goal-page__actions">
          <button
            className="goal-page__btn goal-page__btn--primary"
            disabled={isPaused}
            type="button"
          >
            Edit Goal
          </button>

          <button
            className="goal-page__btn goal-page__btn--primary"
            type="button"
            onClick={() => {
              // later: PATCH status paused/active
              // for now local:
              setGoal((g) => ({
                ...g,
                status: g.status === "paused" ? "active" : "paused",
              }));
            }}
          >
            {isPaused ? "Resume Goal" : "Pause Goal"}
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
      </div>
    </div>
  );
}

export default GoalPage;
