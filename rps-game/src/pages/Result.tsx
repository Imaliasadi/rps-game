import { useLocation, useNavigate } from "react-router-dom";
import rock from "../assets/icon-rock.svg";
import paper from "../assets/icon-paper.svg";
import scissors from "../assets/icon-scissors.svg";
import spock from "../assets/icon-spock.svg";
import lizard from "../assets/icon-lizard.svg";
import ScoreBoard from "../components/ScoreBoard";

type Choice = "rock" | "paper" | "scissors" | "spock" | "lizard";
interface LocationState {
  userChoice: Choice;
  computerChoice: Choice;
  result: string;
}

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState };

  if (!state) {
    navigate("/game");
    return null;
  }
  const { userChoice, computerChoice, result } = state;

  const iconMap: Record<Choice, string> = { rock, paper, scissors, spock, lizard };
  const borderColorMap: Record<Choice, string> = {
    rock: "border-[#de3a5a]",
    paper: "border-[#5471f3]",
    scissors: "border-[#eca81e]",
    lizard: "border-[#8c5de5]",
    spock: "border-[#40b9ce]",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f3756] to-[#141539] text-white flex flex-col items-center justify-between p-4 space-y-6">
      <ScoreBoard />
      <h2 className="text-4xl font-bold">{result}</h2>
      <div className="flex justify-center space-x-20">
        <div className="text-center">
          <p className="text-xl mb-2">You Picked</p>
          <div
            className={`inline-block p-6 border-8 rounded-full bg-white ${borderColorMap[userChoice]}`}
          >
            <img src={iconMap[userChoice]} alt={userChoice} className="w-24 h-24" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-xl mb-2">The House Picked</p>
          <div
            className={`inline-block p-6 border-8 rounded-full bg-white ${borderColorMap[computerChoice]}`}
          >
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
