import "./GoalCards.css";
import { useNavigate } from "react-router-dom";

function GoalCards({ goals = [] }) {
  const navigate = useNavigate();

  if (!goals.length) {
    return <p>No goals yet. Click “Add a Goal” to get started.</p>;
  }

  return (
    <>
      {goals.map((goal) => (
        <div className="goal-card" key={goal.id}>
          <div className="goal-card__header">
            <div className="goal-card__image-wrap">
              {goal.coverImageUrl ? (
                <img
                  className="goal-card__image"
                  src={goal.coverImageUrl}
                  alt={goal.title}
                />
              ) : (
                <div className="goal-card__image goal-card__image--placeholder">
                  No image
                </div>
              )}
            </div>

            <div className="goal-card__title-and-progress-bar">
              {/* You didn’t have category from backend yet */}
              <h2 className="goal-card__category">{goal.slot}</h2>

              <div className="goal-card__progress-bar">
                <div
                  className="goal-card__progress-bar__fill"
                  style={{ width: `${goal.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <h2 className="goal-card__title">{goal.title}</h2>

          <button
            className="goal-card__manage-goal-button"
            onClick={() => navigate(`/goals/${goal.id}`)}
          >
            View Goal
          </button>
        </div>
      ))}
    </>
  );
}

export default GoalCards;
