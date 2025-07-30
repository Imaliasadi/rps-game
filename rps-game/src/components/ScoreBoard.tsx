import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ScoreBoard() {
  const [youScore, setYouScore] = useState<number>(() => {
    const stored = localStorage.getItem("youScore");
    return stored ? parseInt(stored) : 0;
  });

  const [houseScore, setHouseScore] = useState<number>(() => {
    const stored = localStorage.getItem("houseScore");
    return stored ? parseInt(stored) : 0;
  });

  const { state } = useLocation();
  const result = state?.result;

  useEffect(() => {
    if (!result) return;
    if (sessionStorage.getItem("scoreProcessed") === result) return;

    let newYouScore = parseInt(localStorage.getItem("youScore") || "0");
    let newHouseScore = parseInt(localStorage.getItem("houseScore") || "0");

    if (result === "You Won!") newYouScore += 1;
    else if (result === "You Lose!") newHouseScore += 1;

    setYouScore(newYouScore);
    setHouseScore(newHouseScore);

    localStorage.setItem("youScore", newYouScore.toString());
    localStorage.setItem("houseScore", newHouseScore.toString());

    sessionStorage.setItem("scoreProcessed", result);
  }, [result]);

  useEffect(() => {
    const syncScore = () => {
      setYouScore(parseInt(localStorage.getItem("youScore") || "0"));
      setHouseScore(parseInt(localStorage.getItem("houseScore") || "0"));
    };
    window.addEventListener("storage", syncScore);
    return () => window.removeEventListener("storage", syncScore);
  }, []);

  const scoreVariants = {
    initial: (direction: "up" | "down") => ({
      opacity: 0,
      y: direction === "up" ? 10 : -10,
      scale: 0.9,
    }),
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: (direction: "up" | "down") => ({
      opacity: 0,
      y: direction === "up" ? -10 : 10,
      scale: 0.9,
    }),
  };

  return (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className="w-full justify-center flex"
    >
      <div className="flex justify-between items-center w-[90%] max-w-[700px] border-4 border-gray-500 rounded-lg px-4 py-2 bg-transparent">
        {/* Game title */}
        <div className="flex flex-col text-left uppercase text-white font-bold sm:text-xl text-sm leading-5">
          <span>Rock</span>
          <span>Paper</span>
          <span>Scissors</span>
          <span>Lizard</span>
          <span>Spock</span>
        </div>

        {/* Score display */}
        <div className="bg-white rounded-lg flex flex-col items-center px-6 py-2 text-black">
          <span className="text-gray-500 sm:text-sm text-[10px] font-bold tracking-widest uppercase mb-1">
            Score Board
          </span>

          {/* Animated score */}
          <div className="sm:text-xl text-sm font-bold flex gap-1">
            <AnimatePresence mode="wait" custom="up">
              <motion.span
                key={`you-${youScore}`}
                custom="up"
                variants={scoreVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                You {youScore}
              </motion.span>
            </AnimatePresence>
            <span>:</span>
            <AnimatePresence mode="wait" custom="up">
              <motion.span
                key={`house-${houseScore}`}
                custom="up"
                variants={scoreVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {houseScore} House
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ScoreBoard;
