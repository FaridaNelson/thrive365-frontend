import "./GoalCards.css";
import { initialCards } from "../../../utils/configs";
import deleteIcon from "../../../assets/delete.png"
function GoalCards() {
  return (
    <>
      {initialCards.map((card, idx) => (
        <div className="goal-card" key={`${card.Title}-${idx}`}>
          <div className="goal-card__header">
            <h2 className="goal-card__title">{card.Title}</h2>
            <button className="goal-card__delete-btn">
                <img src={deleteIcon} alt="delete icon" className="goal-card__delete-btn-image"/>
            </button>
          </div>

          <p className="goal-card__definition">{card.Definition}</p>
          <p className="goal-card__reason">{card.Reason}</p>

          <img className="goal-card__image" src={card.Image} alt={card.Title} />

          <div className="goal-card__steps">
            {card.SteppingStones.map((step, stepIdx) => (
              <p
                className="goal-card__step"
                key={`${card.Title}-step-${stepIdx}`}
              >
                • {step}
              </p>
            ))}
            <button className="goal-card__manage-goal-button">Manage Goal</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default GoalCards;
