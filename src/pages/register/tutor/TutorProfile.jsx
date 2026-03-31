// pages/register/tutor/Step3TutorProfile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, Clock, DollarSign, User, ArrowRight, ArrowLeft,
  Sparkles, Loader2, Plus, X, Award, Target
} from "lucide-react";

export default function TutorProfile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [tutorProfile, setTutorProfile] = useState({
    subjects: [],
    experience: "",
    hourlyRate: "",
    bio: "",
    qualifications: []
  });

  const subjects = [
    "Mathematics", "Science", "English", "Physics", "Chemistry", 
    "Biology", "History", "Geography", "Computer Science", "Programming",
    "Music", "Art", "French", "Spanish", "Economics"
  ];

  useEffect(() => {
    const savedData = localStorage.getItem("tutorRegistration");
    if (!savedData) {
      navigate("/register/tutor/step1");
    }
  }, [navigate]);

  const toggleSubject = (subject) => {
    setTutorProfile({
      ...tutorProfile,
      subjects: tutorProfile.subjects.includes(subject)
        ? tutorProfile.subjects.filter(s => s !== subject)
        : [...tutorProfile.subjects, subject]
    });
  };

  const addQualification = () => {
    setTutorProfile({
      ...tutorProfile,
      qualifications: [...tutorProfile.qualifications, ""]
    });
  };

  const updateQualification = (index, value) => {
    const newQualifications = [...tutorProfile.qualifications];
    newQualifications[index] = value;
    setTutorProfile({ ...tutorProfile, qualifications: newQualifications });
  };

  const removeQualification = (index) => {
    const newQualifications = tutorProfile.qualifications.filter((_, i) => i !== index);
    setTutorProfile({ ...tutorProfile, qualifications: newQualifications });
  };

  const handleContinue = async () => {
    if (!tutorProfile.subjects.length) {
      alert("Please select at least one subject");
      return;
    }
    if (!tutorProfile.experience) {
      alert("Please enter your years of experience");
      return;
    }
    if (!tutorProfile.hourlyRate) {
      alert("Please enter your hourly rate");
      return;
    }
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.setItem("tutorProfileData", JSON.stringify(tutorProfile));
      navigate("/register/tutor/step4");
    } catch (err) {
      alert("Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 pt-20">
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
      </div>

      <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-sm">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Tutor Profile</h2>
              <p className="text-slate-500">Step 3 of 4: Tell us about your expertise</p>
              <div className="flex justify-center mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center">1</div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center">2</div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center">3</div>
                  <div className="w-16 h-0.5 bg-slate-200"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">4</div>
                </div>
              </div>
            </div>

            <div className="space-y-5 max-h-[60vh] overflow-y-auto px-2">
              {/* Subjects */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subjects You Teach <span className="text-red-500">*</span>
                </label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {subjects.map(subject => (
                      <button
                        key={subject}
                        type="button"
                        onClick={() => toggleSubject(subject)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          tutorProfile.subjects.includes(subject)
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                            : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                </div>
                {tutorProfile.subjects.length > 0 && (
                  <p className="text-xs text-purple-600 mt-1">
                    Selected {tutorProfile.subjects.length} subject(s)
                  </p>
                )}
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Years of Experience <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="number"
                    value={tutorProfile.experience}
                    onChange={(e) => setTutorProfile({ ...tutorProfile, experience: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="5"
                    min="0"
                    step="0.5"
                  />
                </div>
              </div>

              {/* Hourly Rate */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hourly Rate ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="number"
                    value={tutorProfile.hourlyRate}
                    onChange={(e) => setTutorProfile({ ...tutorProfile, hourlyRate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="50"
                    min="0"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bio / Introduction
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                  <textarea
                    value={tutorProfile.bio}
                    onChange={(e) => setTutorProfile({ ...tutorProfile, bio: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    rows="3"
                    placeholder="Tell students about your teaching style, expertise, and what makes you unique..."
                  />
                </div>
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Qualifications
                </label>
                <div className="space-y-2">
                  {tutorProfile.qualifications.map((qual, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={qual}
                        onChange={(e) => updateQualification(idx, e.target.value)}
                        className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                        placeholder="e.g., B.Sc in Mathematics, M.Ed, 5+ years teaching experience"
                      />
                      <button
                        onClick={() => removeQualification(idx)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addQualification}
                    className="text-purple-600 text-sm hover:text-purple-700 flex items-center space-x-1 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Qualification</span>
                  </button>
                </div>
              </div>

              {/* AI Suggestion */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-purple-900">AI Suggestion</p>
                    <p className="text-xs text-purple-700 mt-1">
                      Based on your profile, we recommend highlighting your {tutorProfile.subjects[0] || "subject"} expertise 
                      and setting a competitive rate of ${Math.max(parseInt(tutorProfile.hourlyRate) || 40, 40)}/hour.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => navigate("/register/tutor/step2")}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleContinue}
                  disabled={isLoading || !tutorProfile.subjects.length || !tutorProfile.experience || !tutorProfile.hourlyRate}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}