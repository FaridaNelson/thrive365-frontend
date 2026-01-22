import "./GoalCards.css";
import { useNavigate } from "react-router-dom";

function GoalCards({ goals = [] }) {
  const navigate = useNavigate();
  if (!goals.length) {
    return (
      <div className="dashboard__empty">
        <p className="no-goals-message">
          No goals yet. Click “Add a Goal” to get started.
        </p>
        <button
          className="add-a-goal-button"
          onClick={() => navigate("/add-a-goal")}
        >
          Add a Goal
        </button>
      </div>
    );
  }

  return (
    <>
      {goals.map((goal) => {
        const goalId = goal.id || goal._id; // IMPORTANT: support Mongo _id

        return (
          <div
            className="goal-card"
            key={goalId}
            style={{
              borderLeft: `8px solid ${goal.displayColor || "#CFCFCF"}`,
            }}
          >
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
                {/* pick ONE of these (you had it twice) */}
                <h2 className="goal-card__category">{goal.category}</h2>

                <div className="goal-card__progress-bar">
                  <div
                    className="goal-card__progress-bar__fill"
                    style={{ width: `${goal.progressPercent || 0}%` }}
                  />
                </div>
              </div>
            </div>

            <h2 className="goal-card__title">{goal.title}</h2>

            <button
              className="goal-card__manage-goal-button"
              onClick={() => navigate(`/goals/${goalId}`)}
            >
              View Goal
            </button>
          </div>
        );
      })}
    </>
  );
}

export default GoalCards;
