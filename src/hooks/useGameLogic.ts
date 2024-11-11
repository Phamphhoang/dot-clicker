import { useEffect, useState } from "react";

function useGameLogic(totalDots: number) {
  const [totalTarget, setTotalTarget] = useState(0);
  const [currentTarget, setCurrentTarget] = useState(1);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [stopGame, setStopGame] = useState<boolean>(false);

  useEffect(() => {
    setTotalTarget(totalDots);
  }, [totalDots]);


  const handleClick = (id: number) => {
    if (id === currentTarget) {
      if (currentTarget === totalTarget) {
        setMessage(`All cleared`);
      } else {
        setCurrentTarget((prev) => prev + 1); 
        setMessage(undefined);
      }
    } else {
      setMessage(`Game over`);
      setStopGame(true);
    }
  };

  const resetGame = (newDots: number) => {
    setTotalTarget(newDots);
    setCurrentTarget(1);
    setMessage(undefined);
    setStopGame(false);
  };

  return { currentTarget, message, handleClick, stopGame, resetGame };
}

export default useGameLogic;
