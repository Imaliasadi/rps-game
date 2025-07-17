import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChoiceButton from "../components/ChoiceButton";
import rockIcon from "../assets/icon-rock.svg";
import paperIcon from "../assets/icon-paper.svg";
import scissorsIcon from "../assets/icon-scissors.svg";
import TriangleLines from "../components/TriangleLines";

const choices = ["rock", "paper", "scissors"] as const;
type Choice = (typeof choices)[number];

export default function Game() {
  const navigate = useNavigate();

  // State to keep track of the score, initialized from localStorage if available
  const [score, setScore] = useState<number>(() => {
    const stored = localStorage.getItem("score");
    return stored ? parseInt(stored) : 0;
  });

  // Function to randomly pick a choice for the computer
  function getRandomChoice(): Choice {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  // Main game function called when user makes a choice
  function playRound(user: Choice) {
    const computer = getRandomChoice();

    const winMap: Record<Choice, Choice> = {
      rock: "scissors",
      scissors: "paper",
      paper: "rock",
    };

    let result = "";
    if (user === computer) result = "Draw";
    else if (winMap[user] === computer) result = "You Win!";
    else result = "You Lose!";

    // Navigate to the results page and send the game data as state
    navigate("/game/result", {
      state: { userChoice: user, computerChoice: computer, result, score },
    });
  }

  // Reset the score and clear it from localStorage
  function resetScore() {
    setScore(0);
    localStorage.removeItem("score");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f3756] to-[#141539] text-white flex flex-col items-center justify-center p-4">
      <div className="bg-white text-black rounded-lg px-6 py-2 mb-8 shadow-md">
        <h1 className="text-xl font-bold">Score: {score}</h1>
      </div>

      <div className="mx-auto grid grid-cols-3 grid-rows-3 gap-4 relative z-0">
        <TriangleLines />
        <div className="col-start-2 row-start-3 flex justify-center">
          <ChoiceButton
            icon={paperIcon}
            label="paper"
            onClick={() => playRound("paper")}
            color="border-[#5471f3]"
          />
        </div>

        <div className="col-start-3 row-start-1 flex justify-center">
          <ChoiceButton
            icon={rockIcon}
            label="rock"
            onClick={() => playRound("rock")}
            color="border-[#de3a5a]"
          />
        </div>

        <div className="col-start-1 row-start-1 flex justify-center">
          <ChoiceButton
            icon={scissorsIcon}
            label="scissors"
            onClick={() => playRound("scissors")}
            color="border-[#eca81e]"
          />
        </div>
      </div>

      <button
        className="bg-white text-indigo-700 px-4 py-2 rounded hover:bg-indigo-100 transition mt-6 cursor-pointer"
        onClick={resetScore}
      >
        Reset score
      </button>
    </div>
  );
}
