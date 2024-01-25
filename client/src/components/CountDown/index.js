import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      // Set the target date to the next 12 AM
      let targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 1); // Move to the next day
      targetDate.setHours(0, 0, 0, 0); // Set time to 12:00 AM

      // Get the current date and time
      let currentDate = new Date();

      // Calculate the time difference between the current date and the target date
      let timeDifference = targetDate - currentDate;

      // Calculate hours, minutes, and seconds
      let hours = Math.floor(timeDifference / (1000 * 60 * 60));
      let minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Update the state with the new countdown values
      setCountdown({ hours, minutes, seconds });
    };

    // Update the countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Initial call to display the countdown immediately
    updateCountdown();

    // Cleanup the interval on component unmount
    return () => clearInterval(countdownInterval);
  }, []); // Empty dependency array ensures that useEffect runs only once, similar to componentDidMount

  return (
    <div>
      <p>
        {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
      </p>
    </div>
  );
};

export default CountdownTimer;
