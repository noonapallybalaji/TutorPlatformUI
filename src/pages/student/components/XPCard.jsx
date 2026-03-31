import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import DashboardCard from "../../../components/dashboard/DashboardCard";

export default function XPCard() {
  const xp = 750;
  const level = 5;
  const nextLevelXP = 1000;
  const progress = (xp / nextLevelXP) * 100;

  return (
    <DashboardCard title={`Level ${level}`} icon={Zap}>
      <div className="space-y-6">
        <div>
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {xp} XP
          </div>
          <p className="text-sm text-muted">
            {nextLevelXP - xp} XP to next level
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-slate-600">Progress</span>
            <span className="text-xs font-bold text-blue-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
            />
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}