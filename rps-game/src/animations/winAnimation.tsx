import { motion } from "framer-motion";

export default function WinAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.8, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute inset-0 pointer-events-none z-0"
    >
      <div className="w-full h-full bg-gradient-to-b from-yellow-300/30 to-red-500/30 blur-2xl" />
    </motion.div>
  );
}
