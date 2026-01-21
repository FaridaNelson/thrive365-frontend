import { Link } from "react-router-dom";
import "./GoalDeleted.css";

function GoalDeleted() {
  return (
    <div className="goal-deleted">
      <h1 className="goal-deleted__title">GOAL DELETED</h1>
      <p className="goal-deleted__subtitle">
        Goal has successfully been deleted
      </p>

      <Link className="goal-deleted__link" to="/dashboard">
        Return to Dashboard
      </Link>
    </div>
  );
}

export default GoalDeleted;
