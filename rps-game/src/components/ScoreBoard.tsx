import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScoreBoard component displays and manages the user's and house's scores.
 * Scores are persisted in localStorage and synchronized across tabs.
 */
function ScoreBoard() {
  // Initialize scores from localStorage or default to 0
  const [youScore, setYouScore] = useState<number>(() => {
    const stored = localStorage.getItem("youScore");
    return stored ? parseInt(stored) : 0;
  });

  const [houseScore, setHouseScore] = useState<number>(() => {
    const stored = localStorage.getItem("houseScore");
    return stored ? parseInt(stored) : 0;
  });

  // Get the result from navigation state (if available)
  const { state } = useLocation();
  const result = state?.result;

  // Update scores when a new result is available
  useEffect(() => {
    if (!result) return;

    // Check if this result has already been processed
    if (sessionStorage.getItem("scoreProcessed") === result) return;

    let newYouScore = parseInt(localStorage.getItem("youScore") || "0");
    let newHouseScore = parseInt(localStorage.getItem("houseScore") || "0");

    if (result === "You Won!") newYouScore += 1;
    else if (result === "You Lose!") newHouseScore += 1;

    setYouScore(newYouScore);
    setHouseScore(newHouseScore);

    localStorage.setItem("youScore", newYouScore.toString());
    localStorage.setItem("houseScore", newHouseScore.toString());

    // Mark this result as processed
    sessionStorage.setItem("scoreProcessed", result);
  }, [result]);
  // Listen for score changes from other tabs/windows
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
      {/* Game title */}
      <div className="flex flex-col text-left uppercase text-white font-bold text-xl leading-5">
        <span>Rock</span>
        <span>Paper</span>
        <span>Scissors</span>
        <span>Lizard</span>
        <span>Spock</span>
      </div>

      {/* Score display */}
      <div className="bg-white rounded-lg flex flex-col items-center px-6 py-2 text-black">
        <span className="text-gray-500 text-sm font-bold tracking-widest uppercase">
          Score Board
        </span>
        <div className="text-xl font-bold">
          You {youScore} : {houseScore} House
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;
