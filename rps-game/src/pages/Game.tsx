import { useEffect, useState } from "react";
import ChoiceButton from "../components/ChoiceButton";
import rockIcon from "../assets/icon-rock.svg";
import paperIcon from "../assets/icon-paper.svg";
import scissorsIcon from "../assets/icon-scissors.svg";

const choices = ["rock", "paper", "scissors"] as const;
type Choice = (typeof choices)[number];

export default function Game() {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>("");
  const [score, setScore] = useState<number>(() => {
    const stored = localStorage.getItem("score");
    return stored ? parseInt(stored) : 0;
  });

  useEffect(() => {
    localStorage.setItem("score", score.toString());
  }, [score]);

  function getRandomChoice(): Choice {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  function playRound(choice: Choice) {
    const computer = getRandomChoice();
    const user = choice;

    setUserChoice(user);
    setComputerChoice(computer);

    const winMap = {
      rock: "scissors",
      scissors: "paper",
      paper: "rock",
    };

    if (user === computer) setResult("Draw");
    else if (winMap[user] === computer) {
      setResult("You Win!");
      setScore((prev) => prev + 1);
    } else {
      setResult("You Lose!");
      setScore((prev) => prev - 1);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-white text-black rounded-lg px-6 py-2 mb-8 shadow-md">
        <h1 className="text-xl font-bold">Score: {score}</h1>
      </div>

      {userChoice === null ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          <ChoiceButton icon={rockIcon} label="rock" onClick={() => playRound("rock")} />
          <ChoiceButton
            icon={paperIcon}
            label="paper"
            onClick={() => playRound("paper")}
          />
          <ChoiceButton
            icon={scissorsIcon}
            label="scissors"
            onClick={() => playRound("scissors")}
          />
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold">You chose: {userChoice}</p>
          <p className="text-2xl font-semibold">Computer chose: {computerChoice}</p>
          <p className="text-3xl font-bold">{result}</p>

          <button
            className="mt-4 bg-white text-indigo-700 px-4 py-2 rounded hover:bg-indigo-100 transition"
            onClick={() => {
              setUserChoice(null);
              setComputerChoice(null);
              setResult("");
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
