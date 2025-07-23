import { useLocation, useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";
import { choices, type Choice } from "../data/choices";
import { motion } from "framer-motion";
import { winVariants, loseVariants, drawVariants } from "../animations/HeadAnimations";
import WinAnimation from "../animations/winAnimation";
import LoseAnimation from "../animations/loseAnimation";
import DrawAnimation from "../animations/drawAnimation";
import WinnerPlayer from "../components/Winner";
import RulesModal from "../components/RulesModal";
import { useState } from "react";

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
        {result === "You Win!" ? (
          <>
            {/* loser: house on left */}
            <div className="text-center">
              <p className="text-xl font-bold mb-2 uppercase">The House Picked</p>
              <div
                className={`inline-block p-6 border-8 rounded-full bg-white ${computerData.color}`}
              >
                <img
                  src={computerData.icon}
                  alt={computerData.label}
                  className="w-24 h-24"
                />
              </div>
            </div>
            {/* winner: you on right */}
            <WinnerPlayer
              label="You Picked"
              icon={userData.icon}
              color={userData.color}
            />
          </>
        ) : result === "You Lose!" ? (
          <>
            {/* loser: you on left */}
            <div className="text-center">
              <p className="text-xl font-bold mb-2 uppercase">You Picked</p>
              <div
                className={`inline-block p-6 border-8 rounded-full bg-white ${userData.color}`}
              >
                <img src={userData.icon} alt={userData.label} className="w-24 h-24" />
              </div>
            </div>
            {/* winner: house on right */}
            <WinnerPlayer
              label="The House Picked"
              icon={computerData.icon}
              color={computerData.color}
            />
          </>
        ) : (
          <>
            {/* draw: same layout as before */}
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
                <img
                  src={computerData.icon}
                  alt={computerData.label}
                  className="w-24 h-24"
                />
              </div>
            </div>
          </>
        )}
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
        className="sm:text-6xl text-5xl font-extrabold uppercase z-10"
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
