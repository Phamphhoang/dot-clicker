import { useDots } from "@/hooks/useDots";
import React, { useEffect, useRef, useState } from "react";
import Dot from "./Dot";
import { IDot } from "@/Type/IDot";
import useGameLogic from "@/hooks/useGameLogic";
import GroupHeader from "./GroupHeader";
import useTimer from "@/hooks/useTimer";

const GameBoard: React.FC = () => {
  const { dots, updateDotCount, resetDots } = useDots(0);
  const { currentTarget, handleClick, message, stopGame, resetGame } =
    useGameLogic(0);
  const { time, start, pause, reset } = useTimer();

  const [isReset, setIsReset] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [isAuto, setIsAuto] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isAutoEnabled, setIsAutoEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (stopGame) pause();
  }, [stopGame, pause]);

  useEffect(() => {
    if (isRunning && message == undefined) {
      setIsFinish(false);
      setIsAutoEnabled(false);
      start();
    }
  }, [isReset, start, setIsFinish, message, isRunning]);

  const handleClickButon = (point: number, tp: string) => {
    if (point <= 0) {
      alert("Enter a number greater than 0!");
      return;
    }

    if (tp === "begin") {
      setIsRunning(true);
      updateDotCount(point);
      resetGame(point);
      start();
    } else if (tp === "reset") {
      reset();
      resetGame(point);
      resetDots(point);
      stopInterval();
      setIsReset((prev) => !prev);
    }
  };

  const handleCountdownFinish = () => {
    setIsFinish(true);
    pause();
  };

  const handleClickDot = (id: number) => {
    handleClick(id);
    setIsAutoEnabled(false);
  };

  const renderMessage = () => {
    if (message && (isFinish || stopGame)) {
      return (
        <div
          className="absolute w-full h-full flex items-center justify-center "
          style={{
            borderRadius: "1.8rem",
            backgroundColor: isFinish ? "" : "rgba(255, 255, 255, 0.5)",
            zIndex: dots.length + 10,
          }}
        >
          <span
            className={`w-full font-bold text-center ${
              isFinish ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </span>
        </div>
      );
    }
    return null;
  };

  const startInterval = () => {
    if (!isAuto) {
      intervalRef.current = setInterval(() => {
        setIsAutoEnabled(true);
      }, 1000);
      setIsAuto(true);
    }
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsAuto(false);
    }
  };

  const toggleAutoClick = () => {
    if (isAuto) {
      stopInterval();
    } else {
      startInterval();
    }
  };

  const renderDots = () => {
    return dots.map((dot: IDot) => (
      <Dot
        key={dot.id}
        id={dot.id}
        currentIndex={currentTarget}
        position={dot.position}
        z={dots.length - dot.id}
        isPause={stopGame}
        isReset={isReset}
        onClick={handleClickDot}
        onCountdownFinish={
          dot.id === dots.length ? handleCountdownFinish : undefined
        }
        autoClickId={isAutoEnabled}
      />
    ));
  };

  return (
    <div
      className=" shadow-lg flex flex-col justify-center items-center"
      style={{
        borderRadius: "2rem",
        backgroundColor: "#E8E7E6",
        width: "850px",
        height: "600px",
      }}
    >
      <GroupHeader
        onValueChange={handleClickButon}
        isRunning={isRunning}
        timeCounter={time}
        toggleAutoClick={toggleAutoClick}
      />

      <div
        className="w-[95%] h-[80%] relative"
        style={{
          borderRadius: "1.8rem",
          backgroundColor: "#FFFEFF",
        }}
      >
        {renderMessage()}
        {renderDots()}
      </div>
    </div>
  );
};

export default GameBoard;
