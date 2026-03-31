// components/StudyRecommendations.jsx
import { motion } from "framer-motion";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import { Lightbulb, TrendingUp, Clock, Zap } from "lucide-react";

export default function StudyRecommendations({ subjects }) {
  const recommendations = [
    { text: "Focus on Fractions - your next math milestone!", priority: "high", subject: "Mathematics" },
    { text: "Review Chemical Reactions before next class", priority: "medium", subject: "Science" },
    { text: "Practice English Grammar exercises", priority: "low", subject: "English" }
  ];
  
  // AI-powered recommendation based on subject progress
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-600 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
      default: return 'bg-green-100 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
    }
  };
  
  return (
    <DashboardCard title="AI Study Recommendations" icon={Lightbulb}>
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className={`p-3 rounded-xl border-2 ${getPriorityColor(rec.priority)} bg-white/50 dark:bg-gray-800/50 cursor-pointer`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {rec.priority === 'high' ? (
                  <Zap className="w-5 h-5 text-red-500" />
                ) : rec.priority === 'medium' ? (
                  <Clock className="w-5 h-5 text-yellow-500" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium dark:text-white">{rec.text}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{rec.subject}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/50 dark:bg-gray-700">
                    {rec.priority} priority
                  </span>
                </div>
              </div>
              <button className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400">
                Start →
              </button>
            </div>
          </motion.div>
        ))}
        
        {/* Daily Challenge */}
        <div className="mt-3 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">🎯 Daily Challenge</p>
              <p className="text-xs opacity-90">Complete 2 lessons today</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">+100 XP</p>
              <p className="text-xs opacity-90">Bonus reward</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}