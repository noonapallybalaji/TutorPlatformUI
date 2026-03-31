// pages/RoleSelection.jsx - Updated with proper scroll background
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Heart,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  Star,
  BookOpen,
  Shield,
  Zap,
  Briefcase,
  School,
  ArrowRight,
  UserPlus,
  GraduationCap,
  Flame,
  Trophy,
  PartyPopper,
  Sun,
  Moon
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useTheme } from "../context/ThemeContext";

export default function RoleSelection() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  // ... (keep all role data and functions the same)

  return (
    <>
      {/* Fixed background that stays during scroll */}
      <div className={`fixed inset-0 z-0 ${isDark ? "bg-gray-900" : "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"}`} />
      
      {/* Floating Animated Elements - now with relative positioning */}
      <div className="relative z-10 min-h-screen pt-20">
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

        {/* Floating Animated Elements */}
        {[
          { icon: "📚", top: "5%", left: "10%", delay: 0 },
          { icon: "⭐", top: "15%", right: "12%", delay: 1 },
          { icon: "🎓", bottom: "10%", left: "8%", delay: 2 },
          { icon: "✨", top: "60%", right: "15%", delay: 0.5 },
          { icon: "💪", bottom: "20%", right: "20%", delay: 1.5 },
          { icon: "🔥", top: "30%", left: "5%", delay: 2.5 }
        ].map((el, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={{ 
              y: [0, -20, 0],
              x: [0, 15, -10, 0],
              opacity: [0, 0.5, 0.5, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut"
            }}
            className="absolute text-4xl pointer-events-none"
            style={{ top: el.top, left: el.left, right: el.right }}
          >
            {el.icon}
          </motion.div>
        ))}

        <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
          <motion.div
            className="max-w-5xl w-full"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {/* Header with Owl Mascot */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, type: "spring" },
                },
              }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 shadow-xl mx-auto ${
                  isDark
                    ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                    : "bg-gradient-to-br from-green-500 to-emerald-500"
                }`}
              >
                <span className="text-5xl">🦉</span>
              </motion.div>
              
              <h1 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? "text-white" : "text-slate-800"}`}>
                Join Our Learning
                <span className={`bg-clip-text text-transparent ${
                  isDark
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                    : "bg-gradient-to-r from-green-600 to-emerald-600"
                }`}>
                  {" "}Community
                </span>
              </h1>
              <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                Choose how you want to be part of our ecosystem - whether you're here to learn, 
                teach, or guide your child's education.
              </p>
              
              {/* XP Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-3 mt-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"
              >
                <Flame className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">2,450 XP</span>
                <Trophy className="w-3 h-3 text-white" />
                <span className="text-white font-bold text-sm">Level 12</span>
                <PartyPopper className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>

            {/* Two Column Layout - Cards with identical dimensions */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, type: "spring" },
                },
              }}
              className="grid md:grid-cols-2 gap-8 mb-12"
            >
              {/* Parent/Student Card */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => navigate("/register/parent/step1")}
                className="cursor-pointer group h-full"
              >
                <div className={`h-full rounded-3xl border-2 ${isDark ? "border-yellow-500/30 hover:border-yellow-500" : "border-blue-200 hover:border-blue-400"} relative overflow-hidden transition-all duration-300 shadow-xl ${
                  isDark ? "bg-gray-800/90" : "bg-white"
                }`}>
                  {/* Decorative Background */}
                  <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl ${
                    isDark ? "bg-yellow-500/10" : "bg-blue-100/40"
                  }`}></div>
                  <div className={`absolute bottom-0 left-0 w-40 h-40 rounded-full blur-2xl ${
                    isDark ? "bg-orange-500/10" : "bg-blue-100/40"
                  }`}></div>

                  {/* Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                        isDark ? "bg-yellow-500/20 text-yellow-400" : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      Most Popular 👨‍👩‍👧
                    </motion.span>
                  </div>
                  
                  <div className="relative p-8 flex flex-col h-full">
                    {/* Icon with bounce */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-md ${
                        isDark ? "bg-yellow-500/20" : "bg-blue-50"
                      }`}
                    >
                      <School className={`w-10 h-10 ${isDark ? "text-yellow-500" : "text-blue-600"}`} />
                    </motion.div>

                    <h2 className={`text-2xl md:text-3xl font-black mb-3 ${isDark ? "text-white" : "text-slate-800"}`}>
                      Parent / Student
                    </h2>
                    
                    <p className={`text-sm mb-6 leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                      Find expert tutors, track progress, and support your child's learning journey
                    </p>

                    {/* Benefits */}
                    <div className="space-y-2 mb-6 flex-grow">
                      <p className={`text-sm font-black mb-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>✨ What you get:</p>
                      {[
                        "Personalized learning paths ✨",
                        "Real-time progress tracking 📊", 
                        "AI-powered recommendations 🤖",
                        "Multi-child management 👨‍👩‍👧",
                        "Performance analytics 📈"
                      ].map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.05 }}
                          className="flex items-center space-x-2"
                        >
                          <div className={`w-2 h-2 rounded-full ${isDark ? "bg-yellow-500" : "bg-blue-500"}`}></div>
                          <span className={`text-sm ${isDark ? "text-gray-300" : "text-slate-600"}`}>{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className={`grid grid-cols-2 gap-4 pt-4 border-t-2 ${isDark ? "border-gray-700" : "border-blue-100"} mb-6`}>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">👥</span>
                        <div>
                          <p className={`text-base font-black ${isDark ? "text-white" : "text-slate-800"}`}>15k+</p>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>Active Users</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">📈</span>
                        <div>
                          <p className={`text-base font-black ${isDark ? "text-white" : "text-slate-800"}`}>92%</p>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>Success Rate</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <button
                        onClick={() => navigate("/register/parent/step1")}
                        className={`w-full py-3 text-white rounded-xl font-bold text-base hover:shadow-lg transition-all flex items-center justify-center space-x-2 ${
                          isDark
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-yellow-500/25"
                            : "bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-blue-500/25"
                        }`}
                      >
                        <span>Get Started</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tutor Card */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => navigate("/register/tutor/step1")}
                className="cursor-pointer group h-full"
              >
                <div className={`h-full rounded-3xl border-2 ${isDark ? "border-purple-500/30 hover:border-purple-500" : "border-purple-300 hover:border-purple-500"} relative overflow-hidden transition-all duration-300 shadow-xl ${
                  isDark ? "bg-gray-800/90" : "bg-gradient-to-br from-white to-purple-50"
                }`}>
                  {/* Rainbow Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Decorative Elements */}
                  <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl ${
                    isDark ? "bg-purple-500/20" : "bg-purple-400/20"
                  }`}></div>
                  <div className={`absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl ${
                    isDark ? "bg-pink-500/20" : "bg-pink-400/20"
                  }`}></div>

                  {/* Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                        isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      Earn Money 👨‍🏫
                    </motion.span>
                  </div>
                  
                  <div className="relative p-8 flex flex-col h-full">
                    {/* Icon with bounce */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-lg ${
                        isDark
                          ? "bg-gradient-to-br from-purple-500 to-pink-500"
                          : "bg-gradient-to-br from-purple-600 to-pink-600"
                      }`}
                    >
                      <Briefcase className="w-10 h-10 text-white" />
                    </motion.div>

                    <h2 className={`text-2xl md:text-3xl font-black mb-3 ${isDark ? "text-white" : "text-slate-800"}`}>
                      Tutor
                    </h2>
                    
                    <p className={`text-sm mb-6 leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                      Share your knowledge, earn income, and inspire the next generation
                    </p>

                    {/* Benefits */}
                    <div className="space-y-2 mb-6 flex-grow">
                      <p className={`text-sm font-black mb-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>⭐ What you get:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Set your own schedule ⏰",
                          "Competitive earnings 💰",
                          "Global student community 🌍",
                          "Professional development 📚",
                          "AI teaching assistant 🤖"
                        ].map((benefit, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + idx * 0.05 }}
                            className="flex items-center space-x-2"
                          >
                            <div className={`w-2 h-2 rounded-full ${isDark ? "bg-purple-500" : "bg-purple-500"}`}></div>
                            <span className={`text-sm ${isDark ? "text-gray-300" : "text-slate-600"}`}>{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className={`flex gap-4 pt-4 border-t-2 ${isDark ? "border-gray-700" : "border-purple-200"} mb-6`}>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">💰</span>
                        <div>
                          <p className={`text-base font-black ${isDark ? "text-white" : "text-slate-800"}`}>$50/hr</p>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>Earning Potential</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">⏰</span>
                        <div>
                          <p className={`text-base font-black ${isDark ? "text-white" : "text-slate-800"}`}>24/7</p>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>Flexible Hours</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">👥</span>
                        <div>
                          <p className={`text-base font-black ${isDark ? "text-white" : "text-slate-800"}`}>2k+</p>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>Active Tutors</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <button
                        onClick={() => navigate("/register/tutor/step1")}
                        className={`w-full py-3 text-white rounded-xl font-bold text-base hover:shadow-lg transition-all flex items-center justify-center space-x-2 ${
                          isDark
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25"
                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-500/25"
                        }`}
                      >
                        <span>Start Teaching & Earn</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, type: "spring" },
                },
              }}
              className="text-center pt-4"
            >
              <div className="flex flex-wrap justify-center gap-4 items-center">
                {[
                  { icon: Shield, label: "Verified Tutors", color: "emerald", emoji: "🛡️" },
                  { icon: Star, label: "4.9/5 Rating", color: "amber", emoji: "⭐" },
                  { icon: Users, label: "15k+ Active Users", color: "blue", emoji: "👥" },
                  { icon: Zap, label: "24/7 Support", color: "purple", emoji: "⚡" },
                  { icon: Award, label: "Top Rated Tutors", color: "orange", emoji: "🏆" }
                ].map((badge, idx) => {
                  const BadgeIcon = badge.icon;
                  const colorClass = {
                    "emerald": isDark ? "border-emerald-500/30 text-emerald-400" : "text-emerald-500 border-emerald-200",
                    "amber": isDark ? "border-amber-500/30 text-amber-400" : "text-amber-500 border-amber-200",
                    "blue": isDark ? "border-blue-500/30 text-blue-400" : "text-blue-500 border-blue-200",
                    "purple": isDark ? "border-purple-500/30 text-purple-400" : "text-purple-500 border-purple-200",
                    "orange": isDark ? "border-orange-500/30 text-orange-400" : "text-orange-500 border-orange-200"
                  }[badge.color];
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-sm border-2 shadow-sm hover:shadow-md transition-all ${
                        isDark
                          ? `bg-gray-800/80 ${colorClass}`
                          : `bg-white/80 ${colorClass}`
                      }`}
                    >
                      <span className="text-base">{badge.emoji}</span>
                      <BadgeIcon className={`w-4 h-4 ${colorClass.split(' ')[0]}`} />
                      <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-slate-600"}`}>{badge.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Fun Fact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 text-center"
            >
              <p className={`text-xs ${isDark ? "text-gray-500" : "text-slate-400"}`}>
                🎉 Join 15,000+ learners • ⭐ 4.9/5 rating • 🚀 Start your adventure today!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}