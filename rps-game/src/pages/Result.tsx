import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import rock from "../assets/icon-rock.svg";
import paper from "../assets/icon-paper.svg";
import scissors from "../assets/icon-scissors.svg";

type Choice = "rock" | "paper" | "scissors";

interface LocationState {
  userChoice: Choice;
  computerChoice: Choice;
  result: string;
  score: number;
}

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { userChoice, computerChoice, result, score } = state as LocationState;

  // Update the score in localStorage based on the result when component mounts
  useEffect(() => {
    let newScore = score;
    if (result === "You Win!") newScore = score + 1;
    else if (result === "You Lose!") newScore = score - 1;

    localStorage.setItem("score", newScore.toString());
  }, [result, score]);

  // Redirect to /game if no state is provided (e.g., user opens this page directly)
  if (!state) {
    navigate("/game");
    return null;
  }
  const iconMap = {
    rock: rock,
    paper: paper,
    scissors: scissors,
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f3756] to-[#141539] text-white flex flex-col items-center justify-center p-4 space-y-6">
      <h2 className="text-4xl font-bold">{result}</h2>

      <div className="flex justify-center space-x-20">
        <div className="text-center">
          <p className="text-xl mb-2">You Picked</p>
          <div className="inline-block p-6 border-8 rounded-full border-white">
            <img src={iconMap[userChoice]} alt={userChoice} className="w-24 h-24" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl mb-2">The House Picked</p>
          <div className="inline-block p-6 border-8 rounded-full border-white">
            <img
              src={iconMap[computerChoice]}
              alt={computerChoice}
              className="w-24 h-24"
            />
          </div>
        </div>
      </div>

      <button
        className="bg-white text-indigo-700 px-8 py-3 rounded hover:bg-indigo-100 transition"
        onClick={() => navigate("/game")}
      >
        Play Again
      </button>
    </div>
  );
}
