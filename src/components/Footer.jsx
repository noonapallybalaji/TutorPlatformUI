// components/Footer.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  GraduationCap, Heart, Facebook, Twitter, Instagram, Github, 
  Sparkles, Globe, Shield, Zap, Award, ChevronRight, Star, Flame, Users, Mail as MailIcon 
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Learn": [
      { name: "Find Tutors", path: "/find-tutors", icon: "🔍" },
      { name: "Subjects", path: "/subjects", icon: "📚" },
      { name: "How It Works", path: "/how-it-works", icon: "✨" },
      { name: "Success Stories", path: "/stories", icon: "🏆" }
    ],
    "Support": [
      { name: "Help Center", path: "/help", icon: "💬" },
      { name: "Contact Us", path: "/contact", icon: "📧" },
      { name: "FAQs", path: "/faqs", icon: "❓" },
      { name: "Safety Tips", path: "/safety", icon: "🛡️" }
    ],
    "Company": [
      { name: "About Us", path: "/about", icon: "🌟" },
      { name: "Become a Tutor", path: "/become-tutor", icon: "👨‍🏫" },
      { name: "Careers", path: "/careers", icon: "💼", badge: "Hiring" },
      { name: "Blog", path: "/blog", icon: "📝" }
    ],
    "Legal": [
      { name: "Privacy Policy", path: "/privacy", icon: "🔒" },
      { name: "Terms of Service", path: "/terms", icon: "📜" },
      { name: "Cookie Policy", path: "/cookies", icon: "🍪" },
      { name: "Refund Policy", path: "/refund", icon: "💵" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, name: "Facebook", bg: "bg-blue-600" },
    { icon: Twitter, name: "Twitter", bg: "bg-sky-500" },
    { icon: Instagram, name: "Instagram", bg: "bg-pink-600" },
    { icon: Github, name: "GitHub", bg: "bg-gray-800" }
  ];

  const achievements = [
    { icon: Award, label: "Top EdTech Platform", value: "2024", color: "yellow" },
    { icon: Users, label: "Active Learners", value: "10k+", color: "green" },
    { icon: Star, label: "5-Star Rating", value: "4.9/5", color: "purple" },
    { icon: Flame, label: "Daily Active", value: "2,500+", color: "orange" }
  ];

  return (
    <footer className={`border-t-2 ${isDark ? "bg-gray-900 border-gray-800" : "bg-gradient-to-b from-green-50 to-white border-green-200"}`}>
      {/* Newsletter Section */}
      <div className={`relative overflow-hidden border-b-2 ${isDark ? "border-gray-800" : "border-green-200"}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Sparkles className={`w-6 h-6 ${isDark ? "text-yellow-500" : "text-green-500"}`} />
                <h3 className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-800"}`}>Stay in the Loop!</h3>
              </div>
              <p className={isDark ? "text-gray-400" : "text-slate-600"}>Get weekly learning tips and tutor updates</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 sm:w-80 px-4 py-3 rounded-full focus:outline-none focus:ring-2 transition-all ${
                  isDark
                    ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-yellow-500/20"
                    : "bg-white border-2 border-green-200 text-slate-800 focus:border-green-500 focus:ring-green-200"
                }`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all ${
                  isDark
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                    : "bg-gradient-to-r from-green-500 to-emerald-500"
                }`}
              >
                Subscribe 🚀
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo Section */}
          <div className="col-span-2 md:col-span-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 cursor-pointer mb-4"
              onClick={() => navigate("/")}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                isDark
                  ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                  : "bg-gradient-to-br from-green-500 to-emerald-500"
              }`}>
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className={`text-2xl font-black bg-clip-text text-transparent ${
                isDark
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                  : "bg-gradient-to-r from-green-600 to-emerald-600"
              }`}>
                TutorAI
              </span>
            </motion.div>
            <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
              Making learning fun and accessible for everyone, everywhere.
            </p>
            <div className="flex gap-2 mb-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className={`w-9 h-9 ${social.bg} text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className={`w-4 h-4 ${isDark ? "text-yellow-500" : "text-green-500"}`} />
              <span className={isDark ? "text-gray-400" : "text-slate-500"}>100% Secure & Trusted</span>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className={`font-black mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                <Sparkles className={`w-4 h-4 ${isDark ? "text-yellow-500" : "text-green-500"}`} />
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <button
                      onClick={() => navigate(link.path)}
                      className={`transition-colors flex items-center gap-2 text-sm ${
                        isDark
                          ? "text-gray-400 hover:text-yellow-400"
                          : "text-slate-500 hover:text-green-600"
                      }`}
                    >
                      <span className="text-base">{link.icon}</span>
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Achievements Row */}
        <div className={`flex flex-wrap justify-center gap-4 py-8 border-t-2 ${isDark ? "border-gray-800" : "border-green-100"}`}>
          {achievements.map((achievement, idx) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3, scale: 1.05 }}
                className={`flex items-center gap-3 px-4 py-2 rounded-full shadow-sm border ${
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-green-100"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDark
                    ? `bg-${achievement.color}-500/20`
                    : `bg-${achievement.color}-100`
                }`}>
                  <Icon className={`w-4 h-4 ${
                    isDark
                      ? `text-${achievement.color}-400`
                      : `text-${achievement.color}-600`
                  }`} />
                </div>
                <div>
                  <p className={`font-black text-sm ${isDark ? "text-white" : "text-slate-800"}`}>{achievement.value}</p>
                  <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>{achievement.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Bar */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t-2 ${isDark ? "border-gray-800" : "border-green-100"}`}>
          <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>Made with love for learning</span>
          </div>
          
          <div className="flex gap-6 text-sm">
            <button className={`transition-colors ${isDark ? "text-gray-400 hover:text-yellow-400" : "text-slate-500 hover:text-green-600"}`}>Privacy</button>
            <button className={`transition-colors ${isDark ? "text-gray-400 hover:text-yellow-400" : "text-slate-500 hover:text-green-600"}`}>Terms</button>
            <button className={`transition-colors ${isDark ? "text-gray-400 hover:text-yellow-400" : "text-slate-500 hover:text-green-600"}`}>Sitemap</button>
          </div>
          
          <div className={`flex items-center gap-1 text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>
            <Globe className="w-4 h-4" />
            <span>© {currentYear} TutorAI. All rights reserved.</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className={`text-xs ${isDark ? "text-gray-500" : "text-slate-400"}`}>
            🎉 Join 10,000+ learners today • ⭐ 4.9/5 rating • 🚀 Start your learning adventure!
          </p>
        </div>
      </div>
    </footer>
  );
}