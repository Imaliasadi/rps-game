import { useLocation, useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";
import { choices, type Choice } from "../data/choices";
import { motion } from "framer-motion";
import { winVariants, loseVariants, drawVariants } from "../data/Animations";
import WinAnimation from "../animations/winAnimation";
import LoseAnimation from "../animations/loseAnimation";
import DrawAnimation from "../animations/drawAnimation";

interface LocationState {
  userChoice: Choice;
  computerChoice: Choice;
  result: string;
}

function getChoiceData(key: Choice) {
  return choices.find((c) => c.key === key)!;
}

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState };

  if (!state) {
    navigate("/game");
    return null;
  }

  const { userChoice, computerChoice, result } = state;
  const userData = getChoiceData(userChoice);
  const computerData = getChoiceData(computerChoice);

  const renderAnimation = () => {
    if (result === "You Win!") return <WinAnimation />;
    if (result === "You Lose!") return <LoseAnimation />;
    return <DrawAnimation />;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1f3756] to-[#141539] text-white flex flex-col items-center justify-between p-4 space-y-6 overflow-hidden">
      {/* animations */}
      {renderAnimation()}

      <ScoreBoard />

      <div className="flex justify-center space-x-20 z-10">
        <div className="text-center">
          <p className="text-xl font-bold mb-2 uppercase">You Picked</p>
          <div
            className={`inline-block p-6 border-8 rounded-full bg-white ${userData.color}`}
          >
            <img src={userData.icon} alt={userData.label} className="w-24 h-24" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold mb-2 uppercase">The House Picked</p>
          <div
            className={`inline-block p-6 border-8 rounded-full bg-white ${computerData.color}`}
          >
            <img src={computerData.icon} alt={computerData.label} className="w-24 h-24" />
          </div>
        </div>
      </div>

      <motion.h2
        variants={
          result === "You Win!"
            ? winVariants
            : result === "You Lose!"
            ? loseVariants
            : drawVariants
        }
        initial="hidden"
        animate="visible"
        className="text-4xl font-extrabold uppercase z-10"
      >
        {result}
      </motion.h2>

      <button
        className="bg-transparent text-white px-4 py-2 rounded hover:bg-white hover:text-black transition border-2 border-amber-50 z-10"
        onClick={() => navigate("/game")}
      >
        Play Again
      </button>
    </div>
  );
}
