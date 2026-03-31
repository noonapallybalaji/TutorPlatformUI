// pages/register/tutor/Step4LocationSchedule.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, Navigation, ArrowLeft, CheckCircle2, Loader2, 
  Sparkles, Clock, Calendar, Map
} from "lucide-react";

export default function TutorLocationSchedule() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    coordinates: { lat: null, lng: null }
  });
  const [availability, setAvailability] = useState({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: ""
  });

  const timeSlots = [
    "Not Available",
    "9:00 AM - 1:00 PM",
    "1:00 PM - 5:00 PM",
    "5:00 PM - 9:00 PM",
    "9:00 AM - 5:00 PM",
    "Flexible"
  ];

  useEffect(() => {
    const savedData = localStorage.getItem("tutorRegistration");
    if (!savedData) {
      navigate("/register/tutor/step1");
    }
  }, [navigate]);

  const handleAutoDetect = () => {
    setIsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLocation({
              ...location,
              address: "123 Main Street",
              city: "New York",
              state: "NY",
              pincode: "10001",
              coordinates: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            });
          } catch (err) {
            alert("Could not detect location");
          } finally {
            setIsLoading(false);
          }
        },
        () => {
          alert("Please enable location access");
          setIsLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported");
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!location.address || !location.city || !location.pincode) {
      alert("Please fill in your address details");
      return;
    }
    
    setIsLoading(true);
    try {
      // Get all saved data
      const tutorData = JSON.parse(localStorage.getItem("tutorRegistration"));
      const phone = localStorage.getItem("tutorPhone");
      const profileData = JSON.parse(localStorage.getItem("tutorProfileData"));
      
      // Combine all data
      const completeRegistration = {
        tutor: tutorData,
        phone: phone,
        profile: profileData,
        location: location,
        availability: availability,
        role: "tutor",
        registeredAt: new Date().toISOString()
      };
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(completeRegistration));
      localStorage.setItem("userRole", "tutor");
      
      // Clear registration temp data
      localStorage.removeItem("tutorRegistration");
      localStorage.removeItem("tutorPhone");
      localStorage.removeItem("tutorProfileData");
      
      navigate("/profiles");
    } catch (err) {
      alert("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
                <Map className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Location & Availability</h2>
              <p className="text-slate-500">Step 4 of 4: Where and when can you teach?</p>
              <div className="flex justify-center mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center">1</div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center">2</div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center">3</div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center">4</div>
                </div>
              </div>
            </div>

            <div className="space-y-5 max-h-[60vh] overflow-y-auto px-2">
              {/* Auto-detect Button */}
              <button
                onClick={handleAutoDetect}
                disabled={isLoading}
                className="w-full py-3 bg-purple-50 text-purple-700 rounded-xl font-semibold hover:bg-purple-100 transition-all flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Navigation className="w-5 h-5" />
                    <span>Auto-detect Location</span>
                  </>
                )}
              </button>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                  <textarea
                    value={location.address}
                    onChange={(e) => setLocation({ ...location, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    rows="2"
                    placeholder="Street address, apartment number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={location.city}
                    onChange={(e) => setLocation({ ...location, city: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={location.state}
                    onChange={(e) => setLocation({ ...location, state: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
                    placeholder="State"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={location.pincode}
                  onChange={(e) => setLocation({ ...location, pincode: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="123456"
                  maxLength="6"
                />
              </div>

              {/* Availability Schedule */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Availability Schedule
                </label>
                <div className="space-y-2">
                  {days.map(day => (
                    <div key={day} className="flex items-center space-x-3 p-2 bg-slate-50 rounded-lg">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span className="w-24 text-sm font-medium text-slate-700">{day}</span>
                      <select
                        value={availability[day]}
                        onChange={(e) => setAvailability({ ...availability, [day]: e.target.value })}
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                      >
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Suggestion */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-purple-900">AI Suggestion</p>
                    <p className="text-xs text-purple-700 mt-1">
                      Based on your location, you can reach students within 5km radius. 
                      Evening slots (5-9 PM) are most in-demand for tutoring.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => navigate("/register/tutor/step3")}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !location.address || !location.city || !location.pincode}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Complete Tutor Profile</span>
                      <CheckCircle2 className="w-5 h-5" />
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