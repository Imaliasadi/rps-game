import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/fireBase";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#1f3756] to-[#141539] text-white flex flex-col items-center justify-center">
        <motion.h1
          className="sm:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Rock-Paper-Scissors-Lizard-Spock!
        </motion.h1>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="flex content-between gap-4">
            {user ? (
              <Link
                to="/game"
                className="bg-indigo-600 px-6 py-3 rounded text-white hover:bg-indigo-700 transition"
              >
                Start Game
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gray-600 px-6 py-3 rounded text-white hover:bg-gray-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-600 px-6 py-3 rounded text-white hover:bg-gray-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
