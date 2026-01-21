import "./AddGoal.css";
import { useState } from "react";
function AddGoal() {
    const [steps, setSteps] = useState(["", "", ""]); // start with 3

    const handleStepChange = (index, value) => {
      setSteps((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });
    };
  
    const addStep = () => {
      setSteps((prev) => [...prev, ""]);
    };
  
  return (
    <div className="add-goal">
      <h1 className="add-goal__title">Set your inetions to Thrive!</h1>
      <p className="add-goal__subtitle">
        While you can keep your goal as simple as a title, we encourage you to
        consider filling in as many of the fields as you can in order to
        solidify your intentions.
      </p>

      <form className="add-goal__form">
        {/* Main Goal Info */}
        <h2 className="add-goal__form_title">Basic Information</h2>

        <label htmlFor="goal-title">Ttitle</label>
        <input type="text" placeholder="Name your goal or intention" />

        <label htmlFor="goal-definition">
          SMART Goal - Define your goal using Specific, Measurable, Achievable,
          Relevant, and Time-bound descriptions
        </label>
        <input type="text" placeholder="Define your goal" />

        <label htmlFor="goal-reason">Why is this goal important?</label>
        <input type="text" placeholder="Define your reason" />

        <label htmlFor="goal-image">Vizualize</label>
        <label className="goal__sub-label">
          Add an image that inspures you to achieve this goal
        </label>
        <input type="url" placeholder="Add image URL" />

        {/* Steps */}
        <h2 className="add-steps__form_title">Stepping Stone Goals</h2>
        <p className="add-steps__subtitle">
          What smaller steps will help you achieve your main goal? You can write
          these as SMART goals too.
        </p>
        {steps.map((step, i) => (
        <div key={i}>
          <label htmlFor={`step-${i}`}>Add a Stepping Stone Goal</label>
          <input
            id={`step-${i}`}
            type="text"
            placeholder="Define this step"
            value={step}
            onChange={(e) => handleStepChange(i, e.target.value)}
          />
        </div>
      ))}

        <button
          type="button"
          className="add-step__button"
          onClick={addStep}
        >
          Add More Steps
        </button>

        {/* Goal Notes */}
        <h2 className="add-notes__title">Other Details</h2>
        <p className="add-notes__subtitle">
          Add any other notes, details, links, or resource relevant to this
          goal.
        </p>
        <label htmlFor="notes">Notes</label>
        <input type="text" placeholder="Add any notes you need" />

        <button
          type="button"
          className="save-goal__button"
        >
          Save Goal
        </button>
        
      </form>
    </div>
  );
}

export default AddGoal;
