import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/fireBase";
import { motion } from "framer-motion";
import AnimatedButton from "../animations/AnimatedButton";

const icons = [
  { emoji: "🪨", label: "Rock", delay: 0 },
  { emoji: "📄", label: "Paper", delay: 0.1 },
  { emoji: "✂️", label: "Scissors", delay: 0.2 },
  { emoji: "🦎", label: "Lizard", delay: 0.3 },
  { emoji: "🖖", label: "Spock", delay: 0.4 },
];

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f3756] via-purple-900 to-[#141539] animate-gradient text-white flex flex-col items-center justify-center overflow-hidden relative">
      {/* Glow background */}
      <div className="absolute w-[600px] h-[600px] bg-indigo-700 opacity-30 rounded-full blur-3xl animate-pulse -z-10" />

      {/* Animated icon title */}
      <div className="flex flex-row-reverse">
        <motion.div
          className="flex items-center gap-3 mb-6 flex-wrap justify-center"
          initial="hidden"
          animate="visible"
        >
          {icons.map(({ emoji, label, delay }) => (
            <motion.div
              key={label}
              className="text-5xl sm:text-6xl"
              variants={{
                hidden: { opacity: 0, y: -30, scale: 0.5 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    delay,
                    type: "spring",
                    stiffness: 180,
                    damping: 12,
                  },
                },
              }}
              whileHover={{ scale: 1.2, rotate: 15, y: -10 }}
              title={label}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
        {/* Subtitle */}
        <motion.h1
          className="sm:text-6xl text-5xl text-center font-semibold mb-6 tracking-wide px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
        >
          Welcome to:
        </motion.h1>
      </div>

      {/* Description */}
      <motion.p
        className="text-sm sm:text-base mb-10 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        Test your reflexes and strategy in this iconic game inspired by The Big Bang
        Theory.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex gap-4 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        {user ? (
          <AnimatedButton to="/game" label="Let's Play" color="indigo" />
        ) : (
          <>
            <AnimatedButton to="/login" label="Login" color="gray" />
            <AnimatedButton to="/signup" label="Sign Up" color="gray" />
          </>
        )}
      </motion.div>
    </div>
  );
}
