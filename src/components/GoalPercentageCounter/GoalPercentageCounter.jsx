import "./GoalPercentageCounter.css";

function GoalPercentageCounter({
  value = 0, // current progress number
  max = 100, // goal number
  size = 200, // px
  strokeWidth = 12, // px
  label = "of goals met", // optional text under %
}) {
  const safeMax = max <= 0 ? 1 : max;
  const rawPercent = (value / safeMax) * 100;
  const percent = Math.max(0, Math.min(100, Math.round(rawPercent)));

  // SVG math
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r; // circumference
  const offset = c - (percent / 100) * c;

  return (
    <div className="goalCounter" style={{ width: size, height: size }}>
      <svg
        className="goalCounter__svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background track */}
        <circle
          className="goalCounter__track"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={strokeWidth}
        />

        {/* Progress ring */}
        <circle
          className="goalCounter__progress"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={strokeWidth}
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Center content */}
      <div className="goalCounter__center">
        <div className="goalCounter__percent">{percent}%</div>

        {label ? <div className="goalCounter__label">{label}</div> : null}
      </div>
    </div>
  );
}

export default GoalPercentageCounter;
