import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/fireBase";
import { motion } from "framer-motion";

import AnimatedButton from "../animations/AnimatedButton";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f3756]  via-purple-900 to-[#141539] animate-gradient text-white flex flex-col items-center justify-center overflow-hidden relative">
      {/* bg effects using tailwind*/}
      <div className="absolute w-[600px] h-[600px] bg-indigo-700 opacity-30 rounded-full blur-3xl animate-pulse -z-10" />

      {/* glow and scale the name of game */}
      <motion.h1
        className="sm:text-4xl text-center font-bold mb-8 tracking-wide"
        initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ textShadow: "0 0 15px #4f83ff" }}
      >
        Welcome to Rock-Paper-Scissors-Lizard-Spock!
      </motion.h1>

      {/* slowly shows up text*/}
      <motion.p
        className="text-sm sm:text-base mb-10 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        Test your logic and reflexes in this legendary game inspired by The Big Bang
        Theory. Are you ready to play?
      </motion.p>

      {/*Buttons with diffrent effects*/}
      <motion.div
        className="flex gap-4 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
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
