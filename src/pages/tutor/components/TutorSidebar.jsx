import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Users, Calendar, DollarSign, Settings } from "lucide-react";

const menu = [
  { name: "Dashboard", icon: Home, path: "/tutor-dashboard" },
  { name: "Students", icon: Users, path: "/tutor/students" },
  { name: "Sessions", icon: Calendar, path: "/tutor/sessions" },
  { name: "Earnings", icon: DollarSign, path: "/tutor/earnings" },
  { name: "Settings", icon: Settings, path: "/tutor/settings" },
];

export default function TutorSidebar() {
  return (
    <div className="w-64 h-screen bg-white/30 backdrop-blur-xl p-4 shadow-xl">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">TutorAI</h1>

      {menu.map((item, i) => {
        const Icon = item.icon;
        return (
          <NavLink key={i} to={item.path}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-3 p-3 rounded-xl mb-2 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-green-400 text-white"
                    : "hover:bg-white/40"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </motion.div>
            )}
          </NavLink>
        );
      })}
    </div>
  );
}