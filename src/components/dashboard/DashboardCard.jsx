import { motion } from "framer-motion";

export default function DashboardCard({ title, icon: Icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white shadow-sm rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
        </div>
        {Icon && (
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      {children}
    </motion.div>
  );
}
