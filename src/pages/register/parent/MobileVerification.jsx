// pages/register/parent/MobileVerification.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowRight, ArrowLeft, Sparkles, Sun, Moon } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Card from "../../../components/ui/Card";
import StepProgress from "../../../components/ui/StepProgress";
import { useTheme } from "../../../context/ThemeContext";

export default function MobileVerification() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    const savedData = localStorage.getItem("parentRegistration");
    if (!savedData) {
      navigate("/register/parent/step1");
    }
  }, [navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendOtp = async () => {
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpSent(true);
      setResendTimer(30);
      alert("OTP sent to your mobile number");
    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      alert("Please enter complete OTP");
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem("parentPhone", phone);
      navigate("/register/parent/step3");
    } catch (err) {
      alert("Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Fixed Background */}
      <div className={`fixed inset-0 z-0 ${isDark ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 via-white to-blue-50/30"}`} />
      
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full"
        >
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
                className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl mb-6 shadow-lg mx-auto ${
                  isDark
                    ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                    : "bg-gradient-to-br from-blue-500 to-purple-600"
                }`}
              >
                <Phone className="w-8 h-8 text-white" />
              </motion.div>
              
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>Verify Mobile Number</h2>
              <p className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-slate-500"}`}>Step 2 of 4: Mobile Verification</p>

              {/* Step Progress */}
              <StepProgress 
                currentStep={2} 
                totalSteps={4}
                labels={["Info", "Phone", "Location", "Child"]}
                isDark={isDark}
              />
            </div>

            {/* Form */}
            <div className="space-y-5">
              {!otpSent ? (
                <>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                      Mobile Number
                    </label>
                    <div className="relative group">
                      <Phone className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors w-5 h-5 ${
                        isDark ? "text-gray-500 group-focus-within:text-yellow-500" : "text-slate-400 group-focus-within:text-blue-500"
                      }`} />
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl transition-all ${
                          isDark
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                            : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        }`}
                        maxLength="10"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    className={`w-full py-3 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2 ${
                      isDark
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-yellow-500/25"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-blue-500/25"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        <span>Send OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className={`block text-sm font-medium mb-2 text-center ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                      Enter 6-digit OTP sent to <span className={`font-semibold ${isDark ? "text-yellow-500" : "text-blue-600"}`}>{phone}</span>
                    </label>
                    
                    {/* OTP Input Grid */}
                    <div className="flex justify-center gap-3 mb-6">
                      {otp.map((digit, index) => (
                        <motion.input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`w-14 h-14 text-center text-xl font-bold rounded-xl focus:outline-none focus:ring-2 transition-all ${
                            isDark
                              ? "bg-gray-700 border-2 border-gray-600 text-white focus:border-yellow-500 focus:ring-yellow-500/20"
                              : "bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                    className={`w-full py-3 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2 ${
                      isDark
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-yellow-500/25"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-blue-500/25"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <>
                        <span>Verify OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setOtpSent(false)}
                    disabled={resendTimer > 0}
                    className={`w-full py-2 text-sm font-semibold transition-colors ${
                      isDark
                        ? `text-yellow-500 hover:text-yellow-400 ${resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""}`
                        : `text-blue-600 hover:text-blue-700 ${resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""}`
                    }`}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Change Number"}
                  </button>
                </>
              )}

              {/* Back Button */}
              <button
                onClick={() => navigate("/register/parent/step1")}
                className={`w-full py-2 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 border ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}