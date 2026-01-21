import "./GoalCards.css";
import { initialCards } from "../../../utils/configs";
function GoalCards() {
  return (
    <>
      {initialCards.map((card, idx) => (
        <div className="goal-card" key={`${card.Title}-${idx}`}>
          <div className="goal-card__header">
            <img
              className="goal-card__image"
              src={card.Image}
              alt={card.Title}
            />
            <div className="goal-card__title-and-progress-bar">
              <h2 className="goal-card__category">{card.Category}</h2>
              <div className="goal-card__progress-bar">
                <div className="goal-card__progress-bar__fill"></div>
              </div>
            </div>
          </div>
          <h2 className="goal-card__title">{card.Title}</h2>
          <button className="goal-card__manage-goal-button">View Goal</button>
        </div>
      ))}
    </>
  );
}

export default GoalCards;
