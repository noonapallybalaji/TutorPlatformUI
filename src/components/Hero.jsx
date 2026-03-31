// components/Hero.jsx
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useTheme } from "../context/ThemeContext";
import { 
  Sparkles, Search, MapPin, GraduationCap, Mic, ChevronRight, 
  Flame, Star, Trophy, Brain, Target, Zap, Rocket, Compass,
  Award, BookOpen, Users, BarChart3, PartyPopper, Smile, Heart
} from "lucide-react";
import api from "../api/axio";

// Smoke/Particle Background with Dark/Light mode support
const SmokeBackground = ({ isDark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const createParticles = () => {
      particles = [];
      // Dark mode: dark gray/black smoke, Light mode: light white/blue smoke
      const baseColor = isDark ? 'rgba(30, 30, 40, ' : 'rgba(220, 240, 255, ';
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 80 + 40,
          alpha: Math.random() * 0.2 + 0.05,
          speedX: (Math.random() - 0.5) * 0.1,
          speedY: (Math.random() - 0.5) * 0.05,
          color: `${baseColor}${Math.random() * 0.15 + 0.05})`
        });
      }
    };
    
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < -150) p.x = canvas.width + 150;
        if (p.x > canvas.width + 150) p.x = -150;
        if (p.y < -150) p.y = canvas.height + 150;
        if (p.y > canvas.height + 150) p.y = -150;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    resizeCanvas();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDark]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

// Simple Illustration Component
const SimpleIllustration = ({ isDark }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(imgRef.current,
      { scale: 0.9, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.2)", delay: 0.3 }
    );
  }, []);

  return (
    <div ref={imgRef} className="relative">
      <img
        src="https://illustrations.popsy.co/white/student-learning.svg"
        alt="Student learning illustration"
        className="w-full h-auto max-w-md mx-auto drop-shadow-2xl"
      />
      <div className="absolute -top-4 -right-4 animate-float">
        <Sparkles className={`w-6 h-6 ${isDark ? "text-yellow-500" : "text-green-500"} opacity-60`} />
      </div>
      <div className="absolute -bottom-4 -left-4 animate-float animation-delay-1000">
        <BookOpen className={`w-6 h-6 ${isDark ? "text-orange-500" : "text-emerald-500"} opacity-60`} />
      </div>
    </div>
  );
};

// Whimsical Character
const WhimsicalMascot = ({ message, isTyping, isDark }) => {
  const mascotRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(mascotRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.2)", delay: 0.2 }
    );
  }, []);

  return (
    <div ref={mascotRef} className="relative">
      <div className="w-36 h-36 mx-auto relative">
        <div className={`absolute inset-0 rounded-full opacity-30 blur-xl animate-pulse ${
          isDark ? "bg-gradient-to-r from-yellow-300 to-orange-300" : "bg-gradient-to-r from-green-300 to-emerald-300"
        }`}></div>
        
        <div className={`relative w-full h-full rounded-full flex items-center justify-center shadow-xl animate-bounce-slow ${
          isDark
            ? "bg-gradient-to-br from-yellow-400 to-orange-500"
            : "bg-gradient-to-br from-green-400 to-emerald-500"
        }`}>
          <div className="relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex gap-6">
              <div className="relative">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center animate-blink">
                  <div className="w-2.5 h-2.5 bg-slate-800 rounded-full"></div>
                </div>
              </div>
              <div className="relative">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center animate-blink">
                  <div className="w-2.5 h-2.5 bg-slate-800 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-4 border-b-4 border-white rounded-full"></div>
            </div>
          </div>
          
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-3 bg-yellow-300 rounded-full"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-yellow-400 rounded-t-lg"></div>
          </div>
        </div>
      </div>
      
      <div className="relative mt-6">
        <div className={`relative rounded-3xl p-4 shadow-lg border-2 ${
          isDark
            ? "bg-gray-800 border-yellow-500/30"
            : "bg-white border-green-200"
        }`}>
          <p className={`text-center font-medium text-sm relative z-10 ${isDark ? "text-gray-200" : "text-slate-700"}`}>
            {message}
          </p>
          {isTyping && (
            <div className="flex justify-center gap-1 mt-2 relative z-10">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce animation-delay-400"></div>
            </div>
          )}
        </div>
        <div className={`absolute -top-2 left-10 w-4 h-4 transform rotate-45 border-l-2 border-t-2 ${
          isDark
            ? "bg-gray-800 border-yellow-500/30"
            : "bg-white border-green-200"
        }`}></div>
      </div>
    </div>
  );
};

// Playful Badge
const PlayfulBadge = ({ label, value, emoji, isDark }) => {
  const badgeRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(badgeRef.current,
      { scale: 0 },
      { scale: 1, duration: 0.4, delay: 0.1, ease: "back.out" }
    );
  }, []);

  return (
    <div ref={badgeRef} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 shadow-sm hover:shadow-md transition-all ${
      isDark
        ? "bg-yellow-500/20 border-yellow-500/30"
        : "bg-green-50 border-green-200"
    }`}>
      <span className="text-base">{emoji}</span>
      <span className={`text-xs font-bold ${isDark ? "text-yellow-400" : "text-green-700"}`}>{label}</span>
      <span className={`text-xs font-extrabold ${isDark ? "text-yellow-300" : "text-green-800"}`}>{value}</span>
    </div>
  );
};

// Animated Progress Bar
const AnimatedProgress = ({ progress, isDark }) => {
  const progressRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(progressRef.current,
      { width: 0 },
      { width: `${progress}%`, duration: 1.2, delay: 0.3, ease: "power2.out" }
    );
  }, [progress]);

  return (
    <div className="relative">
      <div className={`w-full h-3 rounded-full overflow-hidden ${isDark ? "bg-gray-700" : "bg-green-100"}`}>
        <div ref={progressRef} className={`h-full relative ${
          isDark
            ? "bg-gradient-to-r from-yellow-400 to-orange-500"
            : "bg-gradient-to-r from-green-400 to-emerald-500"
        }`}>
          <motion.div
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-8 bg-white/30 skew-x-12"
          />
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const searchCardRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  const [searchData, setSearchData] = useState({
    subject: "",
    location: "",
    class: "",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [mascotMessage, setMascotMessage] = useState("Hi there! Ready for an adventure? 🎉");
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
    );
    
    gsap.fromTo(searchCardRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)", delay: 0.4 }
    );
  }, []);

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "English",
    "History", "Geography", "Computer Science", "Programming"
  ];

  useEffect(() => {
    if (searchData.subject) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timer);
    }
  }, [searchData.subject]);

  const handleSearch = async () => {
    if (!searchData.subject) {
      setMascotMessage("What would you like to learn? Tell me! 📚");
      return;
    }
    
    setIsSearching(true);
    setMascotMessage("Yay! Finding the perfect tutor for you... 🚀");
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2000);
    
    try {
      const response = await api.get("/tutors/search", {
        params: {
          subject: searchData.subject,
          location: searchData.location,
          class: searchData.class,
        },
      });
      
      localStorage.setItem("searchResults", JSON.stringify(response.data));
      setMascotMessage("Woohoo! Your matches are ready! 🎉");
      
      setTimeout(() => {
        navigate("/find-tutors", { state: { results: response.data } });
      }, 1000);
    } catch (error) {
      console.error("Search failed:", error);
      setMascotMessage("Oops! Let's try again together! 🤗");
      setTimeout(() => {
        navigate("/find-tutors");
      }, 1000);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubjectChange = async (value) => {
    setSearchData({ ...searchData, subject: value });
    setMascotMessage(`${value} is super fun! Let's find a great tutor! 🌟`);
    
    if (value.length > 2) {
      try {
        const response = await api.get("/tutors/suggestions", {
          params: { query: value }
        });
        setSuggestions(response.data);
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions(subjects.filter(s => s.toLowerCase().includes(value.toLowerCase())));
        setShowSuggestions(true);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const popularSearches = ["Mathematics", "Science", "English", "Physics", "Programming"];

  const messages = [
    "You're doing great! 🌟",
    "Learning is fun! 📚",
    "Almost there! 🎯",
    "You got this! 💪"
  ];

  return (
    <>
      {/* Smoke Background */}
      <SmokeBackground isDark={isDark} />
      
      {/* Main Content Container with dark mode background */}
      <div className={`relative z-10 min-h-screen ${isDark ? "bg-gray-900" : "bg-transparent"}`}>
        <motion.div 
          ref={heroRef}
          style={{ opacity }}
          className="pt-24 pb-16 px-4 sm:px-6"
        >
          {/* Confetti Effect */}
          <AnimatePresence>
            {confetti && (
              <div className="fixed inset-0 pointer-events-none z-50">
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: Math.random() * window.innerWidth,
                      y: -50,
                      rotate: 0
                    }}
                    animate={{ 
                      y: window.innerHeight + 50,
                      rotate: 360
                    }}
                    transition={{ 
                      duration: Math.random() * 2 + 1,
                      delay: Math.random() * 0.5,
                      ease: "linear"
                    }}
                    className="absolute"
                  >
                    <span className="text-xl">
                      {["🎉", "✨", "⭐", "🌟", "🎈", "📚", "🎓"][Math.floor(Math.random() * 7)]}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* LEFT - Content */}
              <div ref={titleRef}>
                {/* Playful Badges */}
                <div className="flex gap-2 mb-6 flex-wrap">
                  <PlayfulBadge label="Active Tutors" value="2,500+" emoji="👥" isDark={isDark} />
                  <PlayfulBadge label="Success Rate" value="95%" emoji="🏆" isDark={isDark} />
                  <PlayfulBadge label="Happy Students" value="10k+" emoji="😊" isDark={isDark} />
                </div>

                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black leading-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                  Find your perfect
                  <br />
                  <span className="relative inline-block">
                    <span className={`bg-clip-text text-transparent ${
                      isDark
                        ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                        : "bg-gradient-to-r from-green-500 to-emerald-600"
                    }`}>
                      tutor
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 8">
                      <path d="M0 4 Q10 2 20 4 T40 4 T60 4 T80 4 T100 4" stroke={isDark ? "#F59E0B" : "#10B981"} strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                  </span>
                  {" "}and start
                  <br />
                  learning today! 🎉
                </h1>

                <p className={`mt-4 text-lg ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                  Let's make learning fun and exciting together!
                </p>

                {/* Playful Search Card */}
                <motion.div
                  ref={searchCardRef}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`mt-8 backdrop-blur-sm rounded-3xl shadow-2xl border-2 p-6 relative overflow-hidden ${
                    isDark
                      ? "bg-gray-800/95 border-yellow-500/30"
                      : "bg-white/95 border-green-200"
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-full ${
                    isDark ? "bg-yellow-500/10" : "bg-gradient-to-br from-green-100 to-transparent"
                  }`}></div>
                  <div className={`absolute bottom-0 left-0 w-20 h-20 rounded-full ${
                    isDark ? "bg-orange-500/10" : "bg-gradient-to-tr from-emerald-100 to-transparent"
                  }`}></div>
                  
                  <div className="space-y-3 relative z-10">
                    {/* Playful Step Indicator */}
                    <div className="flex items-center gap-2 mb-3">
                      {[
                        { step: "1️⃣", label: "What to learn?", active: true },
                        { step: "📍", label: "Where?", active: false },
                        { step: "📚", label: "Your level", active: false }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <div className={`text-lg ${item.step === "1️⃣" ? "animate-bounce" : ""}`}>
                            {item.step}
                          </div>
                          <span className={`text-xs font-medium ${item.step === "1️⃣" ? "text-green-600" : isDark ? "text-gray-400" : "text-slate-500"}`}>
                            {item.label}
                          </span>
                          {idx < 2 && <ChevronRight className={`w-3 h-3 ml-1 ${isDark ? "text-gray-500" : "text-slate-400"}`} />}
                        </div>
                      ))}
                    </div>

                    {/* Subject Input */}
                    <div className="relative">
                      <div className={`flex items-center border-2 rounded-2xl transition-all focus-within:ring-4 ${
                        isDark
                          ? "border-yellow-500/30 bg-gray-700/50 focus-within:border-yellow-500 focus-within:ring-yellow-500/20"
                          : "border-green-200 bg-green-50/50 focus-within:border-green-400 focus-within:ring-green-200"
                      }`}>
                        <span className="ml-4 text-xl">🔍</span>
                        <input
                          type="text"
                          placeholder="What do you want to learn today? 📖"
                          value={searchData.subject}
                          onChange={(e) => handleSubjectChange(e.target.value)}
                          className={`flex-1 p-4 bg-transparent outline-none placeholder:text-sm font-medium text-base ${
                            isDark ? "text-white placeholder-gray-400" : "text-slate-800 placeholder-slate-400"
                          }`}
                        />
                        <button className={`mr-2 p-2 rounded-full transition-all hover:scale-110 ${
                          isDark ? "hover:bg-yellow-500/20" : "hover:bg-green-100"
                        }`}>
                          <Mic className={`w-5 h-5 ${isDark ? "text-yellow-500" : "text-green-500"}`} />
                        </button>
                      </div>
                      
                      {showSuggestions && suggestions.length > 0 && (
                        <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-xl border-2 z-10 max-h-60 overflow-y-auto ${
                          isDark
                            ? "bg-gray-800 border-yellow-500/30"
                            : "bg-white border-green-200"
                        }`}>
                          {suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setSearchData({ ...searchData, subject: suggestion });
                                setShowSuggestions(false);
                                setMascotMessage(`Awesome choice! ${suggestion} is so cool! 🌟`);
                              }}
                              className={`w-full text-left px-4 py-3 transition-colors text-sm flex items-center gap-2 border-b last:border-0 ${
                                isDark
                                  ? "text-gray-300 hover:bg-gray-700 border-gray-700"
                                  : "text-slate-700 hover:bg-green-50 border-green-100"
                              }`}
                            >
                              <span className="text-lg">✨</span>
                              {typeof suggestion === 'string' ? suggestion : suggestion.subject}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Location & Class Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">📍</span>
                        <input
                          type="text"
                          placeholder="Where are you?"
                          value={searchData.location}
                          onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                          className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none focus:ring-4 transition-all ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500/20"
                              : "bg-slate-50 border-slate-200 text-slate-800 focus:border-green-400 focus:ring-green-100"
                          }`}
                        />
                      </div>

                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">📚</span>
                        <select
                          value={searchData.class}
                          onChange={(e) => setSearchData({ ...searchData, class: e.target.value })}
                          className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none focus:ring-4 appearance-none cursor-pointer ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white focus:border-yellow-500 focus:ring-yellow-500/20"
                              : "bg-slate-50 border-slate-200 text-slate-800 focus:border-green-400 focus:ring-green-100"
                          }`}
                        >
                          <option value="">What grade are you in?</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i} value={`Class ${i+1}`}>Class {i+1}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Search Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSearch}
                      disabled={isSearching}
                      className={`w-full py-4 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2 group ${
                        isDark
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                          : "bg-gradient-to-r from-green-500 to-emerald-500"
                      }`}
                    >
                      {isSearching ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Finding magic...</span>
                        </div>
                      ) : (
                        <>
                          <span>🔍</span>
                          <span>Find My Tutor</span>
                          <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                          >
                            ✨
                          </motion.span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Popular Searches */}
                <div className="mt-4 flex flex-wrap gap-2 items-center">
                  <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-slate-500"}`}>🔥 Popular:</span>
                  {popularSearches.map((search) => (
                    <motion.button
                      key={search}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSubjectChange(search)}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                        isDark
                          ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>

                {/* Fun Fact */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`mt-6 p-3 rounded-2xl border ${
                    isDark
                      ? "bg-yellow-500/10 border-yellow-500/20"
                      : "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
                  }`}
                >
                  <p className={`text-xs text-center ${isDark ? "text-yellow-400" : "text-yellow-700"}`}>
                    💡 Did you know? Students who use our platform improve grades by 30% on average!
                  </p>
                </motion.div>
              </div>

              {/* RIGHT - Simple Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className={`relative rounded-3xl p-8 border-2 shadow-xl ${
                  isDark
                    ? "bg-gray-800/80 border-yellow-500/30 backdrop-blur-sm"
                    : "bg-gradient-to-br from-green-100 via-emerald-100 to-green-50 border-green-200"
                }`}>
                  <div className="absolute -top-4 -right-4 animate-float">
                    <span className="text-3xl">🎈</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 animate-float animation-delay-1000">
                    <span className="text-3xl">⭐</span>
                  </div>
                  
                  <SimpleIllustration isDark={isDark} />
                  
                  {/* Fun Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className={`text-center p-3 rounded-2xl shadow-md border-2 ${
                      isDark
                        ? "bg-gray-700 border-yellow-500/30"
                        : "bg-white border-green-200"
                    }`}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-xl">📈</span>
                      </div>
                      <p className={`text-lg font-bold ${isDark ? "text-yellow-400" : "text-green-600"}`}>95%</p>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>Success Rate</p>
                    </div>
                    <div className={`text-center p-3 rounded-2xl shadow-md border-2 ${
                      isDark
                        ? "bg-gray-700 border-orange-500/30"
                        : "bg-white border-emerald-200"
                    }`}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-xl">👥</span>
                      </div>
                      <p className={`text-lg font-bold ${isDark ? "text-orange-400" : "text-emerald-600"}`}>10k+</p>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>Happy Learners</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-4">
                    <div className={`flex justify-between text-xs mb-1 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                      <span>🎯 Your learning journey</span>
                      <span className="animate-pulse">30% complete! 🚀</span>
                    </div>
                    <AnimatedProgress progress={30} isDark={isDark} />
                  </div>

                  {/* Encouraging Message */}
                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mt-4 text-center"
                  >
                    <p className={`text-xs font-medium ${isDark ? "text-yellow-400" : "text-green-600"}`}>
                      {messages[Math.floor(Math.random() * messages.length)]}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Playful Loading Overlay */}
          <AnimatePresence>
            {isSearching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center ${
                  isDark
                    ? "bg-black/80"
                    : "bg-gradient-to-br from-green-500/80 to-emerald-500/80"
                }`}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className={`rounded-3xl p-8 max-w-sm mx-4 text-center shadow-2xl border-4 ${
                    isDark
                      ? "bg-gray-800 border-yellow-500"
                      : "bg-white border-green-300"
                  }`}
                >
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity }
                      }}
                      className={`w-full h-full rounded-full flex items-center justify-center shadow-xl ${
                        isDark
                          ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                          : "bg-gradient-to-br from-green-400 to-emerald-500"
                      }`}
                    >
                      <span className="text-5xl">🦉</span>
                    </motion.div>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>Finding magic... ✨</h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>Matching you with the perfect tutor</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

