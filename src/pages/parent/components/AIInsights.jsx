import { Sparkles, TrendingDown, TrendingUp, AlertCircle, Clock } from "lucide-react";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import Badge from "../../../components/ui/Badge";
import { motion } from "framer-motion";

export default function AIInsights() {
  const insights = [
    { label: "Math performance", value: "-5%", icon: TrendingDown, color: "error", detail: "Needs attention" },
    { label: "Science improved", value: "+12%", icon: TrendingUp, color: "success", detail: "Great progress" },
    { label: "Focus needed", value: "Algebra", icon: AlertCircle, color: "warning", detail: "Priority topic" },
    { label: "Best study time", value: "6PM-8PM", icon: Clock, color: "primary", detail: "Peak hours" },
  ];

  return (
    <DashboardCard title="AI Insights" icon={Sparkles}>
      <div className="space-y-4">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{insight.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{insight.detail}</p>
              </div>
              <Badge variant={insight.color} size="sm">{insight.value}</Badge>
            </motion.div>
          );
        })}
      </div>
    </DashboardCard>
  );
}