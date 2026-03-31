// components/DailyStreak.jsx
import { Flame, Calendar, Gift } from "lucide-react";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import { motion } from "framer-motion";

export default function DailyStreak({ streak = 7 }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const today = new Date().getDay();
  
  // Streak rewards
  const getStreakReward = () => {
    if (streak >= 30) return { reward: "🏆 Legendary Badge", xp: 500 };
    if (streak >= 14) return { reward: "✨ Rare Avatar Upgrade", xp: 300 };
    if (streak >= 7) return { reward: "⭐ Special Badge", xp: 200 };
    if (streak >= 3) return { reward: "🔥 Bonus XP", xp: 100 };
    return null;
  };
  
  const reward = getStreakReward();
  
  return (
    <DashboardCard title="Daily Streak" icon={Flame}>
      <div className="space-y-4">
        {/* Streak Display */}
        <div>
          <div className="flex items-baseline gap-2">
            <div className="text-5xl font-bold text-orange-600">
              {streak}
            </div>
            <span className="text-sm text-gray-500">days</span>
          </div>
          <p className="text-sm text-gray-500">in a row! 🔥</p>
        </div>
        
        {/* Streak Calendar */}
        <div className="flex gap-2">
          {days.map((day, index) => {
            const isActive = index < streak % 7;
            const isToday = index === today;
            
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className={`flex-1 h-10 rounded-lg flex items-center justify-center text-sm font-medium
                  ${isActive 
                    ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white" 
                    : isToday 
                      ? "bg-orange-100 text-orange-600 border-2 border-orange-400"
                      : "bg-gray-100 text-gray-400"}`}
              >
                {day}
              </motion.div>
            );
          })}
        </div>
        
        {/* Streak Message */}
        <div className="text-center">
          {streak === 0 ? (
            <p className="text-sm text-gray-500">Complete a lesson to start your streak! 🎯</p>
          ) : streak === 1 ? (
            <p className="text-sm text-orange-600">Great start! Keep it going! 🔥</p>
          ) : streak < 7 ? (
            <p className="text-sm text-orange-600">{7 - streak} more days to get a special badge! ⭐</p>
          ) : (
            <p className="text-sm text-orange-600">Amazing consistency! You're on fire! 🔥🔥🔥</p>
          )}
        </div>
        
        {/* Streak Reward */}
        {reward && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-3 text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5" />
                <div>
                  <p className="text-sm font-medium">Streak Reward!</p>
                  <p className="text-xs opacity-90">{reward.reward}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">+{reward.xp} XP</p>
                <p className="text-xs opacity-90">Bonus</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardCard>
  );
}