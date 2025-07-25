// components/DropInIcon.tsx
import { motion } from "framer-motion";

interface Props {
  icon: string;
  label: string;
  color: string;
  order: string;
  delay?: number;
  isWinner?: boolean;
}

export default function DropInIcon({
  icon,
  label,
  color,
  order,
  delay = 0,
  isWinner = false,
}: Props) {
  return (
    <div className={`text-center ${order}`}>
      <p className="text-xl font-bold mb-2 uppercase">{label}</p>
      <div className="bg-blue-950 rounded-full w-fit h-fit">
        <motion.div
          initial={{ y: 200, scale: 10, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{
            delay,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className={`inline-block p-6 border-8 inset-shadow rounded-full bg-white ${color} shadow-2xl`}
        >
          <img
            src={icon}
            alt={label}
            className={`w-24 h-24 ${isWinner ? "animate-pulse" : ""}`}
          />
        </motion.div>
      </div>
    </div>
  );
}
