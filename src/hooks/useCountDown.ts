import { useState, useEffect, useCallback } from "react";

function useCountdown(initialTime: number, resetTime: boolean) {
  const [timeLeft, setTimeLeft] = useState(initialTime); 
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Khi resetTime thay đổi, reset lại mọi thứ
  useEffect(() => {
    setTimeLeft(initialTime);
    setIsActive(false);
    setIsPaused(false);
  }, [resetTime, initialTime]);

  
  useEffect(() => {
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(interval);
          setIsActive(false);
          return 0;
        }
        return prevTimeLeft - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const startCountdown = useCallback(() => {
    setIsActive(true);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  return { timeLeft, isActive, isPaused, startCountdown, togglePause };
}

export default useCountdown;
