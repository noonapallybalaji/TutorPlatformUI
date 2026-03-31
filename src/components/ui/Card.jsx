import { motion } from "framer-motion";

export default function Card({ children, className = "", elevated = false }) {
  const base = " rounded-2xl border border-slate-200 bg-white ";
  const elevation = elevated
    ? "shadow-xl hover:shadow-2xl transition-shadow duration-300"
    : "shadow-sm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${base} ${elevation} ${className}`}
    >
      {children}
    </motion.div>
  );
}
