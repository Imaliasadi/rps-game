import { useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";
import GameBoard from "../components/GameBoard";
import { getRandomChoice, winMap } from "../utiles/GameLogic";
import { type Choice } from "../data/choices";
import Loading from "../components/Loading";
import { useState } from "react";
import RulesModal from "../components/RulesModal";
import WarningModal from "../components/WarningModal";

/**
 * Game page: main gameplay logic and layout.
 * Handles user choice, computes result, and navigates to the result page.
 */
export default function Game() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showWarn, setShowWarn] = useState(false);

  // Handles a round: determines computer choice, computes result, and navigates to result page
  const playRound = (user: Choice) => {
    const computer = getRandomChoice();
    setIsLoading(true);
    let result = "Draw";
    if (winMap[user].includes(computer)) result = "You Won!";
    else if (user !== computer) result = "You Lose!";

    sessionStorage.removeItem("scoreProcessed");
    setTimeout(() => {
      setIsLoading(false);
      navigate("/game/result", {
        state: { userChoice: user, computerChoice: computer, result },
      });
    }, 1000);
  };

  const resetScore = () => {
    localStorage.removeItem("youScore");
    localStorage.removeItem("houseScore");
    window.dispatchEvent(new Event("storage"));
    setShowWarn(false);
  };
  return (
    <div className="h-screen flex flex-col items-center justify-between gap-8 bg-gradient-to-b from-[#1f3756] to-[#141539] text-white p-4">
      {/* ScoreBoard displays the current scores */}
      <ScoreBoard />
      {isLoading ? (
        <Loading message="THE HOUSE IS CHOOSING..." />
      ) : (
        <GameBoard playRound={playRound} />
      )}

      {/* Button to reset the score */}
      <div className="flex content-between gap-3">
        <button
          onClick={() => setShowWarn(true)}
          className="bg-transparent text-white px-4 py-2 rounded hover:bg-white hover:text-black transition border-2 border-amber-50"
        >
          Reset score
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-transparent text-white px-4 py-2 rounded hover:bg-white hover:text-black transition border-2 border-amber-50"
        >
          Rules
        </button>
      </div>
      {showModal && <RulesModal onClose={() => setShowModal(false)} />}
      {showWarn && (
        <WarningModal onClose={() => setShowWarn(false)} onReset={resetScore} />
      )}
    </div>
  );
}
