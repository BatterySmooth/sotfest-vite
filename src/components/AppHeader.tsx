import { useState, useEffect, useCallback } from "react";
import styles from './AppHeader.module.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const AppHeader: React.FC = () => {

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const targetDate: Date = new Date("2026-07-10T09:00:00");
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  const splitDigits = (num: number): string[] => String(num).padStart(2, "0").split("");

  const [d1, d2, d3] = splitDigits(timeLeft.days);
  const [h1, h2] = splitDigits(timeLeft.hours);
  const [m1, m2] = splitDigits(timeLeft.minutes);
  const [s1, s2] = splitDigits(timeLeft.seconds);

  return (
    <div className={styles.container}>
      <p className={styles.digit}>SoTFest V</p>
      <div className={styles.timer}>
        <p className={styles.digit}>{d1}</p>
        <p className={styles.digit}>{d2}</p>
        <p className={styles.digit}>{d3}</p>
        <p className={styles.digit}>:</p>
        <p className={styles.digit}>{h1}</p>
        <p className={styles.digit}>{h2}</p>
        <p className={styles.digit}>:</p>
        <p className={styles.digit}>{m1}</p>
        <p className={styles.digit}>{m2}</p>
        <p className={styles.digit}>:</p>
        <p className={styles.digit}>{s1}</p>
        <p className={styles.digit}>{s2}</p>
      </div>
    </div>
  );
};