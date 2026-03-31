// pages/register/parent/BasicInfo.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles,
  GraduationCap, TrendingUp, Award, CheckCircle2, Calendar, Star,
  Shield, Zap, Heart, Sun, Moon, AlertCircle, Loader2
} from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Card from "../../../components/ui/Card";
import StepProgress from "../../../components/ui/StepProgress";
import { useTheme } from "../../../context/ThemeContext";
import api from "../../../api/axio";

export default function BasicInfo() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    score: 0
  });

  // Password strength validation
  const validatePasswordStrength = (password) => {
    const strength = {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      score: 0
    };
    
    // Calculate score
    let score = 0;
    if (strength.hasMinLength) score++;
    if (strength.hasUpperCase) score++;
    if (strength.hasLowerCase) score++;
    if (strength.hasNumber) score++;
    if (strength.hasSpecialChar) score++;
    strength.score = score;
    
    return strength;
  };

  // Check if email already exists
  const checkEmailExists = async (email) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    
    setIsCheckingEmail(true);
    try {
      const response = await api.get(`/auth/check-email?email=${encodeURIComponent(email)}`);
      if (response.data.exists) {
        setErrors(prev => ({ ...prev, email: "Email already registered. Please login or use another email." }));
        return true;
      } else {
        setErrors(prev => ({ ...prev, email: "" }));
        return false;
      }
    } catch (error) {
      console.error("Email check error:", error);
      // Don't block registration if API fails, but show warning
      setErrors(prev => ({ ...prev, email: "" }));
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // Debounced email check
  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.email && /\S+@\S+\.\S+/.test(form.email) && !errors.email) {
        checkEmailExists(form.email);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [form.email]);

  // Update password strength when password changes
  useEffect(() => {
    const strength = validatePasswordStrength(form.password);
    setPasswordStrength(strength);
    
    // Update password error based on strength
    if (form.password && strength.score < 3) {
      setErrors(prev => ({ 
        ...prev, 
        password: "Password must contain at least 8 characters, including uppercase, lowercase, and number" 
      }));
    } else if (form.password && strength.score >= 3) {
      setErrors(prev => ({ ...prev, password: "" }));
    }
  }, [form.password]);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }
    
    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (passwordStrength.score < 3) {
      newErrors.password = "Password must contain at least 8 characters, including uppercase, lowercase, and number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (validateForm()) {
      // Double-check email doesn't exist before proceeding
      const emailExists = await checkEmailExists(form.email);
      if (!emailExists) {
        localStorage.setItem("parentRegistration", JSON.stringify(form));
        navigate("/register/parent/step2");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && form.fullName && form.email && form.password && passwordStrength.score >= 3) {
      handleContinue();
    }
  };

  // Get password strength color and text
  const getPasswordStrengthInfo = () => {
    const { score } = passwordStrength;
    if (score === 0) return { color: "gray", text: "No password", width: "0%" };
    if (score <= 2) return { color: "red", text: "Weak", width: "33%" };
    if (score === 3) return { color: "yellow", text: "Medium", width: "66%" };
    if (score >= 4) return { color: "green", text: "Strong", width: "100%" };
    return { color: "gray", text: "", width: "0%" };
  };

  const strengthInfo = getPasswordStrengthInfo();

  const features = [
    { icon: TrendingUp, text: "95% Success Rate", color: "blue" },
    { icon: Award, text: "10k+ Active Users", color: "purple" },
    { icon: Shield, text: "Verified Tutors", color: "green" },
    { icon: Zap, text: "24/7 Support", color: "orange" }
  ];

  return (
    <>
      {/* Fixed Background */}
      <div className={`fixed inset-0 z-0 ${isDark ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 via-white to-blue-50/30"}`} />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${isDark ? "bg-yellow-500/10" : "bg-blue-400/20"}`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse animation-delay-2000 ${isDark ? "bg-orange-500/10" : "bg-purple-400/20"}`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${isDark ? "bg-yellow-500/5" : "bg-indigo-400/10"}`}></div>
      </div>

      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <div className={`absolute inset-0 ${isDark ? "bg-grid-gray-800" : "bg-grid-slate-100"} [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]`}></div>
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

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl w-full">
          
          {/* Left Side - Hero Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex flex-col justify-center space-y-8 px-4"
          >
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                isDark
                  ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                  : "bg-gradient-to-br from-blue-600 to-purple-600"
              }`}>
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className={`text-2xl font-bold bg-clip-text text-transparent ${
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
              className="space-y-4"
            >
              <h1 className={`text-4xl lg:text-5xl font-bold leading-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                Ready to Guide?
                <br />
                <span className={`bg-clip-text text-transparent ${
                  isDark
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                    : "bg-gradient-to-r from-blue-600 to-purple-600"
                }`}>
                  Empower Your Child
                </span>
              </h1>
              <p className={`text-lg ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                Monitor and support your child's learning journey with AI-powered insights
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className={`rounded-2xl p-4 border shadow-sm ${
                isDark
                  ? "bg-gray-800/80 backdrop-blur-sm border-gray-700"
                  : "bg-white/80 backdrop-blur-sm border-slate-200"
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDark ? "bg-yellow-500/20" : "bg-blue-100"
                  }`}>
                    <CheckCircle2 className={`w-6 h-6 ${isDark ? "text-yellow-500" : "text-blue-600"}`} />
                  </div>
                  <div>
                    <p className={`font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>Trusted by Parents</p>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>Join 5,000+ happy parents</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {features.slice(0, 3).map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className={`rounded-xl p-3 text-center border shadow-sm ${
                      isDark
                        ? "bg-gray-800/80 backdrop-blur-sm border-gray-700"
                        : "bg-white/80 backdrop-blur-sm border-slate-200"
                    }`}>
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg mb-2 ${
                        isDark ? "bg-yellow-500/20" : `bg-${feature.color}-100`
                      }`}>
                        <Icon className={`w-4 h-4 ${isDark ? "text-yellow-500" : `text-${feature.color}-600`}`} />
                      </div>
                      <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>{feature.text.split(' ')[0]}</p>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>{feature.text.split(' ').slice(1).join(' ')}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Benefits List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              {[
                { text: "Real-time progress monitoring", icon: TrendingUp },
                { text: "Personalized learning paths", icon: Sparkles },
                { text: "Expert tutor matching", icon: Star },
                { text: "Detailed performance analytics", icon: Calendar }
              ].map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 p-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDark ? "bg-yellow-500/20" : "bg-green-100"
                    }`}>
                      <CheckCircle2 className={`w-3 h-3 ${isDark ? "text-yellow-500" : "text-green-600"}`} />
                    </div>
                    <span className={`text-sm ${isDark ? "text-gray-300" : "text-slate-600"}`}>{benefit.text}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <div className="w-full max-w-md">
              <div className={`backdrop-blur-xl rounded-3xl shadow-2xl border p-6 md:p-8 ${
                isDark
                  ? "bg-gray-800/95 border-gray-700"
                  : "bg-white/95 border-slate-200/80"
              }`}>
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 shadow-lg mx-auto ${
                      isDark
                        ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                        : "bg-gradient-to-br from-blue-500 to-purple-600"
                    }`}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>Create Parent Account</h2>
                  <p className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-slate-500"}`}>Step 1 of 4: Basic Information</p>

                  {/* Step Progress */}
                  <StepProgress 
                    currentStep={1} 
                    totalSteps={4}
                    labels={["Info", "Phone", "Location", "Child"]}
                    isDark={isDark}
                  />
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                  {/* Full Name Field */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors w-5 h-5 ${
                        isDark ? "text-gray-500 group-focus-within:text-yellow-500" : "text-slate-400 group-focus-within:text-blue-500"
                      }`} />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={form.fullName}
                        onChange={(e) => {
                          setForm({ ...form, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: "" });
                        }}
                        onKeyPress={handleKeyPress}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl transition-all ${
                          isDark
                            ? `bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 ${errors.fullName ? "border-red-500 focus:border-red-500" : "border-gray-600"}`
                            : `bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${errors.fullName ? "border-red-500 focus:border-red-500" : "border-slate-200"}`
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Field with Live Check */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors w-5 h-5 ${
                        isDark ? "text-gray-500 group-focus-within:text-yellow-500" : "text-slate-400 group-focus-within:text-blue-500"
                      }`} />
                      <input
                        type="email"
                        placeholder="parent@example.com"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        onKeyPress={handleKeyPress}
                        className={`w-full pl-12 pr-12 py-3 border rounded-xl transition-all ${
                          isDark
                            ? `bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-600"}`
                            : `bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${errors.email ? "border-red-500 focus:border-red-500" : "border-slate-200"}`
                        }`}
                      />
                      {isCheckingEmail && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                        </div>
                      )}
                      {!isCheckingEmail && form.email && !errors.email && /\S+@\S+\.\S+/.test(form.email) && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                    {!errors.email && form.email && /\S+@\S+\.\S+/.test(form.email) && !isCheckingEmail && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Email is available
                      </p>
                    )}
                  </div>

                  {/* Password Field with Strength Indicator */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors w-5 h-5 ${
                        isDark ? "text-gray-500 group-focus-within:text-yellow-500" : "text-slate-400 group-focus-within:text-blue-500"
                      }`} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={form.password}
                        onChange={(e) => {
                          setForm({ ...form, password: e.target.value });
                          if (errors.password) setErrors({ ...errors, password: "" });
                        }}
                        onKeyPress={handleKeyPress}
                        className={`w-full pl-12 pr-12 py-3 border rounded-xl transition-all ${
                          isDark
                            ? `bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 ${errors.password ? "border-red-500 focus:border-red-500" : "border-gray-600"}`
                            : `bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${errors.password ? "border-red-500 focus:border-red-500" : "border-slate-200"}`
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
                    
                    {/* Password Strength Bar */}
                    {form.password && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: strengthInfo.width }}
                              transition={{ duration: 0.3 }}
                              className={`h-full rounded-full ${
                                strengthInfo.color === "red" ? "bg-red-500" :
                                strengthInfo.color === "yellow" ? "bg-yellow-500" :
                                strengthInfo.color === "green" ? "bg-green-500" : "bg-gray-400"
                              }`}
                            />
                          </div>
                          <span className={`text-xs font-medium ${
                            strengthInfo.color === "red" ? "text-red-500" :
                            strengthInfo.color === "yellow" ? "text-yellow-500" :
                            strengthInfo.color === "green" ? "text-green-500" : "text-gray-500"
                          }`}>
                            {strengthInfo.text}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Password Requirements Checklist */}
                  <div className={`p-3 rounded-xl border ${isDark ? "bg-gray-700/50 border-gray-600" : "bg-slate-50 border-slate-200"}`}>
                    <p className={`text-xs mb-2 ${isDark ? "text-gray-400" : "text-slate-500"}`}>Password requirements:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`flex items-center gap-1.5 text-xs ${passwordStrength.hasMinLength ? "text-green-600" : isDark ? "text-gray-500" : "text-slate-400"}`}>
                        {passwordStrength.hasMinLength ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        <span>Min 8 characters</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-xs ${passwordStrength.hasUpperCase ? "text-green-600" : isDark ? "text-gray-500" : "text-slate-400"}`}>
                        {passwordStrength.hasUpperCase ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        <span>Uppercase letter</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-xs ${passwordStrength.hasLowerCase ? "text-green-600" : isDark ? "text-gray-500" : "text-slate-400"}`}>
                        {passwordStrength.hasLowerCase ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        <span>Lowercase letter</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-xs ${passwordStrength.hasNumber ? "text-green-600" : isDark ? "text-gray-500" : "text-slate-400"}`}>
                        {passwordStrength.hasNumber ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        <span>Number</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-xs ${passwordStrength.hasSpecialChar ? "text-green-600" : isDark ? "text-gray-500" : "text-slate-400"}`}>
                        {passwordStrength.hasSpecialChar ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        <span>Special character</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleContinue}
                    disabled={!form.fullName || !form.email || !form.password || passwordStrength.score < 3 || !!errors.email || isCheckingEmail}
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    className="w-full"
                  >
                    Continue
                  </Button>
                </div>

                {/* Login Link */}
                <div className={`text-center pt-6 mt-2 border-t ${isDark ? "border-gray-700" : "border-slate-200"}`}>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                    Already have an account?{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className={`font-semibold transition-colors inline-flex items-center gap-1 ${
                        isDark ? "text-yellow-500 hover:text-yellow-400" : "text-blue-600 hover:text-blue-700"
                      }`}
                    >
                      Login
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </p>
                </div>

                {/* Security Note */}
                <div className={`mt-4 p-3 rounded-xl border ${
                  isDark
                    ? "bg-yellow-500/10 border-yellow-500/20"
                    : "bg-blue-50 border-blue-100"
                }`}>
                  <p className={`text-xs text-center flex items-center justify-center gap-2 ${
                    isDark ? "text-yellow-400" : "text-blue-700"
                  }`}>
                    <Shield className="w-3 h-3" />
                    Your data is encrypted and secure
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