import useCountdown from "@/hooks/useCountDown";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useCallback, useEffect } from "react";

interface DotProps {
  id: number;
  position: { x: number; y: number };
  z: number;
  onClick: (id: number) => void;
  isPause: boolean;
  isReset: boolean;
  onCountdownFinish?: () => void;
  currentIndex: number;
  autoClickId?: boolean;
}

function Dot({
  id,
  position,
  z,
  onClick,
  isPause,
  isReset,
  onCountdownFinish,
  currentIndex,
  autoClickId,
}: DotProps) {
  const { timeLeft, isActive, startCountdown, togglePause } = useCountdown(
    3000,
    isReset
  );

  useEffect(() => {
    if (isPause) togglePause();
  }, [isPause, togglePause]);

  const handleClick = useCallback(() => {
    startCountdown();
    onClick(id);
  }, [id, onClick, startCountdown]);

  useEffect(() => {
    if (timeLeft <= 0 && onCountdownFinish) onCountdownFinish();
  }, [timeLeft, onCountdownFinish]);

  useEffect(() => {
    if (autoClickId && currentIndex === id) handleClick();
  }, [autoClickId, id, handleClick, currentIndex]);

  if (timeLeft <= 0) return null;

  const isActiveDot = id === currentIndex || isActive;
  const badgeStyle = {
    top: `${position.y}%`,
    left: `${position.x}%`,
    position: "absolute" as const,
    zIndex: z,
    backgroundColor: isActiveDot ? "#4C70BC" : "transparent",
    color: isActiveDot ? "#FFFEFF" : "#4C70BC",
    borderWidth: isActiveDot ? 0 : 2,
    borderStyle: "solid",
    borderColor: isActiveDot ? "transparent" : "#4C70BC",
  };

  return (
    <Badge
      className={cn(
        "flex flex-col items-center justify-center w-12 h-12 rounded-full"
      )}
      style={badgeStyle}
      onClick={handleClick}
    >
      <span className="text-lg">{id}</span>
      {isActive && (
        <span className="text-xs">{(timeLeft / 1000).toFixed(1)}</span>
      )}
    </Badge>
  );
}

export default Dot;
