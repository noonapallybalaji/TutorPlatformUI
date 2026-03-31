import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axio";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  GraduationCap,
  TrendingUp,
  Award,
  Github,
  Chrome,
  Calendar,
  Star,
  Shield,
  Zap,
  CheckCircle2,
  Flame,
  Trophy,
  Sun,
  Moon
} from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password) return;
    
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", form.email);
      }
      
      const role = res.data.roles[0];
      if (role === "Parent") navigate("/parent-dashboard");
      if (role === "Student") navigate("/student-dashboard");
      if (role === "Tutor") navigate("/tutor-dashboard");
    } catch {
      alert("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Floating elements animation with dark mode support
  const floatingElements = [
    { icon: "📚", top: "10%", left: "5%", delay: 0 },
    { icon: "⭐", top: "20%", right: "8%", delay: 1 },
    { icon: "🎓", bottom: "15%", left: "10%", delay: 2 },
    { icon: "✨", top: "70%", right: "12%", delay: 1.5 },
    { icon: "💪", bottom: "30%", right: "20%", delay: 0.5 },
    { icon: "🔥", top: "40%", left: "15%", delay: 2.5 }
  ];

  return (
    <>
      {/* Fixed Background */}
      <div className={`fixed inset-0 z-0 ${isDark ? "bg-gray-900" : "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"}`} />
      
      {/* Floating Animated Elements */}
      {floatingElements.map((el, idx) => (
        <motion.div
          key={idx}
          initial={{ y: 0, x: 0, opacity: 0 }}
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut"
          }}
          className="absolute text-3xl pointer-events-none z-0"
          style={{ top: el.top, left: el.left, right: el.right }}
        >
          {el.icon}
        </motion.div>
      ))}

      {/* Theme Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={toggleTheme}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all ${
          isDark 
            ? "bg-yellow-500 hover:bg-yellow-600" 
            : "bg-gray-800 hover:bg-gray-900"
        }`}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-white" />
        ) : (
          <Moon className="w-5 h-5 text-white" />
        )}
      </motion.button>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl w-full">
          
          {/* Left Side - Playful Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="hidden lg:flex flex-col justify-center space-y-8 px-4"
          >
            {/* Logo with bounce */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center space-x-3"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                isDark
                  ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                  : "bg-gradient-to-br from-green-500 to-emerald-500"
              }`}>
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <span className={`text-2xl font-black bg-clip-text text-transparent ${
                isDark
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                  : "bg-gradient-to-r from-green-600 to-emerald-600"
              }`}>
                TutorAI
              </span>
            </motion.div>

            {/* Hero Text with animated underline */}
            <div className="space-y-4">
              <h1 className={`text-4xl lg:text-5xl font-black leading-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                Welcome Back to
                <br />
                <span className="relative inline-block">
                  <span className={`bg-clip-text text-transparent ${
                    isDark
                      ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                      : "bg-gradient-to-r from-green-600 to-emerald-600"
                  }`}>
                    Smarter Learning
                  </span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className={`absolute -bottom-2 left-0 h-1 rounded-full ${
                      isDark
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                    }`}
                  />
                </span>
              </h1>
              <p className={`text-lg ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                Continue your learning journey with AI-powered tutoring 🚀
              </p>
            </div>

            {/* Stats Cards - Playful with dark mode */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                className={`rounded-2xl p-4 border-2 shadow-md ${
                  isDark
                    ? "bg-gray-800/90 backdrop-blur-sm border-yellow-500/30"
                    : "bg-white/90 backdrop-blur-sm border-green-200"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDark ? "bg-yellow-500/20" : "bg-green-100"
                  }`}>
                    <Flame className={`w-6 h-6 ${isDark ? "text-yellow-500" : "text-green-600"}`} />
                  </div>
                  <div>
                    <p className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-800"}`}>95%</p>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>Success Rate</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                className={`rounded-2xl p-4 border-2 shadow-md ${
                  isDark
                    ? "bg-gray-800/90 backdrop-blur-sm border-orange-500/30"
                    : "bg-white/90 backdrop-blur-sm border-green-200"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDark ? "bg-orange-500/20" : "bg-emerald-100"
                  }`}>
                    <Trophy className={`w-6 h-6 ${isDark ? "text-orange-500" : "text-emerald-600"}`} />
                  </div>
                  <div>
                    <p className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-800"}`}>10k+</p>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>Happy Students</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Features List - Playful with dark mode */}
            <div className="space-y-3">
              {[
                { icon: Sparkles, text: "AI-powered personalized learning", emoji: "✨", color: "green" },
                { icon: Calendar, text: "Flexible scheduling", emoji: "📅", color: "emerald" },
                { icon: Star, text: "Verified expert tutors", emoji: "⭐", color: "teal" },
                { icon: Shield, text: "Secure & Trusted Platform", emoji: "🛡️", color: "green" }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className={`flex items-center gap-3 p-3 backdrop-blur-sm rounded-xl border-2 transition-all group ${
                      isDark
                        ? "bg-gray-800/80 border-gray-700 hover:border-yellow-500/30"
                        : "bg-white/80 border-green-100 hover:border-green-200"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isDark ? "bg-yellow-500/20" : "bg-green-100"
                    }`}>
                      <Icon className={`w-5 h-5 ${isDark ? "text-yellow-500" : "text-green-600"}`} />
                    </div>
                    <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-slate-700"}`}>{feature.text}</span>
                    <span className="text-lg ml-auto">{feature.emoji}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Trust Badge - Duolingo style with dark mode */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 border ${
                isDark
                  ? "bg-gray-800/80 border-yellow-500/30"
                  : "bg-white/80 border-green-200"
              }`}>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-slate-600"}`}>Trusted by 10k+ parents</span>
              </div>
              <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 border ${
                isDark
                  ? "bg-gray-800/80 border-yellow-500/30"
                  : "bg-white/80 border-green-200"
              }`}>
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-slate-600"}`}>24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form (Playful with dark mode) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-md">
              <div className={`backdrop-blur-xl rounded-3xl shadow-2xl border-2 p-6 md:p-8 ${
                isDark
                  ? "bg-gray-800/95 border-yellow-500/30"
                  : "bg-white/95 border-green-200"
              }`}>
                {/* Header with animated character */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-5 shadow-lg mx-auto ${
                      isDark
                        ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                        : "bg-gradient-to-br from-green-500 to-emerald-500"
                    }`}
                  >
                    <span className="text-4xl">🦉</span>
                  </motion.div>
                  <h2 className={`text-2xl font-black mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>Welcome Back!</h2>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>Ready to continue your adventure? 🚀</p>
                </div>

                {/* Form */}
                <div className="space-y-5">
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                      📧 Email Address
                    </label>
                    <div className="relative group">
                      <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors w-5 h-5 ${
                        isDark ? "text-gray-500 group-focus-within:text-yellow-500" : "text-slate-400 group-focus-within:text-green-500"
                      }`} />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20"
                            : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-200"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className={`block text-sm font-bold ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                        🔒 Password
                      </label>
                      <button className={`text-xs font-bold transition-colors ${
                        isDark ? "text-yellow-500 hover:text-yellow-400" : "text-green-600 hover:text-green-700"
                      }`}>
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative group">
                      <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors w-5 h-5 ${
                        isDark ? "text-gray-500 group-focus-within:text-yellow-500" : "text-slate-400 group-focus-within:text-green-500"
                      }`} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl transition-all ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20"
                            : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-200"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                          isDark ? "text-gray-500 hover:text-gray-300" : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className={`w-4 h-4 rounded cursor-pointer ${
                          isDark
                            ? "border-gray-600 text-yellow-500 focus:ring-yellow-500 focus:ring-offset-0"
                            : "border-slate-300 text-green-600 focus:ring-green-500 focus:ring-offset-0"
                        }`}
                      />
                      <span className={`text-sm transition-colors ${isDark ? "text-gray-400 group-hover:text-gray-300" : "text-slate-600 group-hover:text-slate-700"}`}>
                        Remember me
                      </span>
                    </label>
                  </div>

                  <button
                    onClick={handleLogin}
                    disabled={isLoading || !form.email || !form.password}
                    className={`w-full py-3 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2 ${
                      isDark
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-yellow-500/25"
                        : "bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-green-500/25"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Logging in...</span>
                      </div>
                    ) : (
                      <>
                        <span>Login</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className={`w-full border-t-2 ${isDark ? "border-gray-700" : "border-green-100"}`}></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className={`px-3 font-medium ${isDark ? "bg-gray-800 text-gray-500" : "bg-white text-slate-500"}`}>
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Login - Playful with dark mode */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center justify-center space-x-2 py-2.5 px-4 border-2 rounded-xl transition-all group ${
                        isDark
                          ? "bg-gray-700 border-gray-600 hover:bg-yellow-500/20 hover:border-yellow-500"
                          : "bg-slate-50 border-slate-200 hover:bg-green-50 hover:border-green-300"
                      }`}
                    >
                      <Chrome className={`w-5 h-5 transition-colors ${isDark ? "text-gray-400 group-hover:text-yellow-500" : "text-slate-600 group-hover:text-green-600"}`} />
                      <span className={`text-sm font-medium transition-colors ${isDark ? "text-gray-300 group-hover:text-yellow-400" : "text-slate-700 group-hover:text-green-700"}`}>
                        Google
                      </span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center justify-center space-x-2 py-2.5 px-4 border-2 rounded-xl transition-all group ${
                        isDark
                          ? "bg-gray-700 border-gray-600 hover:bg-yellow-500/20 hover:border-yellow-500"
                          : "bg-slate-50 border-slate-200 hover:bg-green-50 hover:border-green-300"
                      }`}
                    >
                      <Github className={`w-5 h-5 transition-colors ${isDark ? "text-gray-400 group-hover:text-yellow-500" : "text-slate-600 group-hover:text-green-600"}`} />
                      <span className={`text-sm font-medium transition-colors ${isDark ? "text-gray-300 group-hover:text-yellow-400" : "text-slate-700 group-hover:text-green-700"}`}>
                        GitHub
                      </span>
                    </motion.button>
                  </div>

                  {/* Register Link */}
                  <div className="text-center pt-2">
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                      Don't have an account?{" "}
                      <button
                        onClick={() => navigate("/signup")}
                        className={`font-bold transition-colors inline-flex items-center gap-1 ${
                          isDark ? "text-yellow-500 hover:text-yellow-400" : "text-green-600 hover:text-green-700"
                        }`}
                      >
                        Sign up
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </p>
                  </div>

                  {/* Fun Fact with dark mode */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className={`mt-4 p-3 rounded-xl border-2 ${
                      isDark
                        ? "bg-yellow-500/10 border-yellow-500/20"
                        : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                    }`}
                  >
                    <p className={`text-xs text-center flex items-center justify-center gap-1 ${
                      isDark ? "text-yellow-400" : "text-green-700"
                    }`}>
                      <Sparkles className="w-3 h-3" />
                      Demo: parent@example.com / password123
                      <Sparkles className="w-3 h-3" />
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}