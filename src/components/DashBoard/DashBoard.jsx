import "./DashBoard.css"
import GoalCards from "../GoalCards/GoalCards/GoalCards"
function DashBoard(){
    return(
        //put card components
        //this is just an example for Blake
        <div className="dashboard">
            <h1 className="dashboard__title">Your current goals</h1>
            <div className="dashboard__items">
              <GoalCards/>
            </div>
        </div>
    )
}

export default DashBoard;