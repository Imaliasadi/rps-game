import { useLocation, useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";
import { choices, type Choice } from "../data/choices";
import { motion } from "framer-motion";
import { winVariants, loseVariants, drawVariants } from "../animations/HeadAnimations";
import WinAnimation from "../animations/winAnimation";
import LoseAnimation from "../animations/loseAnimation";
import DrawAnimation from "../animations/drawAnimation";
import RulesModal from "../components/Modals/RulesModal";
import { useState } from "react";
import DropInIcon from "../animations/PickedChoicesAnimations";

interface LocationState {
  userChoice: Choice;
  computerChoice: Choice;
  result: string;
}

function getChoiceData(key: Choice) {
  return choices.find((c) => c.key === key)!;
}

export default function Result() {
  const [showModal, setShowModal] = useState(false);
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
    if (result === "You Won!") return <WinAnimation />;
    if (result === "You Lose!") return <LoseAnimation />;
    return <DrawAnimation />;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1f3756] to-[#141539] text-white flex flex-col items-center justify-between p-4 space-y-4 overflow-hidden">
      {/* animations */}
      {renderAnimation()}

      <ScoreBoard />

      <div className="flex flex-row items-center justify-center space-x-20 space-y-0 z-10">
        {/* DropIcon user*/}
        <DropInIcon
          label="You Picked"
          icon={userData.icon}
          color={userData.color}
          delay={0}
          order=""
        />

        {/* result */}
        <motion.h2
          variants={
            result === "You Won!"
              ? winVariants
              : result === "You Lose!"
              ? loseVariants
              : drawVariants
          }
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl font-extrabold uppercase hidden sm:block"
        >
          {result}
        </motion.h2>

        {/* DropIcon house*/}
        <DropInIcon
          label="The House Picked"
          icon={computerData.icon}
          color={computerData.color}
          delay={1}
          order=""
        />
      </div>

      <motion.h2
        variants={
          result === "You Won!"
            ? winVariants
            : result === "You Lose!"
            ? loseVariants
            : drawVariants
        }
        initial="hidden"
        animate="visible"
        className="text-5xl sm:text-6xl font-extrabold uppercase sm:hidden"
      >
        {result}
      </motion.h2>

      <div className="flex content-between gap-3">
        <button
          className="bg-transparent text-white px-4 py-2 rounded hover:bg-white hover:text-black transition border-2 border-amber-50 z-10"
          onClick={() => navigate("/game")}
        >
          Play Again
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-transparent text-white px-4 py-2 rounded hover:bg-white hover:text-black transition border-2 border-amber-50"
        >
          Rules
        </button>
      </div>
      {showModal && <RulesModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
