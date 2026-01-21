import "./DashBoard.css";
import GoalCards from "../GoalCards/GoalCards/GoalCards";
import GoalPercentageCounter from "../GoalPercentageCounter/GoalPercentageCounter";
function DashBoard(){
    return(
        //put card components
        //this is just an example for Blake
        <div className="dashboard">
            <h1 className="dashboard__title">Your current goals</h1>
            <GoalPercentageCounter/>
            <p className="dashboard__subtitle">The yearly goal progress donut represents the percentage of total goals completed during the year. It is calculated by dividing the number of completed goals by the total number of goals set, then converting that value into a percentage. This percentage determines how much of the donut is filled, giving a quick visual snapshot of overall yearly progress.</p>
            <div className="dashboard__items">
              <GoalCards/>
            </div>
        </div>
    )
}

export default DashBoard;