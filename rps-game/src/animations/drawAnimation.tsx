import { motion } from "framer-motion";

export default function DrawAnimation() {
  return (
    <motion.div
      initial={{ scale: 1, opacity: 0.3 }}
      animate={{ scale: [1, 2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute inset-0 pointer-events-none z-0"
    >
      <div className="w-full h-full bg-white/10 blur" />
    </motion.div>
  );
}
