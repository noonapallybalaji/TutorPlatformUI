import { motion } from "framer-motion";

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-8 bg-white border border-dashed border-slate-200 rounded-2xl"
    >
      {Icon && (
        <div className="mx-auto w-14 h-14 rounded-full bg-blue-100 text-blue-600 grid place-items-center mb-4">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-slate-700 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-4">{description}</p>
      {action && <div>{action}</div>}
    </motion.div>
  );
}
