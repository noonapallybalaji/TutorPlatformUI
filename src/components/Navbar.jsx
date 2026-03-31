// components/Navbar.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Menu, X, Bell, User, LogOut, Settings, ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!token);
    setUserData(user);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animation for navbar
  useEffect(() => {
    gsap.fromTo(".navbar-logo", 
      { opacity: 0, y: -20, rotation: -5 },
      { opacity: 1, y: 0, rotation: 0, duration: 0.8, ease: "back.out(1.2)" }
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Find Tutors", path: "/find-tutors", icon: "🔍" },
    { name: "Subjects", path: "/subjects", icon: "📚" },
    { name: "How It Works", path: "/how-it-works", icon: "✨" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? "bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-800"
            : "bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200"
          : isDark
          ? "bg-gray-900/80 backdrop-blur-md"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Owl */}
          <motion.div
            className="navbar-logo flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
              isDark
                ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                : "bg-gradient-to-br from-green-500 to-emerald-500"
            }`}>
              <span className="text-white text-xl">🦉</span>
            </div>
            <span className={`text-2xl font-black ${
              isDark
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
            }`}>
              TutorAI
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(item.path)}
                className={`text-sm font-semibold transition-all flex items-center gap-1 px-3 py-2 rounded-full ${
                  location.pathname === item.path
                    ? isDark
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-100 text-green-700"
                    : isDark
                    ? "text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400"
                    : "text-slate-600 hover:bg-green-50 hover:text-green-600"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Owl Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: isDark ? -15 : 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`relative p-2 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-yellow-500/20 hover:bg-yellow-500/30"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {isLoggedIn ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </motion.button>

                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                      isDark
                        ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                        : "bg-gradient-to-br from-green-500 to-emerald-500"
                    }`}>
                      <span className="text-white text-sm">🦉</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </motion.button>
                  
                  <div className={`absolute right-0 mt-2 w-48 rounded-2xl shadow-xl border overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-slate-200"
                  }`}>
                    <div className={`p-2 border-b ${isDark ? "border-gray-700" : "border-slate-100"}`}>
                      <p className="text-sm font-bold text-gray-800 dark:text-white">{userData?.parent?.name || "Learner"}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">⭐ 1,234 XP</p>
                    </div>
                    <button
                      onClick={() => navigate("/profiles")}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center space-x-2 ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Switch Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-xl transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className={`px-5 py-2 text-sm font-semibold transition-colors rounded-full ${
                    isDark
                      ? "text-gray-300 hover:text-yellow-400"
                      : "text-slate-700 hover:text-green-600"
                  }`}
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/signup")}
                  className={`px-5 py-2 text-white text-sm font-bold rounded-full shadow-md transition-all ${
                    isDark
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-yellow-500/25"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-green-500/25"
                  }`}
                >
                  Sign Up 🚀
                </motion.button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${
                isDark
                  ? "hover:bg-gray-800"
                  : "hover:bg-slate-100"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden py-4 border-t ${
                isDark ? "border-gray-800" : "border-slate-200"
              }`}
            >
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 px-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-2 ${
                    isDark
                      ? "text-gray-300 hover:text-yellow-400 hover:bg-gray-800"
                      : "text-slate-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}