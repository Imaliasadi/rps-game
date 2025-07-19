import { useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";
import GameBoard from "../components/GameBoard";
import { getRandomChoice, resetScore, winMap } from "../utiles/GameLogic";
import { type Choice } from "../data/choices";

export default function Game() {
  const navigate = useNavigate();

  const playRound = (user: Choice) => {
    const computer = getRandomChoice();

    let result = "Draw";
    if (winMap[user].includes(computer)) result = "You Win!";
    else if (user !== computer) result = "You Lose!";

    navigate("/game/result", {
      state: { userChoice: user, computerChoice: computer, result },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between gap-8 bg-gradient-to-b from-[#1f3756] to-[#141539] text-white p-4">
      <ScoreBoard />
      <GameBoard playRound={playRound} />
      <button
        onClick={resetScore}
        className="bg-white text-indigo-700 px-4 py-2 rounded hover:bg-indigo-100 transition"
      >
        Reset score
      </button>
    </div>
  );
}
