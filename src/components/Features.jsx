// components/Features.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, TrendingUp, CheckCircle2, MessageSquare, 
  BarChart3, Clock, Award, Brain, Target, Zap, ChevronLeft, ChevronRight,
  Sparkles, Star, Flame, Trophy, BookOpen, Users
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Features() {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);

  const features = [
    {
      title: "Attendance Tracking",
      description: "Monitor your child's attendance with daily updates",
      icon: Calendar,
      color: "blue",
      value: "85%",
      trend: "+5% this month",
      badge: "📊",
      bgGradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Progress Reports",
      description: "Detailed analytics on learning improvement",
      icon: TrendingUp,
      color: "green",
      value: "Improving",
      trend: "+12% average",
      badge: "📈",
      bgGradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Homework Tracking",
      description: "Track submissions and completion rates",
      icon: CheckCircle2,
      color: "emerald",
      value: "92%",
      trend: "Completion rate",
      badge: "✅",
      bgGradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Session Notes",
      description: "AI-generated summaries of each session",
      icon: MessageSquare,
      color: "purple",
      value: "24 notes",
      trend: "Last 30 days",
      badge: "📝",
      bgGradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Performance Analytics",
      description: "Compare with peers and track growth",
      icon: BarChart3,
      color: "orange",
      value: "Top 15%",
      trend: "vs grade level",
      badge: "🎯",
      bgGradient: "from-orange-500 to-red-500"
    },
    {
      title: "Smart Scheduling",
      description: "AI-optimized learning schedule",
      icon: Clock,
      color: "indigo",
      value: "3 sessions",
      trend: "This week",
      badge: "⏰",
      bgGradient: "from-indigo-500 to-blue-500"
    }
  ];

  const [progressData, setProgressData] = useState({
    healthScore: 85,
    subjects: [
      { name: "Mathematics", progress: 78, color: "blue" },
      { name: "Science", progress: 82, color: "green" },
      { name: "English", progress: 91, color: "purple" }
    ]
  });

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type === 'mousedown' ? e.clientX : e.touches[0].clientX);
  };

  const handleDragEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevSlide();
      else nextSlide();
    }
  };

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 300 }
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    })
  };

  return (
    <div className={`py-16 ${isDark ? "bg-gray-900" : "bg-gradient-to-b from-white to-green-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg ${
              isDark
                ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                : "bg-gradient-to-br from-green-500 to-emerald-500"
            }`}
          >
            <Brain className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className={`text-3xl font-black mb-3 ${isDark ? "text-white" : "text-slate-800"}`}>
            Track Your Child's{" "}
            <span className={`bg-clip-text text-transparent ${
              isDark
                ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                : "bg-gradient-to-r from-green-600 to-emerald-600"
            }`}>
              Learning Progress
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-slate-600"}`}>
            Real-time insights and analytics to monitor academic growth
          </p>
        </div>

        {/* Learning Health Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-12 rounded-2xl p-6 text-white shadow-xl ${
            isDark
              ? "bg-gradient-to-r from-yellow-600 to-orange-600"
              : "bg-gradient-to-r from-green-500 to-emerald-500"
          }`}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black">Learning Health Score</h3>
                <p className="text-white/80 text-sm">Overall academic performance indicator</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black">{progressData.healthScore}</div>
              <div className="text-white/80 text-sm">out of 100</div>
            </div>
            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressData.healthScore}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Features Cards - Swipeable on Mobile */}
        <div className="relative">
          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 cursor-pointer ${
                    isDark
                      ? "bg-gray-800 hover:shadow-yellow-500/10 border-gray-700"
                      : "bg-white hover:shadow-2xl border-green-100"
                  }`}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.bgGradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`text-lg font-black ${isDark ? "text-white" : "text-slate-800"}`}>{feature.title}</h3>
                    <span className="text-xl">{feature.badge}</span>
                  </div>
                  <p className={`text-sm mb-3 ${isDark ? "text-gray-400" : "text-slate-500"}`}>{feature.description}</p>
                  
                  <div className={`pt-3 border-t-2 ${isDark ? "border-gray-700" : "border-green-100"}`}>
                    <p className={`text-2xl font-black ${isDark ? "text-yellow-400" : "text-green-600"}`}>{feature.value}</p>
                    <p className={`text-xs mt-1 flex items-center gap-1 ${isDark ? "text-yellow-400/80" : "text-green-500"}`}>
                      <TrendingUp className="w-3 h-3" />
                      {feature.trend}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Swipeable Carousel */}
          <div className="md:hidden relative">
            <div
              ref={containerRef}
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
              className="relative overflow-hidden"
            >
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`rounded-2xl p-6 shadow-xl border-2 ${
                    isDark
                      ? "bg-gray-800 border-yellow-500/30"
                      : "bg-white border-green-100"
                  }`}
                >
                  {(() => {
                    const feature = features[currentIndex];
                    const Icon = feature.icon;
                    return (
                      <>
                        <div className={`w-16 h-16 bg-gradient-to-br ${feature.bgGradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-800"}`}>{feature.title}</h3>
                          <span className="text-2xl">{feature.badge}</span>
                        </div>
                        <p className={`mb-4 ${isDark ? "text-gray-400" : "text-slate-500"}`}>{feature.description}</p>
                        <div className={`pt-3 border-t-2 ${isDark ? "border-gray-700" : "border-green-100"}`}>
                          <p className={`text-3xl font-black ${isDark ? "text-yellow-400" : "text-green-600"}`}>{feature.value}</p>
                          <p className={`text-sm mt-1 flex items-center gap-1 ${isDark ? "text-yellow-400/80" : "text-green-500"}`}>
                            <TrendingUp className="w-4 h-4" />
                            {feature.trend}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all border-2 ${
                isDark
                  ? "bg-gray-800 border-yellow-500/30 text-yellow-500 hover:bg-gray-700"
                  : "bg-white border-green-200 text-green-600 hover:bg-green-50"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all border-2 ${
                isDark
                  ? "bg-gray-800 border-yellow-500/30 text-yellow-500 hover:bg-gray-700"
                  : "bg-white border-green-200 text-green-600 hover:bg-green-50"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`transition-all ${
                    idx === currentIndex 
                      ? `w-6 h-2 rounded-full ${isDark ? "bg-yellow-500" : "bg-green-500"}` 
                      : `w-2 h-2 rounded-full ${isDark ? "bg-gray-600" : "bg-green-200"}`
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}