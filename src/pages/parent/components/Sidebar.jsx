import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  Calendar,
  BookOpen,
  BarChart2,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/parent-dashboard" },
  { name: "Find Tutors", icon: Search, path: "/find-tutors" },
  { name: "Sessions", icon: Calendar, path: "/sessions" },
  { name: "Homework", icon: BookOpen, path: "/homework" },
  { name: "Reports", icon: BarChart2, path: "/reports" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white/30 backdrop-blur-xl border-r border-white/20 shadow-xl p-5 hidden md:flex flex-col">
      
      {/* Logo */}
      <h2 className="text-2xl font-bold text-blue-600 mb-8">
        Parent Panel
      </h2>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink key={index} to={item.path}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-green-400 text-white shadow-lg"
                      : "text-gray-700 hover:bg-white/40"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className="mt-auto">
        <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white p-4 rounded-xl shadow-lg">
          <p className="text-sm">🎯 Track Progress</p>
          <p className="text-xs opacity-80">
            Stay updated with your child’s learning
          </p>
        </div>
      </div>
    </div>
  );
}