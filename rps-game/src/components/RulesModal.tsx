import { AnimatePresence, motion } from "framer-motion";
import rulesImage from "../assets/image-rules-bonus.svg";

interface RulesModalProps {
  onClose: () => void;
}

export default function RulesModal({ onClose }: RulesModalProps) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white text-black p-8 rounded-lg flex flex-col items-center gap-4 max-w-[300px] w-full"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold">Rules</h2>
          <img src={rulesImage} alt="rules" className="w-full" />
          <button
            onClick={onClose}
            className="text-red-500 font-bold border-2 border-red-500 rounded px-4 py-1 hover:bg-red-500 hover:text-white transition"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
      <AnimatePresence />
    </>
  );
}
