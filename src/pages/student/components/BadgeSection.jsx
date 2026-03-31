// components/BadgeSection.jsx
import { motion } from "framer-motion";
import { Award, Lock } from "lucide-react";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import Badge from "../../../components/ui/Badge";

export default function BadgeSection({ badges = [] }) {
  const defaultBadges = [
    { name: "Fast Learner", icon: "🏅", color: "primary", unlocked: true, description: "Completed 5 lessons in a day" },
    { name: "7-Day Streak", icon: "🔥", color: "warning", unlocked: true, description: "Maintained a 7-day learning streak" },
    { name: "Math Pro", icon: "📘", color: "success", unlocked: false, description: "Master 5 math topics" },
    { name: "Science Star", icon: "🔬", color: "info", unlocked: false, description: "Complete all science modules" },
    { name: "Early Bird", icon: "🌅", color: "primary", unlocked: false, description: "Complete lessons before 9 AM" },
    { name: "Perfect Week", icon: "⭐", color: "warning", unlocked: false, description: "Complete all tasks for a week" }
  ];
  
  const displayBadges = badges.length > 0 ? badges : defaultBadges;
  
  return (
    <DashboardCard title="Achievements" icon={Award}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {displayBadges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className={`relative group cursor-pointer ${!badge.unlocked ? 'opacity-50' : ''}`}
          >
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all">
              <div className="text-4xl mb-1 relative">
                {badge.icon}
                {!badge.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-500/50 rounded-full">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <Badge variant={badge.color} size="md" className="text-center">
                {badge.name}
              </Badge>
              {badge.unlocked && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 
              text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {badge.description || (badge.unlocked ? 'Achievement unlocked!' : 'Keep learning to unlock!')}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Overall Progress */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Overall Achievement Progress</span>
          <span className="font-semibold text-green-600">
            {displayBadges.filter(b => b.unlocked).length}/{displayBadges.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${(displayBadges.filter(b => b.unlocked).length / displayBadges.length) * 100}%` }}
          />
        </div>
      </div>
    </DashboardCard>
  );
}