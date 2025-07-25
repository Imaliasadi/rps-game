import { AnimatePresence, motion } from "framer-motion";

interface RulesModalProps {
  onClose: () => void;
  onReset: () => void;
}

export default function RulesModal({ onClose, onReset }: RulesModalProps) {
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
          <h2 className="text-2xl font-bold">
            Are you sure you want to delete all your saved scores? this action can not be
            reversed
          </h2>
          <button
            onClick={onReset}
            className="text-red-500 font-bold border-2 border-red-500 rounded px-4 py-1 hover:bg-red-500 hover:text-white transition"
          >
            Reset all my scores
          </button>
          <button
            onClick={onClose}
            className=" font-bold border-2 border-green-500 rounded px-4 py-1 hover:bg-black hover:text-white transition"
          >
            Keep my scores
          </button>
        </motion.div>
      </motion.div>
      <AnimatePresence />
    </>
  );
}
