import { motion } from "framer-motion";

interface WinnerPlayerProps {
  label: string;
  icon: string;
  color: string;
}

export default function WinnerPlayer({ label, icon, color }: WinnerPlayerProps) {
  return (
    <div className="text-center relative">
      <p className="text-xl font-bold mb-2 uppercase">{label}</p>
      <motion.div
        className={`inline-block p-6 border-8 rounded-full bg-white ${color} shadow-lg`}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img src={icon} alt={label} className="w-24 h-24" />
      </motion.div>
    </div>
  );
}
