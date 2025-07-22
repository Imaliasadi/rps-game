import { motion } from "framer-motion";

export default function LoseAnimation() {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: [0, -40, 40, -40, 40, 0] }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 pointer-events-none z-0"
    >
      <div className="w-full h-full bg-black/20 blur" />
    </motion.div>
  );
}
