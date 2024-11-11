import { useState } from "react";
import { Input } from "./ui/input";

interface GroupHeaderProps {
  onValueChange: (point: number, tp: string) => void;
  isRunning: boolean;
  timeCounter: string;
  toggleAutoClick: () => void;
}

export default function GroupHeader({
  isRunning,
  onValueChange,
  timeCounter,
  toggleAutoClick,
}: GroupHeaderProps) {
  const [inputValue, setInputValue] = useState(0);
  const [isEnable, setIsEnable] = useState(false);

  const handleInputChange = (tp: string) => {
    onValueChange(inputValue, tp);
  };
  const handleAutoClick = () => {
    setIsEnable((prev)=>!prev)
    toggleAutoClick();
  };

  return (
    <div className="w-full flex items-center justify-between px-7 rounded-lg my-4">
      {/* Left Section */}
      <div className="flex items-center space-x-2">
        <div
          className="px-4 py-2 rounded-full flex items-center shadow-md"
          style={{ backgroundColor: "#FFFEFF", color:"#4A71BC" }}
        >
          <Input
            type="number"
            value={inputValue}
            placeholder="Enter point..."
            onChange={(e) => setInputValue(Number(e.target.value))}
            className="bg-transparent  placeholder-white font-bold text-lg focus:outline-none w-full"
            style={{border:"none", color:"#4C70BC"}}
          />
        </div>

        {isRunning ? (
          <>
            <button
              className="w-20 h-12  rounded-full flex items-center justify-center "
              style={{color:"#FFFEFF", backgroundColor: "#FF7779"}}
              onClick={() => handleInputChange("reset")}
            >
              Reset
            </button>
            <button
              className="w-[130px] h-12  rounded-full flex items-center justify-center "
              style={{color:"#FFFEFF", backgroundColor: "#4C70BC"}}
              onClick={handleAutoClick}
            >
              Auto Click {isEnable?"OFF":"ON"}
            </button>
          </>
        ) : (
          <button
            className="w-20 h-12  rounded-full flex items-center justify-center "
            style={{color:"#FFFEFF", backgroundColor: "#4C70BC"}}
            onClick={() => handleInputChange("begin")}
          >
            Play
          </button>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        <span className=" font-bold" style={{color:"#4C70BC"}}>Time:</span>
        <span className="text-black-800">{timeCounter}s</span>
      </div>
    </div>
  );
}
