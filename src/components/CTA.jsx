// components/CTA.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Award, Zap, Trophy, Star, Flame } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function CTA() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const stats = [
    { icon: Users, label: "Active Learners", value: "10k+", color: "green" },
    { icon: Award, label: "Success Rate", value: "95%", color: "yellow" },
    { icon: Zap, label: "Hours Saved", value: "1M+", color: "blue" },
    { icon: Trophy, label: "Top Tutors", value: "2.5k+", color: "purple" }
  ];

  return (
    <div className="relative overflow-hidden">
      <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-yellow-600 to-orange-700" : "bg-gradient-to-br from-green-600 to-emerald-700"}`}>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, x: 0 }}
            animate={{ y: [0, -20, 0], x: [0, 10, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            className="absolute opacity-20 text-4xl"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          >
            {["📚", "⭐", "🌟", "✨", "🎯", "💪", "🔥", "🎉"][i % 8]}
          </motion.div>
        ))}
      </div>

      <div className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 shadow-xl ${
              isDark ? "bg-yellow-500" : "bg-white"
            }`}
          >
            <span className="text-5xl">🦉</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black text-white mb-4"
          >
            Ready to Start Your
            <br />
            <span className="relative inline-block">
              Learning Adventure?
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-8 -right-8"
              >
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </motion.div>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-green-100 text-lg mb-8 max-w-2xl mx-auto"
          >
            Join thousands of happy learners and start your journey to success today!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 min-w-[100px] border border-white/30"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon className="w-5 h-5 text-white" />
                    <span className="text-white font-bold text-xl">{stat.value}</span>
                  </div>
                  <p className="text-white/80 text-xs mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/signup")}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-full font-black text-lg hover:shadow-2xl transition-all group"
          >
            <span>Start Learning Now</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="group-hover:translate-x-1 transition-transform"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-4 text-white/80 text-sm"
          >
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4" />
              <span>30-Day Streak Challenge</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>Free Trial Available</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}