import "./AddGoal.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

function AddGoal() {
  const navigate = useNavigate();

  // Basic fields
  const [slot, setSlot] = useState(1); // MVP default
  const [title, setTitle] = useState("");
  const [definition, setDefinition] = useState("");
  const [reason, setReason] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notes, setNotes] = useState("");

  // Steps (start with 3)
  const [steps, setSteps] = useState(["", "", ""]);

  // UX helpers
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleStepChange = (index, value) => {
    setSteps((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const addStep = () => setSteps((prev) => [...prev, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // minimal client-side validation
    if (!title.trim()) {
      setError("Please add a title.");
      return;
    }

    // Build payload expected by your backend createSchema
    const payload = {
      slot: Number(slot),
      title: title.trim(),
      definition: definition.trim(),
      reason: reason.trim(),
      notes: notes.trim(),
      imageUrls: imageUrl.trim() ? [imageUrl.trim()] : [],
      steps: steps
        .map((s) => s.trim())
        .filter(Boolean)
        .map((text) => ({ text, done: false })),
      status: "active", // optional
    };

    try {
      setIsSaving(true);
      const created = await api("/goals", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      console.log("Goal created:", created);

      // MVP: go back to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Save goal failed:", err);
      setError(err.message || "Failed to save goal.");
    } finally {
      setIsSaving(false);
    }
  };

  const [openDropdown, setOpenDropdown] = useState(null); // "slot" | "display" | "reset" | null

  const [color, setColor] = useState(null);

  const [resetCycle, setResetCycle] = useState("Default");

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <div className="add-goal">
      <h1 className="add-goal__title">Set your inetions to Thrive!</h1>
      <p className="add-goal__subtitle">
        While you can keep your goal as simple as a title, we encourage you to
        consider filling in as many of the fields as you can in order to
        solidify your intentions.
      </p>

      {/* onSubmit added */}
      <form className="add-goal__form" onSubmit={handleSubmit}>
        <h2 className="add-goal__form_title">Basic Information</h2>

        <label htmlFor="goal-title">Title</label>
        <input
          id="goal-title"
          type="text"
          placeholder="Name your goal or intention"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Dropdowns */}
        {/* Drop downs */}
        <div className="goal__dropdowns">
          {/* CATEGORY */}
          <div className="goal__row">
            <button
              type="button"
              className="goal__rowHeader"
              onClick={() => toggleDropdown("slot")}
            >
              <span>Category</span>

              <span className="goal__rowRight">
                <span>
                  {slot === 1
                    ? "Career"
                    : slot === 2
                    ? "Finance"
                    : slot === 3
                    ? "Education"
                    : "Fitness"}
                </span>
                <span
                  className={`goal__chev ${
                    openDropdown === "slot" ? "goal__chev--up" : ""
                  }`}
                >
                  ▾
                </span>
              </span>
            </button>

            {openDropdown === "slot" && (
              <div className="goal__rowContent">
                <div className="goal__optionsRow">
                  {[
                    { n: 1, t: "Career" },
                    { n: 2, t: "Finance" },
                    { n: 3, t: "Education" },
                    { n: 4, t: "Fitness" },
                  ].map((o) => (
                    <label key={o.n} className="goal__radioOption">
                      <input
                        type="radio"
                        name="slot"
                        value={o.n}
                        checked={Number(slot) === o.n}
                        onChange={(e) => setSlot(Number(e.target.value))}
                      />
                      {o.t}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DISPLAY (Color schemes) */}
          <div className="goal__row">
            <button
              type="button"
              className="goal__rowHeader"
              onClick={() => toggleDropdown("display")}
            >
              <span>Display</span>

              <span className="goal__rowRight">
                <span
                  className="goal__colorPreview"
                  style={{ backgroundColor: color || "#cfcfcf" }}
                />
                <span
                  className={`goal__chev ${
                    openDropdown === "display" ? "goal__chev--up" : ""
                  }`}
                >
                  ▾
                </span>
              </span>
            </button>

            {openDropdown === "display" && (
              <div className="goal__rowContent">
                <div className="goal__colorRow">
                  {[
                    "#C77B1F",
                    "#F0C23A",
                    "#2F6B3B",
                    "#1E3EE6",
                    "#8A4BFF",
                    "#CFCFCF",
                  ].map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`goal__colorDot ${
                        color === c ? "goal__colorDot--active" : ""
                      }`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}

                  <button type="button" className="goal__plus">
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RESET */}
          <div className="goal__row">
            <button
              type="button"
              className="goal__rowHeader"
              onClick={() => toggleDropdown("reset")}
            >
              <span>Reset</span>

              <span className="goal__rowRight">
                <span>{resetCycle}</span>
                <span
                  className={`goal__chev ${
                    openDropdown === "reset" ? "goal__chev--up" : ""
                  }`}
                >
                  ▾
                </span>
              </span>
            </button>

            {openDropdown === "reset" && (
              <div className="goal__rowContent">
                <div className="goal__optionsRow">
                  {["Daily", "Weekly", "Monthly", "Yearly"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`goal__cycleBtn ${
                        resetCycle === c ? "goal__cycleBtn--active" : ""
                      }`}
                      onClick={() => {
                        setResetCycle(c);
                        setOpenDropdown(null);
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <label htmlFor="goal-definition">
          SMART Goal - Define your goal using Specific, Measurable, Achievable,
          Relevant, and Time-bound descriptions
        </label>
        <input
          id="goal-definition"
          type="text"
          placeholder="Define your goal"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        />

        <label htmlFor="goal-reason">Why is this goal important?</label>
        <input
          id="goal-reason"
          type="text"
          placeholder="Define your reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <label htmlFor="goal-image">Visualize</label>
        <label className="goal__sub-label">
          Add an image that inspires you to achieve this goal
        </label>
        <input
          id="goal-image"
          type="url"
          placeholder="Add image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label htmlFor="goal-reason">Why is this goal important?</label>
        <input
          id="goal-reason"
          type="text"
          placeholder="Define your reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

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

        <button type="button" className="add-step__button" onClick={addStep}>
          Add More Steps
        </button>

        <h2 className="add-notes__title">Other Details</h2>
        <p className="add-notes__subtitle">
          Add any other notes, details, links, or resource relevant to this
          goal.
        </p>
        <label htmlFor="notes">Notes</label>
        <input
          id="notes"
          type="text"
          placeholder="Add any notes you need"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* show error if any */}
        {error && <p className="add-goal__error">{error}</p>}

        {/* submit button */}
        <button type="submit" className="save-goal__button" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Goal"}
        </button>
      </form>
    </div>
  );
}

export default AddGoal;
