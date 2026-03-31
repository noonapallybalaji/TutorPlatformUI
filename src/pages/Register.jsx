// Register.jsx
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axio";

import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Sparkles,
  GraduationCap,
  Github,
  Chrome,
  CheckCircle2,
  Users,
  BookOpen,
  Heart,
  TrendingUp,
  Award
} from "lucide-react";

export default function Register() {
  const [params] = useSearchParams();
  const role = params.get("role") || "parent";
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const getRoleConfig = () => {
    switch(role) {
      case 'student':
        return {
          title: "Ready to Learn?",
          subtitle: "Start Your Journey",
          description: "Access personalized AI tutoring and track your progress",
          icon: BookOpen,
          color: "indigo",
          benefits: [
            "AI-powered personalized learning",
            "Real-time progress tracking",
            "Smart tutor matching system",
            "Interactive learning materials"
          ]
        };
      case 'tutor':
        return {
          title: "Ready to Teach?",
          subtitle: "Share Your Knowledge",
          description: "Connect with students and grow your teaching career",
          icon: Users,
          color: "purple",
          benefits: [
            "Flexible working hours",
            "Competitive earnings",
            "Professional development",
            "Global student community"
          ]
        };
      default:
        return {
          title: "Ready to Guide?",
          subtitle: "Empower Your Child",
          description: "Monitor and support your child's learning journey",
          icon: Heart,
          color: "blue",
          benefits: [
            "Real-time progress monitoring",
            "Detailed performance analytics",
            "Expert tutor recommendations",
            "Learning resources access"
          ]
        };
    }
  };

  const roleConfig = getRoleConfig();
  const Icon = roleConfig.icon;

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.post("/auth/register", {
        ...form,
        role,
      });
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pt-20">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
      </div>

      <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full">
          
          {/* Left Side - Illustration & Content */}
          <div className="hidden lg:flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-sm">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  TutorAI
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-slate-800 leading-tight">
                {roleConfig.title}
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {roleConfig.subtitle}
                </span>
              </h1>
              
              <p className="text-slate-600 text-lg">
                {roleConfig.description}
              </p>
            </div>

            {/* Benefits Cards */}
            <div className="space-y-3">
              {roleConfig.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Stats Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-indigo-50 rounded-xl mb-2">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-800">95%</p>
                  <p className="text-xs text-slate-500">Success Rate</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-50 rounded-xl mb-2">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-800">10k+</p>
                  <p className="text-xs text-slate-500">Active Users</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-${roleConfig.color}-500 to-${roleConfig.color === 'indigo' ? 'purple' : roleConfig.color === 'purple' ? 'pink' : 'indigo'}-500 rounded-2xl mb-4 shadow-sm`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-500">
                    Join as a {role.charAt(0).toUpperCase() + role.slice(1)}
                  </p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                  >
                    <span>{isLoading ? "Creating Account..." : `Sign up as ${role}`}</span>
                    {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-slate-500">Or sign up with</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center space-x-2 py-2 px-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors group">
                      <Chrome className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
                      <span className="text-sm text-slate-700">Google</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 py-2 px-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors group">
                      <Github className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
                      <span className="text-sm text-slate-700">GitHub</span>
                    </button>
                  </div>

                  {/* Login Link */}
                  <p className="text-center text-slate-600 mt-6">
                    Already have an account?{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}