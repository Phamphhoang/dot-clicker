import { useState, useEffect, useCallback } from "react";

// Custom hook useTimer
const useTimer = () => {
  const [milliseconds, setMilliseconds] = useState<number>(0); 
  const [isActive, setIsActive] = useState<boolean>(false); 
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (isActive) return;
    setIsActive(true);

    const id = setInterval(() => {
      setMilliseconds((prevMilliseconds) => prevMilliseconds + 100);
    }, 100);

    setIntervalId(id);
  }, [isActive]);


  const pause = useCallback(() => {
    setIsActive(false);
    if (intervalId) {
      clearInterval(intervalId); 
    }
  }, [intervalId]);

  
  const reset = useCallback(() => {
    setMilliseconds(0);
    if (intervalId) {
      clearInterval(intervalId); 
    }
    setIsActive(false); 
  }, [intervalId]);

  
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return {
    time: (milliseconds / 1000).toFixed(1), 
    start,
    pause,
    reset
  };
};

export default useTimer;
