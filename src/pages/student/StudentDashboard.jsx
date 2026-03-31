// pages/student/StudentDashboard.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import StudentSidebar from "./components/StudentSidebar";
import StudentTopbar from "./components/StudentTopbar";
import XPCard from "./components/XPCard";
import BadgeSection from "./components/BadgeSection";
import AssignmentList from "./components/AssignmentList";
import ProgressChart from "./components/ProgressChart";
import AIStudyAssistant from "./components/AIStudyAssistant";
import DailyStreak from "./components/DailyStreak";
import EvolvingAvatar from "./components/EvolvingAvatar";
import GoalTracker from "./components/GoalTracker";
import StudyRecommendations from "./components/StudyRecommendations";
import { Menu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function StudentDashboard() {
  const { isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "Alex Johnson",
    xp: 750,
    level: 5,
    streak: 7,
    subjects: [
      { name: "Mathematics", progress: 75, icon: "📐" },
      { name: "Science", progress: 60, icon: "🔬" },
      { name: "English", progress: 85, icon: "📖" }
    ],
    achievements: [
      { name: "Fast Learner", icon: "🏅", unlocked: true },
      { name: "7-Day Streak", icon: "🔥", unlocked: true },
      { name: "Math Pro", icon: "📘", unlocked: false }
    ]
  });

  // Close sidebar on window resize (desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - Responsive */}
      <div className={`
        fixed lg:relative z-50 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Topbar with mobile menu button */}
        <div className="lg:hidden p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        
        <motion.div
          className="flex-1 overflow-y-auto p-4 sm:p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Responsive Grid - Mobile first */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Avatar & Streak Section - Full width on mobile */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 space-y-4">
              <EvolvingAvatar 
                level={studentData.level}
                streak={studentData.streak}
                xp={studentData.xp}
              />
              <DailyStreak streak={studentData.streak} />
            </div>

            {/* XP & Quick Stats */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <XPCard xp={studentData.xp} level={studentData.level} />
                <GoalTracker />
              </div>
            </div>

            {/* Progress Chart */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-7">
              <ProgressChart />
            </div>

            {/* Study Recommendations */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-5">
              <StudyRecommendations subjects={studentData.subjects} />
            </div>

            {/* Assignments */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-5">
              <AssignmentList />
            </div>

            {/* Badges */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-7">
              <BadgeSection badges={studentData.achievements} />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* AI Assistant - Floating Chat Button */}
      <AIStudyAssistant />
    </div>
  );
}