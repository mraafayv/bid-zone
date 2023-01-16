import countdownTimer from "../../utilities/countdownTimer.js";

import "./Timer.css";
import { useEffect, useState } from "react";
import { getDatabase, ref, set } from "firebase/database";

export default function Timer({ data }) {
  function writeUserData(id) {
    const db = getDatabase();
    set(ref(db, "expireProduct/" + id), {
      prodID: id,
      expired: true,
    });
  }

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // let [creationTime, setCreationTime] = useState(new Date())

  useEffect(() => {
    // console.log("data.duration: ",data.duration)
    var countDownDate = data.duration.seconds * 1000;

    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      // console.log("countdown: ", countDownDate, "Now: ", now, "distance: ", distance)

      // Time calculations for days, hours, minutes and seconds
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.querySelector(".timer").innerHTML = "EXPIRED";
        writeUserData(data.prodID);
      }
    }, 1000);
  }, []);

  return (
    <div className="timer">
      <div className="timer-label">Ends In:</div>
      <h4 className="days">
        <span>{days}</span>
        <span className="days-label">DAYS</span>
      </h4>
      <span>:</span>
      <h4 className="hours">
        <span>{hours}</span>
        <span className="hours-label">HOURS</span>
      </h4>
      <span>:</span>
      <h4 className="minutes">
        <span>{minutes}</span>
        <span className="minutes-label">MINUTES</span>
      </h4>
      <span>:</span>
      <h4 className="seconds">
        <span>{seconds}</span>
        <span className="seconds-label">SECONDS</span>
      </h4>
    </div>
  );
}
