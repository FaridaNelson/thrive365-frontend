import "./GoalPage.css";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function GoalPage() {
  const [status, setStatus] = useState("active");
  const isPaused = status === "paused";

  const handleTogglePause = () => {
    setStatus((prev) => (prev === "paused" ? "active" : "paused"));
  };

  const navigate = useNavigate();
  const { goalId } = useParams();

  const goal = {
    id: goalId,
    title: "Lose 20lbs by July",
    category: "Fitness",
    definition: "I would like to lose 20lbs by July.",
    reason:
      "There are a few weddings that I have to attend and my overall health is important to me.",
    steps: [
      { text: "Find a gym that I am comfortable with", done: true },
      { text: "Join the gym", done: false },
      { text: "Workout 3-5 times a week", done: false },
    ],
    progressPercent: 33,
    notes:
      "This fitness goal is focused on building sustainable habits that improve strength, endurance, and overall well-being over time...",
    coverImageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=60",
  };

  const [steps, setSteps] = useState(goal.steps);

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

  return (
    <div className={`goal-page ${isPaused ? "goal-page--paused" : ""}`}>
      <div className="goal-page__content">
        <div className="goal-page__disabled-area">
          <header className="goal-page__header">
            <h1 className="goal-page__title">{goal.title}</h1>
            <h2 className="goal-page__category">{goal.category}</h2>
          </header>

          <div className="goal-page__image-wrap">
            {goal.coverImageUrl ? (
              <img
                className="goal-page__image"
                src={goal.coverImageUrl}
                alt={goal.title}
              />
            ) : (
              <div className="goal-page__image-placeholder">Add photo</div>
            )}

            <button
              type="button"
              className="goal-page__image-btn"
              disabled={isPaused}
            >
              Add photo
            </button>
          </div>

          <div className="goal-page__card">
            <h3 className="goal-page__card-title">Goal definition</h3>
            <p className="goal-page__text">{goal.definition}</p>
          </div>

          <div className="goal-page__card">
            <h3 className="goal-page__card-title">Goal reason</h3>
            <p className="goal-page__text">{goal.reason}</p>
          </div>

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
            onClick={handleTogglePause}
            type="button"
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

        <div className="goal-page__note">
          <h3 className="goal-page__note-title">Note</h3>
          <div className="goal-page__note-box">{goal.notes || "Add note"}</div>
        </div>

        <div className="goal-page__back">
          <Link
            to="/dashboard"
            className={`goal-page__back-btn ${isPaused ? "is-disabled" : ""}`}
            onClick={(e) => {
              if (isPaused) e.preventDefault();
            }}
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GoalPage;
