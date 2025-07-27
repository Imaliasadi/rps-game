import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  label: string;
  color: string;
}

function AnimatedButton({ to, label, color }: Props) {
  const base =
    color === "indigo"
      ? "bg-indigo-600 hover:bg-indigo-700"
      : "bg-gray-600 hover:bg-gray-700";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
    >
      <Link
        to={to}
        className={`px-6 py-3 rounded text-white transition duration-300 shadow-lg ${base}`}
      >
        {label}
      </Link>

      <span className="absolute inset-0 rounded blur-xl opacity-50 scale-110 bg-indigo-500 group-hover:opacity-70 transition-all duration-500 z-[-1]" />
    </motion.div>
  );
}

export default AnimatedButton;
