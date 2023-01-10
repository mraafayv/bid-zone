import "./Timer.css";

export default function Timer() {
  return (
    <div className="timer">
      <div className="timer-label">Ends In:</div>
      <h4 className="days">
        <span>00</span>
        <span className="days-label">DAYS</span>
      </h4>
      <span>:</span>
      <h4 className="hours">
        <span>00</span>
        <span className="hours-label">HOURS</span>
      </h4>
      <span>:</span>
      <h4 className="minutes">
        <span>00</span>
        <span className="minutes-label">MINUTES</span>
      </h4>
      <span>:</span>
      <h4 className="seconds">
        <span>00</span>
        <span className="seconds-label">SECONDS</span>
      </h4>
    </div>
  );
}
