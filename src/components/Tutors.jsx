// components/Tutors.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Star, MapPin, Video, Calendar, ChevronRight, Sparkles, Award, Clock, 
  BookOpen, User, Filter, ChevronLeft, Users, Trophy, Zap, Heart, MessageCircle,
  TrendingUp, Shield
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import api from "../api/axio";

export default function Tutors() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    setLoading(true);
    setError(null);
    try {
      const searchResults = location.state?.results;
      if (searchResults && Array.isArray(searchResults)) {
        setTutors(searchResults);
      } else {
        const response = await api.get("/tutors/recommended");
        const tutorData = Array.isArray(response.data) ? response.data : [];
        setTutors(tutorData.length ? tutorData : [
          {
            id: 1, name: "Dr. Sarah Johnson", subject: "Mathematics", experience: "8 years",
            rating: 4.9, reviews: 128, hourlyRate: 45, location: "Downtown", distance: "2.5 km",
            avatar: "https://ui-avatars.com/api/?background=10B981&color=fff&name=Sarah+Johnson",
            badges: ["Best Match", "Top Rated"], verified: true, availableToday: true
          },
          {
            id: 2, name: "Prof. Michael Chen", subject: "Physics", experience: "12 years",
            rating: 5.0, reviews: 256, hourlyRate: 55, location: "Westside", distance: "3.8 km",
            avatar: "https://ui-avatars.com/api/?background=8B5CF6&color=fff&name=Michael+Chen",
            badges: ["Nearby", "Fast Response"], verified: true, availableToday: false
          },
          {
            id: 3, name: "Emily Rodriguez", subject: "English", experience: "5 years",
            rating: 4.8, reviews: 94, hourlyRate: 40, location: "Eastside", distance: "1.2 km",
            avatar: "https://ui-avatars.com/api/?background=EC489A&color=fff&name=Emily+Rodriguez",
            badges: ["Top Rated"], verified: true, availableToday: true
          }
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch tutors:", error);
      setError("Unable to load tutors");
    } finally {
      setLoading(false);
    }
  };

  const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "English", "Programming", "History", "Geography"];

  const filteredTutors = Array.isArray(tutors) && selectedSubject === "all" 
    ? tutors 
    : Array.isArray(tutors) ? tutors.filter(t => t?.subject === selectedSubject) : [];

  const toggleFavorite = (tutorId) => {
    setFavorites(prev => 
      prev.includes(tutorId) ? prev.filter(id => id !== tutorId) : [...prev, tutorId]
    );
  };

  const nextSlide = () => {
    if (filteredTutors.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredTutors.length);
  };

  const prevSlide = () => {
    if (filteredTutors.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredTutors.length) % filteredTutors.length);
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

  const handleBookTrial = async (tutorId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to book a trial session");
      navigate("/login");
      return;
    }
    try {
      await api.post("/bookings/trial", { tutorId });
      alert("Trial session booked successfully!");
    } catch (error) {
      alert("Failed to book trial session");
    }
  };

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 10 : -10
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.4, type: "spring", stiffness: 300 }
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? -10 : 10,
      transition: { duration: 0.3 }
    })
  };

  if (loading) {
    return (
      <div className={`py-16 ${isDark ? "bg-gray-900" : "bg-gradient-to-b from-white to-green-50"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`rounded-2xl shadow-lg animate-pulse overflow-hidden ${isDark ? "bg-gray-800" : "bg-white"}`}>
                <div className={`h-32 ${isDark ? "bg-gray-700" : "bg-gradient-to-r from-green-200 to-emerald-200"}`}></div>
                <div className="p-6">
                  <div className={`w-20 h-20 rounded-full mx-auto mb-4 ${isDark ? "bg-gray-700" : "bg-green-100"}`}></div>
                  <div className={`h-5 rounded w-3/4 mx-auto mb-2 ${isDark ? "bg-gray-700" : "bg-green-100"}`}></div>
                  <div className={`h-4 rounded w-1/2 mx-auto ${isDark ? "bg-gray-700/50" : "bg-green-50"}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-16 ${isDark ? "bg-gray-900" : "bg-gradient-to-b from-white to-green-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className={`w-6 h-6 ${isDark ? "text-yellow-500" : "text-green-500"}`} />
              <h2 className={`text-3xl font-black ${isDark ? "text-white" : "text-slate-800"}`}>
                Recommended{" "}
                <span className={`bg-clip-text text-transparent ${
                  isDark
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                    : "bg-gradient-to-r from-green-600 to-emerald-600"
                }`}>
                  Tutors
                </span>
              </h2>
            </div>
            <p className={isDark ? "text-gray-400" : "text-slate-500"}>Find the perfect match for your learning journey</p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2 max-w-full">
            {subjects.map(subject => (
              <motion.button
                key={subject}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSubject(subject.toLowerCase());
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  selectedSubject === subject.toLowerCase()
                    ? isDark
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                    : isDark
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                    : "bg-white text-slate-600 hover:bg-green-50 border-2 border-green-100"
                }`}
              >
                {subject}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tutors Display */}
        {filteredTutors.length === 0 ? (
          <div className={`text-center py-12 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${isDark ? "bg-gray-800" : "bg-green-100"}`}>
              <User className={`w-10 h-10 ${isDark ? "text-yellow-500" : "text-green-500"}`} />
            </div>
            <h3 className={`text-xl font-black mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>No tutors found</h3>
            <p>Try selecting a different subject</p>
          </div>
        ) : (
          <>
            {/* Desktop Grid View */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor, index) => (
                <motion.div
                  key={tutor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`group rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border-2 ${
                    isDark
                      ? "bg-gray-800 hover:shadow-yellow-500/10 border-gray-700"
                      : "bg-white hover:shadow-2xl border-green-100"
                  }`}
                >
                  {/* Header */}
                  <div className={`relative p-6 ${isDark ? "bg-gradient-to-br from-gray-700 to-gray-800" : "bg-gradient-to-br from-green-500 to-emerald-500"}`}>
                    <div className="absolute top-4 right-4 flex gap-1">
                      {tutor.badges?.map((badge, idx) => (
                        <span key={idx} className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          badge === "Best Match" ? "bg-yellow-500 text-white" :
                          badge === "Top Rated" ? "bg-purple-500 text-white" : "bg-blue-500 text-white"
                        }`}>
                          {badge}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <img
                        src={tutor.avatar}
                        alt={tutor.name}
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                      />
                    </div>
                    <button
                      onClick={() => toggleFavorite(tutor.id)}
                      className="absolute bottom-4 left-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(tutor.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="text-center mb-4">
                      <h3 className={`text-xl font-black mb-1 ${isDark ? "text-white" : "text-slate-800"}`}>{tutor.name}</h3>
                      <p className={`text-sm font-bold ${isDark ? "text-yellow-500" : "text-green-600"}`}>{tutor.subject} Expert</p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className={`font-bold ${isDark ? "text-white" : "text-slate-800"}`}>{tutor.rating}</span>
                          <span className={isDark ? "text-gray-400" : "text-slate-400"}>({tutor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-slate-400"}`} />
                          <span className={isDark ? "text-gray-300" : "text-slate-600"}>{tutor.experience}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-slate-400"}`} />
                          <span className={isDark ? "text-gray-300" : "text-slate-600"}>{tutor.location}</span>
                          <span className={isDark ? "text-gray-500" : "text-slate-400"}>({tutor.distance})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {tutor.verified && <Shield className="w-4 h-4 text-green-500" />}
                          {tutor.availableToday && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? "bg-yellow-500/20 text-yellow-400" : "bg-green-50 text-green-600"}`}>
                              Today
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`flex items-center justify-between mb-4 pt-3 border-t ${isDark ? "border-gray-700" : "border-green-100"}`}>
                      <div>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>Hourly Rate</p>
                        <p className={`text-2xl font-black ${isDark ? "text-yellow-500" : "text-green-600"}`}>${tutor.hourlyRate}<span className="text-sm">/hr</span></p>
                      </div>
                      <button
                        onClick={() => handleBookTrial(tutor.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-md transition-all ${
                          isDark
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-yellow-500/25"
                            : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-green-500/25"
                        }`}
                      >
                        <Video className="w-4 h-4" />
                        <span>Free Trial</span>
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button className={`flex-1 px-3 py-2 rounded-full text-sm font-bold transition-colors border ${
                        isDark
                          ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                          : "border-green-200 text-green-600 hover:bg-green-50"
                      }`}>
                        View Profile
                      </button>
                      <button className={`flex-1 px-3 py-2 rounded-full text-sm font-bold transition-colors flex items-center justify-center gap-1 border ${
                        isDark
                          ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                          : "border-green-200 text-green-600 hover:bg-green-50"
                      }`}>
                        <MessageCircle className="w-4 h-4" />
                        <span>Message</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Swipeable Carousel */}
            <div className="md:hidden relative">
              <div
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
                    className={`rounded-2xl shadow-xl border-2 overflow-hidden ${
                      isDark
                        ? "bg-gray-800 border-yellow-500/30"
                        : "bg-white border-green-100"
                    }`}
                  >
                    {(() => {
                      const tutor = filteredTutors[currentIndex];
                      return (
                        <>
                          <div className={`relative p-6 ${isDark ? "bg-gradient-to-br from-gray-700 to-gray-800" : "bg-gradient-to-br from-green-500 to-emerald-500"}`}>
                            <div className="absolute top-4 right-4 flex gap-1">
                              {tutor.badges?.map((badge, idx) => (
                                <span key={idx} className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                  badge === "Best Match" ? "bg-yellow-500" :
                                  badge === "Top Rated" ? "bg-purple-500" :
                                  "bg-blue-500"
                                } text-white`}>
                                  {badge}
                                </span>
                              ))}
                            </div>
                            <div className="flex justify-center">
                              <img
                                src={tutor.avatar}
                                alt={tutor.name}
                                className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
                              />
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="text-center mb-4">
                              <h3 className={`text-xl font-black mb-1 ${isDark ? "text-white" : "text-slate-800"}`}>{tutor.name}</h3>
                              <p className={`text-sm font-bold ${isDark ? "text-yellow-500" : "text-green-600"}`}>{tutor.subject} Expert</p>
                            </div>
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className={`font-bold ${isDark ? "text-white" : "text-slate-800"}`}>{tutor.rating}</span>
                                  <span className={isDark ? "text-gray-400" : "text-slate-400"}>({tutor.reviews})</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-slate-400"}`} />
                                  <span className={isDark ? "text-gray-300" : "text-slate-600"}>{tutor.experience}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <MapPin className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-slate-400"}`} />
                                  <span className={isDark ? "text-gray-300" : "text-slate-600"}>{tutor.location}</span>
                                </div>
                                {tutor.availableToday && (
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? "bg-yellow-500/20 text-yellow-400" : "bg-green-50 text-green-600"}`}>
                                    Available Today
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className={`flex items-center justify-between mb-4 pt-3 border-t ${isDark ? "border-gray-700" : "border-green-100"}`}>
                              <div>
                                <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>Hourly Rate</p>
                                <p className={`text-2xl font-black ${isDark ? "text-yellow-500" : "text-green-600"}`}>${tutor.hourlyRate}<span className="text-sm">/hr</span></p>
                              </div>
                              <button
                                onClick={() => handleBookTrial(tutor.id)}
                                className={`px-5 py-2 rounded-full font-bold shadow-md ${
                                  isDark
                                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                                    : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                }`}
                              >
                                Free Trial
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              {filteredTutors.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-3 w-10 h-10 rounded-full shadow-lg flex items-center justify-center border-2 ${
                      isDark
                        ? "bg-gray-800 border-yellow-500/30 text-yellow-500"
                        : "bg-white border-green-200 text-green-600"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-3 w-10 h-10 rounded-full shadow-lg flex items-center justify-center border-2 ${
                      isDark
                        ? "bg-gray-800 border-yellow-500/30 text-yellow-500"
                        : "bg-white border-green-200 text-green-600"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {filteredTutors.map((_, idx) => (
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
          </>
        )}

        {/* View All Button */}
        {filteredTutors.length > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/find-tutors")}
              className={`inline-flex items-center gap-2 font-bold transition-colors ${
                isDark ? "text-yellow-400 hover:text-yellow-300" : "text-green-600 hover:text-green-700"
              }`}
            >
              <span>View All Tutors</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}