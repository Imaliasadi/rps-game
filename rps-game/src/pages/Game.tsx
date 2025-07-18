import { useNavigate } from "react-router-dom";
import ChoiceButton from "../components/ChoiceButton";
import ScoreBoard from "../components/ScoreBoard";
import rockIcon from "../assets/icon-rock.svg";
import paperIcon from "../assets/icon-paper.svg";
import scissorsIcon from "../assets/icon-scissors.svg";
import lizardIcon from "../assets/icon-lizard.svg";
import spockIcon from "../assets/icon-spock.svg";

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
      <div className="relative w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] bg-[url('./assets/bg-pentagon.svg')] bg-no-repeat bg-center bg-contain flex items-center justify-center">
        <div className="absolute -top-14 left-1/2 -translate-x-1/2">
          <ChoiceButton
            icon={scissorsIcon}
            label="scissors"
            onClick={() => playRound("scissors")}
            color="border-[#eca81e]"
          />
        </div>
        <div className="absolute top-[18%] -left-14">
          <ChoiceButton
            icon={spockIcon}
            label="spock"
            onClick={() => playRound("spock")}
            color="border-[#40b9ce]"
          />
        </div>
        <div className="absolute top-[18%] -right-14">
          <ChoiceButton
            icon={paperIcon}
            label="paper"
            onClick={() => playRound("paper")}
            color="border-[#5471f3]"
          />
        </div>
        <div className="absolute -bottom-10 -left-3">
          <ChoiceButton
            icon={lizardIcon}
            label="lizard"
            onClick={() => playRound("lizard")}
            color="border-[#8c5de5]"
          />
        </div>
        <div className="absolute -bottom-10 -right-3">
          <ChoiceButton
            icon={rockIcon}
            label="rock"
            onClick={() => playRound("rock")}
            color="border-[#de3a5a]"
          />
        </div>
      </div>
      <button
        onClick={resetScore}
        className="bg-white text-indigo-700 px-4 py-2 rounded hover:bg-indigo-100 transition"
      >
        Reset score
      </button>
    </div>
  );
}
