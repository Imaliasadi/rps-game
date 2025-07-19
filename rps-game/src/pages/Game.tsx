import { useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";
import GameBoard from "../components/GameBoard";

const choices = ["rock", "paper", "scissors", "lizard", "spock"] as const;
type Choice = (typeof choices)[number];

export default function Game() {
  const navigate = useNavigate();

  const getRandomChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const playRound = (user: Choice) => {
    const computer = getRandomChoice();
    const winMap: Record<Choice, Choice[]> = {
      rock: ["scissors", "lizard"],
      paper: ["rock", "spock"],
      scissors: ["paper", "lizard"],
      lizard: ["spock", "paper"],
      spock: ["scissors", "rock"],
    };
    let result = "Draw";
    if (winMap[user].includes(computer)) result = "You Win!";
    else if (user !== computer) result = "You Lose!";

    navigate("/game/result", {
      state: { userChoice: user, computerChoice: computer, result },
    });
  };

  const resetScore = () => {
    localStorage.removeItem("youScore");
    localStorage.removeItem("houseScore");
    window.dispatchEvent(new Event("storage"));
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
