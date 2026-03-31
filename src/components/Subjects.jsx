// components/Subjects.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Calculator, FlaskConical, BookOpen, Atom, Code, History, Globe, Music, 
  Sparkles, Brain, Database, Paintbrush, Microscope, Landmark, Trophy, Languages, Cpu,
  ChevronRight, Star, Flame, Zap, Award
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import api from "../api/axio";

export default function Subjects() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredSubject, setHoveredSubject] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/subjects");
      const subjectsData = Array.isArray(response.data) ? response.data : [];
      setSubjects(subjectsData);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
      setError("Unable to load subjects");
      setSubjects([
        { id: 1, name: "Mathematics", icon: "Calculator", color: "blue", count: 1240, level: "Beginner to Advanced", badge: "📐", xp: 500 },
        { id: 2, name: "Physics", icon: "Atom", color: "indigo", count: 856, level: "Intermediate", badge: "⚡", xp: 450 },
        { id: 3, name: "Chemistry", icon: "FlaskConical", color: "green", count: 792, level: "Intermediate", badge: "🧪", xp: 480 },
        { id: 4, name: "Biology", icon: "Microscope", color: "emerald", count: 734, level: "Beginner", badge: "🔬", xp: 420 },
        { id: 5, name: "English", icon: "BookOpen", color: "purple", count: 890, level: "All Levels", badge: "📖", xp: 550 },
        { id: 6, name: "Programming", icon: "Code", color: "orange", count: 654, level: "Advanced", badge: "💻", xp: 600 },
        { id: 7, name: "History", icon: "History", color: "amber", count: 543, level: "Intermediate", badge: "🏛️", xp: 430 },
        { id: 8, name: "Geography", icon: "Globe", color: "cyan", count: 498, level: "Beginner", badge: "🌍", xp: 410 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName) => {
    const icons = {
      Calculator, FlaskConical, BookOpen, Atom, Code, History, Globe, Music,
      Brain, Database, Paintbrush, Microscope, Landmark, Trophy, Languages, Cpu
    };
    return icons[iconName] || Sparkles;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: "bg-blue-100 dark:bg-blue-500/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-500/30", gradient: "from-blue-500 to-blue-600" },
      green: { bg: "bg-green-100 dark:bg-green-500/20", text: "text-green-600 dark:text-green-400", border: "border-green-200 dark:border-green-500/30", gradient: "from-green-500 to-green-600" },
      purple: { bg: "bg-purple-100 dark:bg-purple-500/20", text: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-500/30", gradient: "from-purple-500 to-purple-600" },
      indigo: { bg: "bg-indigo-100 dark:bg-indigo-500/20", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-200 dark:border-indigo-500/30", gradient: "from-indigo-500 to-indigo-600" },
      orange: { bg: "bg-orange-100 dark:bg-orange-500/20", text: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-500/30", gradient: "from-orange-500 to-orange-600" },
      emerald: { bg: "bg-emerald-100 dark:bg-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-500/30", gradient: "from-emerald-500 to-emerald-600" },
      amber: { bg: "bg-amber-100 dark:bg-amber-500/20", text: "text-amber-600 dark:text-amber-400", border: "border-amber-200 dark:border-amber-500/30", gradient: "from-amber-500 to-amber-600" },
      cyan: { bg: "bg-cyan-100 dark:bg-cyan-500/20", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-200 dark:border-cyan-500/30", gradient: "from-cyan-500 to-cyan-600" }
    };
    return colors[color] || colors.blue;
  };

  const handleSubjectClick = (subjectName) => {
    navigate(`/find-tutors?subject=${encodeURIComponent(subjectName)}`);
  };

  if (loading) {
    return (
      <div className={`py-16 ${isDark ? "bg-gray-900" : "bg-gradient-to-b from-white to-green-50"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`rounded-2xl p-6 animate-pulse shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 ${isDark ? "bg-gray-700" : "bg-green-100"}`}></div>
                <div className={`h-5 rounded w-3/4 mx-auto mb-2 ${isDark ? "bg-gray-700" : "bg-green-100"}`}></div>
                <div className={`h-4 rounded w-1/2 mx-auto ${isDark ? "bg-gray-700/50" : "bg-green-50"}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-16 ${isDark ? "bg-gray-900" : "bg-gradient-to-b from-white to-green-50"} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 shadow-xl ${
              isDark
                ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                : "bg-gradient-to-br from-green-500 to-emerald-500"
            }`}
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-3xl font-black mb-3 ${isDark ? "text-white" : "text-slate-800"}`}
          >
            Popular{" "}
            <span className={`bg-clip-text text-transparent ${
              isDark
                ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                : "bg-gradient-to-r from-green-600 to-emerald-600"
            }`}>
              Subjects
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-slate-600"}`}
          >
            Explore our wide range of subjects taught by expert tutors
          </motion.p>

          {/* XP Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full shadow-lg ${
              isDark
                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                : "bg-gradient-to-r from-yellow-400 to-orange-400"
            }`}
          >
            <Flame className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">2,450 XP</span>
            <Star className="w-3 h-3 text-white fill-current" />
            <span className="text-white font-bold text-sm">Level 12</span>
          </motion.div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map((subject, index) => {
            const Icon = getIcon(subject.icon);
            const colors = getColorClasses(subject.color);
            const isHovered = hoveredSubject === subject.id;
            
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredSubject(subject.id)}
                onHoverEnd={() => setHoveredSubject(null)}
                onClick={() => handleSubjectClick(subject.name)}
                className="group cursor-pointer"
              >
                <div className={`relative rounded-2xl p-5 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${colors.border} overflow-hidden ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}>
                  {/* XP Badge */}
                  <div className="absolute top-3 right-3 bg-yellow-400 rounded-full px-2 py-0.5 text-xs font-bold text-white shadow-md">
                    +{subject.xp || 400} XP
                  </div>
                  
                  {/* Icon with animated effect */}
                  <motion.div
                    animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-20 h-20 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-xl`}
                  >
                    <Icon className={`w-10 h-10 ${colors.text}`} />
                  </motion.div>
                  
                  <h3 className={`font-black mb-1 ${isDark ? "text-white" : "text-slate-800"}`}>{subject.name}</h3>
                  <p className={`text-xs mb-2 ${isDark ? "text-gray-400" : "text-slate-500"}`}>{subject.count || 0}+ tutors</p>
                  
                  {/* Level Indicator */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <Award className={`w-3 h-3 ${isDark ? "text-yellow-500" : "text-green-500"}`} />
                    <span className={`text-xs font-medium ${isDark ? "text-yellow-400" : "text-green-600"}`}>{subject.level || "All Levels"}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-gray-700" : "bg-green-100"}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(85 + index * 5, 95)}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
                    />
                  </div>
                  
                  {/* CTA Button */}
                  <motion.button
                    animate={isHovered ? { x: 5 } : { x: 0 }}
                    className={`mt-4 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1 ${
                      isDark ? "text-yellow-400" : "text-green-600"
                    }`}
                  >
                    Find Tutors <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Challenge Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-10 rounded-2xl p-6 shadow-xl ${
            isDark
              ? "bg-gradient-to-r from-yellow-600 to-orange-600"
              : "bg-gradient-to-r from-yellow-400 to-orange-400"
          } text-white`}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black">Weekly Challenge</h4>
                <p className="text-white/80 text-sm">Complete 5 subjects this week</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    {i === 2 ? "🔥" : "⭐"}
                  </div>
                ))}
              </div>
              <button className="px-4 py-2 bg-white text-orange-600 rounded-full font-bold text-sm hover:shadow-lg transition-all">
                Join Challenge
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}