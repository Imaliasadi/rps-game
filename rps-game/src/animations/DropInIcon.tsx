// components/DropInIcon.tsx
import { motion } from "framer-motion";

interface Props {
  icon: string;
  label: string;
  color: string;
  delay?: number;
  isWinner?: boolean;
}

export default function DropInIcon({
  icon,
  label,
  color,
  delay = 0,
  isWinner = false,
}: Props) {
  return (
    <div className={`text-center`}>
      <p className="sm:text-xl text-sm text-nowrap font-bold mb-2 uppercase">{label}</p>
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
            className={`sm:w-24 sm:h-24 w-18 h-18 ${isWinner ? "animate-pulse" : ""}`}
          />
        </motion.div>
      </div>
    </div>
  );
}
