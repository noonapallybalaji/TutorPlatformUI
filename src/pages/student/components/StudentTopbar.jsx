// components/StudentTopbar.jsx
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, Moon, Sun, Bot, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function StudentTopbar({ studentName = "Alex" }) {
  const { isDark, toggleTheme } = useTheme();
  const [openProfile, setOpenProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  
  const notifications = [
    { id: 1, message: "You've completed a lesson! 🎉", time: "2 min ago", read: false },
    { id: 2, message: "New achievement unlocked!", time: "1 hour ago", read: false },
    { id: 3, message: "Don't break your streak!", time: "3 hours ago", read: true }
  ];
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  return (
    <div className={`h-16 backdrop-blur-xl border-b px-6 flex items-center justify-between shadow-sm
      ${isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/80 border-gray-200"}`}>
      
      {/* Search Bar */}
      <div className={`flex items-center px-4 py-2 rounded-xl w-1/3
        ${isDark ? "bg-gray-800" : "bg-white/50"}`}>
        <Search size={18} className={isDark ? "text-gray-400" : "text-gray-500"} />
        <input
          type="text"
          placeholder="Search subjects, tutors..."
          className={`bg-transparent outline-none ml-2 w-full text-sm
            ${isDark ? "text-white placeholder-gray-500" : "text-gray-700 placeholder-gray-400"}`}
        />
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* AI Assistant Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-500 to-green-400 text-white p-2 rounded-full shadow-lg"
        >
          <Bot size={18} />
        </motion.button>
        
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-full transition-all ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          >
            <Bell size={20} className={isDark ? "text-gray-400" : "text-gray-600"} />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
          
          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg overflow-hidden z-50
                  ${isDark ? "bg-gray-800" : "bg-white"} border ${isDark ? "border-gray-700" : "border-gray-200"}`}
              >
                <div className={`p-3 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`p-3 border-b ${isDark ? "border-gray-700" : "border-gray-100"} 
                      ${!notif.read ? (isDark ? "bg-blue-900/20" : "bg-blue-50") : ''}`}>
                      <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{notif.message}</p>
                      <p className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{notif.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
        >
          {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-700" />}
        </button>
        
        {/* Profile */}
        <div className="relative">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setOpenProfile(!openProfile)}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-white font-bold">
              {studentName.charAt(0)}
            </div>
            <span className={`text-sm font-medium hidden md:block ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {studentName}
            </span>
          </div>
          
          {/* Profile Dropdown */}
          <AnimatePresence>
            {openProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg overflow-hidden z-50
                  ${isDark ? "bg-gray-800" : "bg-white"} border ${isDark ? "border-gray-700" : "border-gray-200"}`}
              >
                <div className={`p-3 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                  <p className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>{studentName}</p>
                  <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Student</p>
                </div>
                <div className="p-2">
                  <button className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2
                    ${isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}>
                    <User size={16} />
                    Profile
                  </button>
                  <button className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2
                    ${isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}>
                    <Settings size={16} />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2
                      ${isDark ? "hover:bg-red-900/20 text-red-400" : "hover:bg-red-50 text-red-600"}`}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}