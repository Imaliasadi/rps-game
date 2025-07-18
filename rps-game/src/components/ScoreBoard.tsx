import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ScoreBoard() {
  const [youScore, setYouScore] = useState<number>(() => {
    const stored = localStorage.getItem("youScore");
    return stored ? parseInt(stored) : 0;
  });

  const [houseScore, setHouseScore] = useState<number>(() => {
    const stored = localStorage.getItem("houseScore");
    return stored ? parseInt(stored) : 0;
  });

  const { state } = useLocation();
  const result = state?.result;

  useEffect(() => {
    if (!result) return;

    let newYouScore = youScore;
    let newHouseScore = houseScore;

    if (result === "You Win!") newYouScore += 1;
    else if (result === "You Lose!") newHouseScore += 1;

    setYouScore(newYouScore);
    setHouseScore(newHouseScore);

    localStorage.setItem("youScore", newYouScore.toString());
    localStorage.setItem("houseScore", newHouseScore.toString());
  }, [result]);

  useEffect(() => {
    const syncScore = () => {
      setYouScore(parseInt(localStorage.getItem("youScore") || "0"));
      setHouseScore(parseInt(localStorage.getItem("houseScore") || "0"));
    };
    window.addEventListener("storage", syncScore);
    return () => window.removeEventListener("storage", syncScore);
  }, []);

  return (
    <div className="flex justify-between items-center w-[90%] max-w-[700px] border-4 border-gray-500 rounded-lg px-4 py-2 bg-transparent">
      <div className="flex flex-col text-left uppercase text-white font-bold text-xl leading-5">
        <span>Rock</span>
        <span>Paper</span>
        <span>Scissors</span>
        <span>Lizard</span>
        <span>Spock</span>
      </div>

      <div className="bg-white rounded-lg flex flex-col items-center px-6 py-2 text-black">
        <span className="text-gray-500 text-sm font-bold tracking-widest uppercase">
          Score
        </span>
        <div className="text-xl font-bold">
          <span className="bg-[#40b9ce] px-1 rounded-sm">You</span>
          {youScore} : {houseScore}
          <span className="bg-[#de3a5a] px-1 rounded-sm">House</span>
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;
