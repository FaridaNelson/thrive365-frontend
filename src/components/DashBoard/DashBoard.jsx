import "./DashBoard.css";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import GoalCards from "../GoalCards/GoalCards/GoalCards";
import GoalPercentageCounter from "../GoalPercentageCounter/GoalPercentageCounter";
import { api } from "../../utils/api";

function DashBoard() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();

  const loadGoals = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api("/goals");
      setGoals(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load goals");
    } finally {
      setLoading(false);
    }
  }, []);

  // Re-fetch whenever you navigate back to dashboard
  useEffect(() => {
    loadGoals();
  }, [loadGoals, location.key]);

  const completedCount = useMemo(
    () => goals.filter((g) => g.status === "completed").length,
    [goals],
  );

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Your current goals</h1>

      <GoalPercentageCounter completed={completedCount} total={goals.length} />

      <p className="dashboard__subtitle">
        The yearly goal progress donut represents the percentage of total goals
        completed during the year. It is calculated by dividing the number of
        completed goals by the total number of goals set, then converting that
        value into a percentage. This percentage determines how much of the
        donut is filled, giving a quick visual snapshot of overall yearly
        progress.
      </p>

      {loading && <p>Loading goals...</p>}
      {error && <p className="dashboard__error">{error}</p>}

      <div className="dashboard__items">
        {!loading && !error && <GoalCards goals={goals} />}
      </div>
    </div>
  );
}

export default DashBoard;
