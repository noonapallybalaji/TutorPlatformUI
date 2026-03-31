// pages/register/tutor/Step1BasicInfo.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles,
  GraduationCap, TrendingUp, Award, CheckCircle2
} from "lucide-react";

export default function TutorBasicInfo() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleContinue = () => {
    if (form.fullName && form.email && form.password) {
      localStorage.setItem("tutorRegistration", JSON.stringify(form));
      navigate("/register/tutor/step2");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 pt-20">
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
      </div>

      <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full">
          {/* Left Side */}
          <div className="hidden lg:flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-sm">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  TutorAI
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-slate-800 leading-tight">
                Ready to Teach?
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Share Your Knowledge
                </span>
              </h1>
              
              <p className="text-slate-600 text-lg">
                Connect with students and grow your teaching career with AI-powered tools
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Trusted by Tutors</p>
                  <p className="text-sm text-slate-500">Join 2,000+ expert tutors</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800">$50/hr</p>
                  <p className="text-xs text-slate-500">Avg. Earnings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800">2k+</p>
                  <p className="text-xs text-slate-500">Active Tutors</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800">4.9</p>
                  <p className="text-xs text-slate-500">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200 p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-sm">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Tutor Account</h2>
                  <p className="text-slate-500">Step 1 of 4: Basic Information</p>
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center">1</div>
                      <div className="w-16 h-0.5 bg-slate-200"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">2</div>
                      <div className="w-16 h-0.5 bg-slate-200"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">3</div>
                      <div className="w-16 h-0.5 bg-slate-200"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">4</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors w-5 h-5" />
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors w-5 h-5" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="tutor@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="••••••••"
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
                    onClick={handleContinue}
                    disabled={!form.fullName || !form.email || !form.password}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <p className="text-center text-slate-600 mt-6">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-purple-600 hover:text-purple-700 font-semibold"
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
  );
}