import { motion } from "framer-motion";

interface Props {
  streak: number;
}

const StreakDisplay: React.FC<Props> = ({ streak }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        key={streak}
        initial={{ scale: 1 }}
        animate={{ scale: 1.5, color: streak >= 5 ? "#FFD700" : "#FF4500" }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`text-4xl font-bold ${streak == 0 ? "opacity-0":"opacity-100"}`}
      >
        🔥 {streak}
      </motion.div>

    </div>
  );
};

export default StreakDisplay;
