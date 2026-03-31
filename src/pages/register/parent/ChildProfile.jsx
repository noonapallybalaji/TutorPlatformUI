// pages/register/parent/ChildProfile.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, GraduationCap, BookOpen, Target, Sparkles,
  ArrowLeft, CheckCircle2, Heart, Clock, MapPin, Star,
  Globe, Home, RefreshCw, Smile, ThumbsUp, Rocket,
  Brain, Laptop, BookMarked, Shield, Award, TrendingUp,
  Zap, Sun, Moon, ChevronRight, Calendar
} from "lucide-react";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import StepProgress from "../../../components/ui/StepProgress";
import { useTheme } from "../../../context/ThemeContext";
import api from "../../../api/axio"; // Import the API client

// --- Helper Components ---

const FloatingEmoji = ({ children, delay = 0 }) => (
  <motion.span
    className="inline-block ml-1 text-lg"
    initial={{ y: 0, opacity: 1 }}
    animate={{ y: [-2, -6, -2], opacity: [0.8, 1, 0.8] }}
    transition={{ duration: 1.5, repeat: Infinity, delay }}
  >
    {children}
  </motion.span>
);

const ReactionMessage = ({ message, icon: Icon, isVisible, isDark }) => {
  if (!isVisible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      className={`flex items-center gap-2 mt-2 text-sm rounded-full px-3 py-1.5 w-fit ${
        isDark
          ? "bg-green-900/30 text-green-400"
          : "bg-green-50 text-green-600"
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{message}</span>
    </motion.div>
  );
};

const SubjectChip = ({ subject, isSelected, onToggle, isDark }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(subject)}
      className={`
        relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${isSelected 
          ? isDark
            ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-900/30"
            : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-200"
          : isDark
            ? "bg-slate-800 text-gray-200 hover:bg-slate-700"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }
      `}
    >
      <div className="flex items-center gap-2">
        <BookMarked className={`w-4 h-4 ${isSelected ? "text-white" : isDark ? "text-gray-400" : "text-gray-500"}`} />
        <span>{subject}</span>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <CheckCircle2 className="w-4 h-4" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
};

const ModeCard = ({ mode, isSelected, onToggle, isDark }) => {
  const modeConfig = {
    Online: { icon: Globe, label: "Online", description: "Virtual classes anywhere" },
    "Home Tutor": { icon: Home, label: "Home Tutor", description: "In-person learning" },
    Both: { icon: RefreshCw, label: "Both", description: "Flexible hybrid option" },
  };
  
  const { icon: Icon, label, description } = modeConfig[mode];

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(mode)}
      className={`
        flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 text-left
        ${isSelected 
          ? isDark
            ? "border-yellow-500 bg-yellow-900/20 shadow-lg shadow-yellow-900/20"
            : "border-green-500 bg-green-50 shadow-lg shadow-green-100"
          : isDark
            ? "border-slate-700 bg-slate-800/50 hover:border-slate-600"
            : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
    >
      <div className={`p-3 rounded-full ${
        isSelected 
          ? isDark ? "bg-yellow-500/20" : "bg-green-100"
          : isDark ? "bg-slate-700" : "bg-gray-100"
      }`}>
        <Icon className={`w-6 h-6 ${
          isSelected 
            ? isDark ? "text-yellow-500" : "text-green-600"
            : isDark ? "text-gray-400" : "text-gray-600"
        }`} />
      </div>
      <div className="text-center">
        <span className={`font-semibold block ${isDark ? "text-white" : "text-slate-800"}`}>{label}</span>
        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{description}</span>
      </div>
      {isSelected && <CheckCircle2 className={`w-5 h-5 ${isDark ? "text-yellow-500" : "text-green-500"}`} />}
    </motion.button>
  );
};

export default function ChildProfile() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [reactions, setReactions] = useState({
    name: false,
    class: false,
    subjects: false,
  });

  const [childProfile, setChildProfile] = useState({
    name: "",
    class: "",
    subjects: [],
    goals: "",
    learningModes: [],
  });

  const subjects = [
    "Mathematics", "Science", "English", "Physics", "Chemistry", "Biology",
    "History", "Geography", "Computer Science", "Programming",
    "Music", "Art", "French", "Spanish", "Economics"
  ];

  const classes = [
    "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
    "Class 11", "Class 12"
  ];

  const learningModes = ["Online", "Home Tutor", "Both"];

  useEffect(() => {
    const savedData = localStorage.getItem("parentRegistration");
    if (!savedData) {
      navigate("/register/parent/step1");
    }
  }, [navigate]);

  const toggleSubject = (subject) => {
    setChildProfile((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const toggleLearningMode = (mode) => {
    setChildProfile((prev) => ({
      ...prev,
      learningModes: prev.learningModes.includes(mode)
        ? prev.learningModes.filter((m) => m !== mode)
        : [...prev.learningModes, mode],
    }));
  };

  // Trigger reactions based on input
  useEffect(() => {
    if (childProfile.name.length > 2 && !reactions.name) {
      setReactions(prev => ({ ...prev, name: true }));
      const timer = setTimeout(() => setReactions(prev => ({ ...prev, name: false })), 2000);
      return () => clearTimeout(timer);
    }
  }, [childProfile.name, reactions.name]);

  useEffect(() => {
    if (childProfile.class && !reactions.class) {
      setReactions(prev => ({ ...prev, class: true }));
      const timer = setTimeout(() => setReactions(prev => ({ ...prev, class: false })), 2000);
      return () => clearTimeout(timer);
    }
  }, [childProfile.class, reactions.class]);

  useEffect(() => {
    if (childProfile.subjects.length > 0 && !reactions.subjects) {
      setReactions(prev => ({ ...prev, subjects: true }));
      const timer = setTimeout(() => setReactions(prev => ({ ...prev, subjects: false })), 2000);
      return () => clearTimeout(timer);
    }
  }, [childProfile.subjects, reactions.subjects]);

  const handleSubmit = async () => {
    if (!childProfile.name || !childProfile.class || childProfile.subjects.length === 0) {
      alert("Please fill all required fields ✨");
      return;
    }

    if (childProfile.learningModes.length === 0) {
      alert("Please select a learning mode 🎓");
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      // Get all saved data from localStorage
      const parentData = JSON.parse(localStorage.getItem("parentRegistration"));
      const phone = localStorage.getItem("parentPhone");
      const location = JSON.parse(localStorage.getItem("parentLocation"));

      // Prepare the registration payload
      const payload = {
        fullName: parentData.fullName,
        email: parentData.email,
        password: parentData.password,
        phone: phone,
        role: "Parent",
        location: {
          address: location.address,
          city: location.city,
          state: location.state,
          pincode: location.pincode,
          coordinates: location.coordinates
        },
        childProfile: {
          name: childProfile.name,
          class: childProfile.class,
          subjects: childProfile.subjects,
          goals: childProfile.goals,
          learningModes: childProfile.learningModes
        }
      };

      // Make actual API call to register endpoint
      const response = await api.post("/auth/register", payload);
      
      // Store the authentication token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      
      // Store user data for profile screen
      const userData = {
        parent: {
          name: parentData.fullName,
          email: parentData.email,
          phone: phone
        },
        location: location,
        children: [childProfile],
        role: "parent",
        userId: response.data.userId
      };
      
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userRole", "parent");

      // Clear registration temp data
      localStorage.removeItem("parentRegistration");
      localStorage.removeItem("parentPhone");
      localStorage.removeItem("parentLocation");

      // Show success message
      alert("Registration successful! 🎉 Welcome to TutorAI!");

      // Navigate to profiles page
      navigate("/profiles");
      
    } catch (err) {
      console.error("Registration error:", err);
      
      // Handle different error responses
      if (err.response) {
        // Server responded with error
        const status = err.response.status;
        const message = err.response.data?.message || err.response.data?.error;
        
        if (status === 409) {
          setApiError("Email already exists. Please try logging in.");
          alert("Email already exists. Please login instead.");
        } else if (status === 400) {
          setApiError(message || "Invalid data. Please check your information.");
          alert(message || "Please check your information and try again.");
        } else if (status === 500) {
          setApiError("Server error. Please try again later.");
          alert("Server error. Please try again later.");
        } else {
          setApiError(message || "Registration failed. Please try again.");
          alert(message || "Registration failed. Please try again.");
        }
      } else if (err.request) {
        // Request was made but no response
        setApiError("Network error. Please check your connection.");
        alert("Network error. Please check your internet connection.");
      } else {
        // Something else happened
        setApiError("An unexpected error occurred. Please try again.");
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Determine AI suggestion
  const aiSuggestion = childProfile.subjects.length > 0 
    ? `Start with ${childProfile.subjects[0]} to build a strong foundation! 📚` 
    : "Select a subject to get a personalized learning plan 🤖";

  // Stats for engagement
  const stats = [
    { icon: TrendingUp, value: "95%", label: "Success Rate", color: "blue" },
    { icon: Award, value: "10k+", label: "Happy Kids", color: "purple" },
    { icon: Zap, value: "24/7", label: "Support", color: "orange" },
  ];

  return (
    <>
      {/* Fixed Background */}
      <div className={`fixed inset-0 z-0 ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-blue-50/30"}`} />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${isDark ? "bg-yellow-500/10" : "bg-blue-400/20"}`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse animation-delay-2000 ${isDark ? "bg-orange-500/10" : "bg-purple-400/20"}`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${isDark ? "bg-yellow-500/5" : "bg-indigo-400/10"}`}></div>
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className={`absolute inset-0 ${isDark ? "bg-grid-slate-800" : "bg-grid-slate-100"} [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]`}></div>
      </div>

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

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-6 pt-24 md:pt-6">
        {/* EXPANDED GRID - 2x wider on desktop */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-[90rem] w-full">
          
          {/* Left Side - Hero Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex flex-col justify-center space-y-10 px-6"
          >
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${
                isDark
                  ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                  : "bg-gradient-to-br from-blue-600 to-purple-600"
              }`}>
                <Heart className="w-7 h-7 text-white" />
              </div>
              <span className={`text-3xl font-bold bg-clip-text text-transparent ${
                isDark
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                  : "bg-gradient-to-r from-blue-600 to-purple-600"
              }`}>
                TutorAI
              </span>
            </motion.div>

            {/* Hero Text */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h1 className={`text-5xl lg:text-6xl font-bold leading-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                Create Your Child's
                <br />
                <span className={`bg-clip-text text-transparent ${
                  isDark
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                    : "bg-gradient-to-r from-blue-600 to-purple-600"
                }`}>
                  Learning Journey
                </span>
              </h1>
              <p className={`text-xl ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                Tell us about your child to find the perfect tutor match
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4"
            >
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className={`rounded-xl p-4 text-center border shadow-sm ${
                    isDark
                      ? "bg-slate-800/80 backdrop-blur-sm border-slate-700"
                      : "bg-white/80 backdrop-blur-sm border-slate-200"
                  }`}>
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${
                      isDark ? "bg-yellow-500/20" : `bg-${stat.color}-100`
                    }`}>
                      <Icon className={`w-5 h-5 ${isDark ? "text-yellow-500" : `text-${stat.color}-600`}`} />
                    </div>
                    <p className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>{stat.value}</p>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Benefits List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              {[
                { text: "Personalized tutor matching", icon: Sparkles },
                { text: "Track progress in real-time", icon: TrendingUp },
                { text: "Flexible learning schedules", icon: Calendar },
                { text: "AI-powered insights", icon: Brain }
              ].map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 p-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDark ? "bg-yellow-500/20" : "bg-green-100"
                    }`}>
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isDark ? "text-yellow-500" : "text-green-600"}`} />
                    </div>
                    <span className={`text-base ${isDark ? "text-gray-300" : "text-slate-600"}`}>{benefit.text}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* Security Note */}
            <div className={`mt-6 p-4 rounded-xl border ${
              isDark
                ? "bg-yellow-500/10 border-yellow-500/20"
                : "bg-blue-50 border-blue-100"
            }`}>
              <p className={`text-sm text-center flex items-center justify-center gap-2 ${
                isDark ? "text-yellow-400" : "text-blue-700"
              }`}>
                <Shield className="w-4 h-4" />
                Your child's data is private and secure
              </p>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-2xl">
              <div className={`backdrop-blur-xl rounded-3xl shadow-2xl border p-8 md:p-10 ${
                isDark
                  ? "bg-slate-800/95 border-slate-700"
                  : "bg-white/95 border-slate-200/80"
              }`}>
                {/* Header */}
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-lg mx-auto ${
                      isDark
                        ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                        : "bg-gradient-to-br from-blue-500 to-purple-600"
                    }`}
                  >
                    <Brain className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h2 className={`text-3xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-800"}`}>
                    Child's Learning Profile
                  </h2>
                  <p className={`text-base mb-5 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    Step 4 of 4: Almost there!
                  </p>

                  {/* Step Progress */}
                  <StepProgress 
                    currentStep={4} 
                    totalSteps={4}
                    labels={["Info", "Phone", "Location", "Child"]}
                    isDark={isDark}
                  />
                  
                  <div className={`mt-4 text-base flex items-center justify-center gap-2 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    <Rocket className="w-5 h-5" />
                    <span>Step 4 of 4 – Almost done 🚀</span>
                  </div>
                </div>

                {/* Error Message */}
                {apiError && (
                  <div className={`mb-6 p-4 rounded-xl border ${
                    isDark
                      ? "bg-red-900/20 border-red-800 text-red-400"
                      : "bg-red-50 border-red-200 text-red-600"
                  }`}>
                    <p className="text-sm text-center">{apiError}</p>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-8">
                  {/* Basic Info Section */}
                  <div>
                    <label className={`block text-base font-medium mb-3 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-pink-500" />
                        Basic Info
                      </div>
                    </label>
                    
                    <div className="relative mb-5">
                      <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors w-5 h-5 ${
                        isDark ? "text-gray-500 group-focus-within:text-yellow-500" : "text-slate-400 group-focus-within:text-blue-500"
                      }`} />
                      <input
                        type="text"
                        placeholder="Child's name"
                        value={childProfile.name}
                        onChange={(e) => {
                          setChildProfile({ ...childProfile, name: e.target.value });
                        }}
                        className={`w-full pl-12 pr-4 py-3.5 border rounded-xl transition-all text-base ${
                          isDark
                            ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                            : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        }`}
                      />
                      <AnimatePresence>
                        <ReactionMessage 
                          message="Nice to meet you 👋" 
                          icon={Smile} 
                          isVisible={reactions.name}
                          isDark={isDark}
                        />
                      </AnimatePresence>
                    </div>

                    <div className="relative">
                      <GraduationCap className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? "text-gray-500" : "text-slate-400"
                      }`} />
                      <select
                        value={childProfile.class}
                        onChange={(e) => {
                          setChildProfile({ ...childProfile, class: e.target.value });
                        }}
                        className={`w-full pl-12 pr-4 py-3.5 border rounded-xl transition-all appearance-none text-base ${
                          isDark
                            ? "bg-slate-700 border-slate-600 text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                            : "bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        }`}
                      >
                        <option value="">Select Class 📚</option>
                        {classes.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                      <AnimatePresence>
                        <ReactionMessage 
                          message="Great! Let's continue 🎯" 
                          icon={ThumbsUp} 
                          isVisible={reactions.class}
                          isDark={isDark}
                        />
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Subjects Section */}
                  <div>
                    <label className={`block text-base font-medium mb-4 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-green-500" />
                        Subjects
                      </div>
                    </label>
                    <div className="flex flex-wrap gap-3 max-h-60 overflow-y-auto p-1">
                      {subjects.map((s) => (
                        <SubjectChip
                          key={s}
                          subject={s}
                          isSelected={childProfile.subjects.includes(s)}
                          onToggle={toggleSubject}
                          isDark={isDark}
                        />
                      ))}
                    </div>
                    <AnimatePresence>
                      <ReactionMessage 
                        message="Awesome choices! 🎉" 
                        icon={Star} 
                        isVisible={reactions.subjects}
                        isDark={isDark}
                      />
                    </AnimatePresence>
                  </div>

                  {/* Learning Mode Section */}
                  <div>
                    <label className={`block text-base font-medium mb-4 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                      <div className="flex items-center gap-2">
                        <Laptop className="w-5 h-5 text-purple-500" />
                        Learning Mode
                      </div>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {learningModes.map((m) => (
                        <ModeCard
                          key={m}
                          mode={m}
                          isSelected={childProfile.learningModes.includes(m)}
                          onToggle={toggleLearningMode}
                          isDark={isDark}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Goals Section */}
                  <div>
                    <label className={`block text-base font-medium mb-3 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-orange-500" />
                        Learning Goals
                      </div>
                    </label>
                    <textarea
                      value={childProfile.goals}
                      onChange={(e) =>
                        setChildProfile({ ...childProfile, goals: e.target.value })
                      }
                      placeholder="What would you like your child to achieve? (e.g., improve math grades, learn coding, build confidence...)"
                      rows={4}
                      className={`w-full p-4 border rounded-xl transition-all text-base ${
                        isDark
                          ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                          : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      }`}
                    />
                  </div>

                  {/* AI Suggestion Card */}
                  <div className="flex gap-4 items-start">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      isDark ? "bg-yellow-500/20" : "bg-blue-100"
                    }`}>
                      <Sparkles className={`w-6 h-6 ${isDark ? "text-yellow-500" : "text-blue-600"}`} />
                    </div>
                    <div className={`rounded-2xl rounded-tl-none p-5 flex-1 border ${
                      isDark
                        ? "bg-yellow-900/20 border-yellow-800"
                        : "bg-blue-50 border-blue-100"
                    }`}>
                      <p className={`text-base flex items-center gap-2 ${isDark ? "text-yellow-400" : "text-blue-800"}`}>
                        <Sparkles className="w-4 h-4" /> AI Suggestion
                      </p>
                      <p className={`font-medium mt-2 text-base ${isDark ? "text-yellow-200" : "text-blue-900"}`}>
                        {aiSuggestion}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      onClick={() => navigate("/register/parent/step3")}
                      variant="outline"
                      className="flex-1 rounded-xl py-3.5 text-base"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" /> Back
                    </Button>

                    <Button
                      onClick={handleSubmit}
                      loading={isLoading}
                      className={`flex-1 rounded-xl py-3.5 text-base shadow-lg transition-all transform hover:scale-[1.02] ${
                        isDark
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-yellow-900/30"
                          : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-green-200"
                      }`}
                    >
                      {isLoading ? "Creating Account..." : "Create Account 🚀"}
                    </Button>
                  </div>
                </div>

                {/* Login Link */}
                <div className={`text-center pt-8 mt-6 border-t ${isDark ? "border-slate-700" : "border-slate-200"}`}>
                  <p className={`text-base ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                    Already have an account?{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className={`font-semibold transition-colors inline-flex items-center gap-1 ${
                        isDark ? "text-yellow-500 hover:text-yellow-400" : "text-blue-600 hover:text-blue-700"
                      }`}
                    >
                      Login
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}