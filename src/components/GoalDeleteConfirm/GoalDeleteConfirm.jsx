import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import "./GoalDeleteConfirm.css";

function GoalDeleteConfirm() {
  const navigate = useNavigate();
  const { goalId } = useParams();

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = () => {
    setIsDeleting(true);
    setError("");

    api(`/goals/${goalId}`, { method: "DELETE" })
      .then(() => {
        navigate("/goals/deleted");
      })
      .catch((e) => {
        console.error(e);
        setError(e.message || "Could not delete goal. Try again.");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div className="delete-confirm">
      <h1 className="delete-confirm__title">DELETE THIS GOAL?</h1>

      <div className="delete-confirm__msg">
        You are about to delete this goal. Are you sure you want to delete the
        goal?
      </div>

      {error && <p className="delete-confirm__error">{error}</p>}

      <button
        type="button"
        className="delete-confirm__return"
        onClick={() => navigate(`/goals/${goalId}`)}
        disabled={isDeleting}
      >
        Return to Goal
      </button>

      <button
        type="button"
        className="delete-confirm__delete"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete Goal"}
      </button>
    </div>
  );
}

export default GoalDeleteConfirm;
