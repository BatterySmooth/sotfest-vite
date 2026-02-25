import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const targetDate: Date = new Date("2026-07-10T09:00:00");

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const splitDigits = (num: number): string[] => String(num).padStart(2, "0").split("");

  const [d1, d2, d3] = splitDigits(timeLeft.days);
  const [h1, h2] = splitDigits(timeLeft.hours);
  const [m1, m2] = splitDigits(timeLeft.minutes);
  const [s1, s2] = splitDigits(timeLeft.seconds);

  return (
    <div className="countdown_container">
      <div className="countdown_timer">
        <p>Countdown</p>
        <p></p>
        <p>{d1}</p>
        <p>{d2}</p>
        <p>{d3}</p>
        <p>:</p>
        <p>{h1}</p>
        <p>{h2}</p>
        <p>:</p>
        <p>{m1}</p>
        <p>{m2}</p>
        <p>:</p>
        <p>{s1}</p>
        <p>{s2}</p>
      </div>
    </div>
  );
};