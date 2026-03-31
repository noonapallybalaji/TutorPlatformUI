import { motion } from "framer-motion";
import DashboardCard from "../../../components/dashboard/DashboardCard";

export default function StatCard({ title, value, subtitle, highlight, trend, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-2xl p-6 transition-all ${
        highlight
          ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg"
          : "card"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className={`text-sm font-medium ${highlight ? "opacity-90" : "text-muted"}`}>
            {title}
          </p>
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            highlight ? "bg-white/20" : "bg-blue-100"
          }`}>
            <Icon className={`w-6 h-6 ${highlight ? "text-white" : "text-blue-600"}`} />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-bold">{value}</h3>
        {subtitle && (
          <span className={`text-sm ${highlight ? "opacity-75" : "text-muted"}`}>
            {subtitle}
          </span>
        )}
      </div>

      {trend && (
        <div className={`text-xs font-medium mt-3 ${
          highlight ? "opacity-80" : "text-success-600"
        }`}>
          {trend}
        </div>
      )}
    </motion.div>
  );
}