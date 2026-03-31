import { motion } from "framer-motion";
import { Bell, Search, Moon, Sun, Bot } from "lucide-react";
import { useState } from "react";

export default function Topbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="h-16 bg-white/30 backdrop-blur-xl border-b border-white/20 px-6 flex items-center justify-between shadow-sm">
      
      {/* Left */}
      <h1 className="text-xl md:text-2xl font-bold">
        Welcome Back 👋
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* 🔍 Search */}
        <div className="hidden md:flex items-center bg-white/50 px-4 py-2 rounded-xl">
          <Search size={18} className="text-gray-500" />
          <input
            placeholder="Search tutors, sessions..."
            className="bg-transparent outline-none ml-2 text-sm"
          />
        </div>

        {/* 🤖 AI Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-gradient-to-r from-blue-500 to-green-400 text-white p-2 rounded-full shadow-lg"
        >
          <Bot size={18} />
        </motion.button>

        {/* 🔔 Notifications */}
        <div className="relative cursor-pointer">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            2
          </span>
        </div>

        {/* 🌙 Toggle */}
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* 👤 Profile */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-9 h-9 rounded-full cursor-pointer"
            onClick={() => setOpenProfile(!openProfile)}
          />

          {openProfile && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg p-2"
            >
              <p className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                Profile
              </p>
              <p className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                Settings
              </p>
              <p className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer text-red-500">
                Logout
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}