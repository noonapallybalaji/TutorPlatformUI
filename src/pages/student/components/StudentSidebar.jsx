// components/StudentSidebar.jsx
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  BarChart2,
  Brain,
  Settings,
  Trophy,
  Calendar,
  MessageCircle
} from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/student-dashboard" },
  { name: "Assignments", icon: BookOpen, path: "/assignments" },
  { name: "Progress", icon: BarChart2, path: "/progress" },
  { name: "Achievements", icon: Trophy, path: "/achievements" },
  { name: "Schedule", icon: Calendar, path: "/schedule" },
  { name: "AI Assistant", icon: Brain, path: "/ai" },
  { name: "Messages", icon: MessageCircle, path: "/messages" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function StudentSidebar() {
  const { isDark } = useTheme();

  return (
    <div className={`w-64 h-screen backdrop-blur-xl border-r shadow-xl p-4 flex flex-col
      ${isDark 
        ? "bg-gray-900/80 border-gray-800" 
        : "bg-white/30 border-white/20"}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center">
          <span className="text-white font-bold text-lg">T</span>
        </div>
        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-600"}`}>
          TutorAI
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink key={index} to={item.path}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-green-400 text-white shadow-lg"
                      : isDark
                        ? "text-gray-400 hover:bg-white/10"
                        : "text-gray-700 hover:bg-white/40"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1 h-6 rounded-full bg-white"
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto">
        <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🔥</span>
            <p className="text-sm font-medium">Keep Learning!</p>
          </div>
          <p className="text-xs opacity-90">
            You're doing great today! Complete your daily goal for bonus XP.
          </p>
          <div className="mt-3 w-full bg-white/20 rounded-full h-1">
            <div className="w-2/3 h-full bg-white rounded-full" />
          </div>
        </div>
        
        {/* XP Summary */}
        <div className={`mt-4 p-3 rounded-xl text-center
          ${isDark ? "bg-gray-800/50" : "bg-white/50"}`}>
          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Today's Progress</p>
          <p className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>75% Complete</p>
        </div>
      </div>
    </div>
  );
}