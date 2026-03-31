// pages/Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Plus, ChevronRight, Sparkles, GraduationCap, 
  Heart, Star, Trophy, Flame, Users, BookOpen, 
  Briefcase, School, Calendar, MapPin, Award, Shield,
  Lock, Unlock, Edit2, Trash2, MoreVertical, AlertCircle
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// Mock data for profiles
const mockProfiles = {
  parent: {
    id: 1,
    type: "Parent",
    name: "Balaji",
    avatar: "",
    isOwner: true,
    email: "balaji@example.com",
    memberSince: "2024"
  },
  children: [
    { 
      id: 2, 
      type: "Child", 
      name: "Chaitu", 
      class: "Class 1", 
      subjects: ["Mathematics", "Science"],
      avatar: "",
      progress: 75,
      learningStyle: "Visual",
      goals: "Improve math skills"
    },
    { 
      id: 3, 
      type: "Child", 
      name: "Ravi", 
      class: "Class 3",
      subjects: ["Mathematics", "Science", "English"],
      avatar: "",
      progress: 60,
      learningStyle: "Kinesthetic",
      goals: "Build confidence in reading"
    }
  ],
  tutor: {
    id: 4,
    type: "Tutor",
    name: "Balaji Tutor",
    subjects: ["Mathematics"],
    experience: "5 years",
    rating: 4.8,
    hourlyRate: 45,
    avatar: ""
  }
};

export default function Profile() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [parentProfile, setParentProfile] = useState(null);
  const [childProfiles, setChildProfiles] = useState([]);
  const [tutorProfile, setTutorProfile] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);
  const [showAddChild, setShowAddChild] = useState(false);
  const [showAddTutor, setShowAddTutor] = useState(false);
  const [newChild, setNewChild] = useState({
    name: "",
    class: "",
    subjects: []
  });

  // Load profiles on mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setParentProfile(mockProfiles.parent);
      setChildProfiles(mockProfiles.children);
      setTutorProfile(mockProfiles.tutor);
      
      // Check if there's a stored active profile
      const storedProfile = localStorage.getItem("activeProfile");
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setActiveProfile(profile);
      }
      
      setLoading(false);
    }, 1000);
  }, []);

  // Handle profile selection
  const handleProfileSelect = (profile) => {
    setActiveProfile(profile);
    localStorage.setItem("activeProfile", JSON.stringify(profile));
    
    // Navigate to appropriate dashboard
    if (profile.type === "Parent") {
      navigate("/parent-dashboard");
    } else if (profile.type === "Child") {
      navigate("/child-dashboard");
    } else if (profile.type === "Tutor") {
      navigate("/tutor-dashboard");
    }
  };

  // Handle adding a new child
  const handleAddChild = () => {
    if (newChild.name && newChild.class) {
      const newProfile = {
        id: Date.now(),
        type: "Child",
        name: newChild.name,
        class: newChild.class,
        subjects: newChild.subjects,
        avatar: "",
        progress: 0,
        learningStyle: "Visual",
        goals: "Start learning"
      };
      
      setChildProfiles([...childProfiles, newProfile]);
      setShowAddChild(false);
      setNewChild({ name: "", class: "", subjects: [] });
      
      // Show success message
      alert(`${newChild.name} has been added successfully!`);
    }
  };

  // Handle adding a tutor profile
  const handleAddTutor = () => {
    navigate("/register/tutor/step1");
  };

  // Toggle subject selection for new child
  const toggleSubject = (subject) => {
    setNewChild({
      ...newChild,
      subjects: newChild.subjects.includes(subject)
        ? newChild.subjects.filter(s => s !== subject)
        : [...newChild.subjects, subject]
    });
  };

  // Available subjects list
  const subjectsList = ["Mathematics", "Science", "English", "Physics", "Chemistry", 
    "Biology", "History", "Geography", "Computer Science", "Programming"];

  // Classes list
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", 
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

  // Get avatar color based on name
  const getAvatarColor = (name) => {
    const colors = [
      "bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", 
      "bg-pink-500", "bg-indigo-500", "bg-yellow-500", "bg-orange-500"
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Get avatar initials
  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, type: "spring" }
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>Loading your profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${isDark ? "bg-green-500/10" : "bg-green-400/20"} animate-pulse`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${isDark ? "bg-blue-500/10" : "bg-blue-400/20"} animate-pulse animation-delay-2000`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${isDark ? "bg-purple-500/5" : "bg-purple-400/10"}`}></div>
      </div>

      <div className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-xl mx-auto ${
                isDark
                  ? "bg-gradient-to-br from-green-500 to-emerald-500"
                  : "bg-gradient-to-br from-green-500 to-emerald-500"
              }`}
            >
              <GraduationCap className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? "text-white" : "text-gray-800"}`}
            >
              Who's Learning Today?
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Select a profile to continue your learning journey
            </motion.p>

            {/* XP Counter - Fun Gamification Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 mt-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"
            >
              <Flame className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">2,450 XP</span>
              <Trophy className="w-3 h-3 text-white" />
              <span className="text-white font-bold text-sm">Level 12</span>
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
          </div>

          {/* Profiles Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
          >
            {/* Parent Profile Card */}
            {parentProfile && (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleProfileSelect(parentProfile)}
                className="cursor-pointer group"
              >
                <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  isDark
                    ? `bg-gray-800/90 border-blue-500/30 hover:border-blue-500`
                    : `bg-white border-blue-200 hover:border-blue-400`
                }`}>
                  <div className="p-6 text-center">
                    {/* Avatar */}
                    <div className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg transition-transform group-hover:scale-110 ${
                      getAvatarColor(parentProfile.name)
                    }`}>
                      {parentProfile.avatar ? (
                        <img src={parentProfile.avatar} alt={parentProfile.name} className="w-full h-full rounded-2xl object-cover" />
                      ) : (
                        <span className="text-white">{getInitials(parentProfile.name)}</span>
                      )}
                    </div>
                    
                    {/* Name */}
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>
                      {parentProfile.name}
                    </h3>
                    
                    {/* Role Badge */}
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      <Heart className="w-3 h-3" />
                      <span>Parent</span>
                    </div>
                    
                    {/* Additional Info */}
                    {parentProfile.memberSince && (
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Member since {parentProfile.memberSince}
                      </p>
                    )}
                    
                    {/* Owner Badge */}
                    {parentProfile.isOwner && (
                      <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <Shield className="w-3 h-3" />
                        <span>Account Owner</span>
                      </div>
                    )}
                    
                    {/* Continue Button */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className={`w-full py-2 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-1 ${
                        isDark
                          ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}>
                        <span>Continue</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Child Profiles */}
            {childProfiles.map((child, index) => (
              <motion.div
                key={child.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleProfileSelect(child)}
                className="cursor-pointer group"
              >
                <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  isDark
                    ? `bg-gray-800/90 border-purple-500/30 hover:border-purple-500`
                    : `bg-white border-purple-200 hover:border-purple-400`
                }`}>
                  <div className="p-6 text-center">
                    {/* Avatar */}
                    <div className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg transition-transform group-hover:scale-110 ${
                      getAvatarColor(child.name)
                    }`}>
                      {child.avatar ? (
                        <img src={child.avatar} alt={child.name} className="w-full h-full rounded-2xl object-cover" />
                      ) : (
                        <span className="text-white">{getInitials(child.name)}</span>
                      )}
                    </div>
                    
                    {/* Name */}
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>
                      {child.name}
                    </h3>
                    
                    {/* Role Badge */}
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-2 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                      <GraduationCap className="w-3 h-3" />
                      <span>Student</span>
                    </div>
                    
                    {/* Class Info */}
                    {child.class && (
                      <div className="flex items-center justify-center gap-1 text-xs mb-1">
                        <Calendar className="w-3 h-3" />
                        <span className={isDark ? "text-gray-400" : "text-gray-500"}>{child.class}</span>
                      </div>
                    )}
                    
                    {/* Subjects */}
                    {child.subjects && child.subjects.length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-center mt-2">
                        {child.subjects.slice(0, 2).map((subject, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                            {subject}
                          </span>
                        ))}
                        {child.subjects.length > 2 && (
                          <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                            +{child.subjects.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Progress Bar (Optional) */}
                    {child.progress !== undefined && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className={isDark ? "text-gray-400" : "text-gray-500"}>Progress</span>
                          <span className={isDark ? "text-white" : "text-gray-700"}>{child.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${child.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Continue Button */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className={`w-full py-2 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-1 ${
                        isDark
                          ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                          : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                      }`}>
                        <span>Continue</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add Child Card (Parent Only) */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setShowAddChild(true)}
              className="cursor-pointer group"
            >
              <div className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 h-full flex items-center justify-center min-h-[280px] ${
                isDark
                  ? "border-gray-700 bg-gray-800/50 hover:border-green-500"
                  : "border-gray-200 bg-gray-50 hover:border-green-400"
              }`}>
                <div className="text-center p-6">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 transition-all ${
                    isDark ? "bg-gray-700 group-hover:bg-green-500/20" : "bg-gray-100 group-hover:bg-green-100"
                  }`}>
                    <Plus className={`w-10 h-10 ${isDark ? "text-gray-400 group-hover:text-green-500" : "text-gray-500 group-hover:text-green-600"}`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>Add Child</h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Create a new student profile</p>
                </div>
              </div>
            </motion.div>

            {/* Tutor Profile Card (If exists) */}
            {tutorProfile && (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleProfileSelect(tutorProfile)}
                className="cursor-pointer group"
              >
                <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  isDark
                    ? `bg-gray-800/90 border-orange-500/30 hover:border-orange-500`
                    : `bg-white border-orange-200 hover:border-orange-400`
                }`}>
                  <div className="p-6 text-center">
                    {/* Avatar */}
                    <div className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg transition-transform group-hover:scale-110 ${
                      getAvatarColor(tutorProfile.name)
                    }`}>
                      {tutorProfile.avatar ? (
                        <img src={tutorProfile.avatar} alt={tutorProfile.name} className="w-full h-full rounded-2xl object-cover" />
                      ) : (
                        <span className="text-white">{getInitials(tutorProfile.name)}</span>
                      )}
                    </div>
                    
                    {/* Name */}
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>
                      {tutorProfile.name}
                    </h3>
                    
                    {/* Role Badge */}
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-2 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                      <Briefcase className="w-3 h-3" />
                      <span>Tutor</span>
                    </div>
                    
                    {/* Subjects */}
                    {tutorProfile.subjects && tutorProfile.subjects.length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-center mt-2">
                        {tutorProfile.subjects.slice(0, 2).map((subject, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                            {subject}
                          </span>
                        ))}
                        {tutorProfile.subjects.length > 2 && (
                          <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                            +{tutorProfile.subjects.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Experience & Rating */}
                    {tutorProfile.experience && (
                      <div className="flex items-center justify-center gap-2 mt-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          <span className={isDark ? "text-gray-400" : "text-gray-500"}>{tutorProfile.experience}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className={isDark ? "text-white" : "text-gray-700"}>{tutorProfile.rating}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Continue Button */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className={`w-full py-2 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-1 ${
                        isDark
                          ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                          : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                      }`}>
                        <span>Continue</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Become a Tutor Card (Optional) */}
            {!tutorProfile && (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={handleAddTutor}
                className="cursor-pointer group"
              >
                <div className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 h-full flex items-center justify-center min-h-[280px] ${
                  isDark
                    ? "border-gray-700 bg-gray-800/50 hover:border-purple-500"
                    : "border-gray-200 bg-gray-50 hover:border-purple-400"
                }`}>
                  <div className="text-center p-6">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 transition-all ${
                      isDark ? "bg-gray-700 group-hover:bg-purple-500/20" : "bg-gray-100 group-hover:bg-purple-100"
                    }`}>
                      <Briefcase className={`w-10 h-10 ${isDark ? "text-gray-400 group-hover:text-purple-500" : "text-gray-500 group-hover:text-purple-600"}`} />
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>Become a Tutor</h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Share your knowledge and earn</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs text-white">
                      <Sparkles className="w-3 h-3" />
                      <span>Earn Money</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Empty State for Children */}
          {childProfiles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-center py-12 mt-8 rounded-2xl border-2 border-dashed ${isDark ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                <Users className={`w-10 h-10 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                No children added yet
              </h3>
              <p className={`mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Add your first child to start their learning journey
              </p>
              <button
                onClick={() => setShowAddChild(true)}
                className={`px-6 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 mx-auto ${
                  isDark
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                }`}
              >
                <Plus className="w-4 h-4" />
                Add Your First Child
              </button>
            </motion.div>
          )}

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Secure profiles • Personalized learning • Progress tracking • 24/7 Support
            </p>
          </motion.div>
        </div>
      </div>

      {/* Add Child Modal */}
      <AnimatePresence>
        {showAddChild && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`rounded-3xl shadow-2xl max-w-md w-full border ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isDark ? "bg-green-500/20" : "bg-green-100"
                    }`}>
                      <GraduationCap className={`w-5 h-5 ${isDark ? "text-green-500" : "text-green-600"}`} />
                    </div>
                    <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>Add New Child</h2>
                  </div>
                  <button
                    onClick={() => setShowAddChild(false)}
                    className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Child Name */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Child's Name *
                    </label>
                    <input
                      type="text"
                      value={newChild.name}
                      onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring-green-500/20"
                          : "bg-gray-50 border-gray-200 text-gray-800 focus:border-green-500 focus:ring-green-500/20"
                      }`}
                      placeholder="Enter child's name"
                    />
                  </div>

                  {/* Class */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Class/Grade *
                    </label>
                    <select
                      value={newChild.class}
                      onChange={(e) => setNewChild({ ...newChild, class: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring-green-500/20"
                          : "bg-gray-50 border-gray-200 text-gray-800 focus:border-green-500 focus:ring-green-500/20"
                      }`}
                    >
                      <option value="">Select class</option>
                      {classes.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>

                  {/* Subjects */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Subjects of Interest
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border rounded-xl">
                      {subjectsList.map(subject => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => toggleSubject(subject)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                            newChild.subjects.includes(subject)
                              ? isDark
                                ? "bg-green-500 text-white"
                                : "bg-green-500 text-white"
                              : isDark
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setShowAddChild(false)}
                      className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-colors ${
                        isDark
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddChild}
                      className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 ${
                        isDark
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg"
                          : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Add Child</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// CheckCircle component for the add child modal
const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);