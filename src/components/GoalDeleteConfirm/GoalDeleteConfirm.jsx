import { useNavigate, useParams } from "react-router-dom";
// import api from "../../utils/api"; // import api utility for backend interaction
import "./GoalDeleteConfirm.css";

function GoalDeleteConfirm() {
  const navigate = useNavigate();
  const { goalId } = useParams();

  //     Uncomment and implement when ready to connect to Backend
  //
  //     const handleDelete = async () => {
  //     try {
  //       await api.deleteGoal(goalId); // implement later if not ready
  //       navigate(`/goals/${goalId}/deleted`);
  //     } catch (e) {
  //       console.error(e);
  //       alert("Could not delete goal. Try again.");
  //     }
  //   };

  return (
    <div className="delete-confirm">
      <h1 className="delete-confirm__title">DELETE THIS GOAL?</h1>

      <div className="delete-confirm__msg">
        You are about to delete this goal. Are you sure you want to delete the
        goal?
      </div>

      <button
        type="button"
        className="delete-confirm__return"
        onClick={() => navigate(`/goals/${goalId}`)}
      >
        Return to Goal
      </button>

      <button
        type="button"
        className="delete-confirm__delete"
        onClick={() => navigate(`/goals/${goalId}/deleted`)} // replace with handleDelete when ready to connect the Backend
      >
        Delete Goal
      </button>
    </div>
  );
}

export default GoalDeleteConfirm;
