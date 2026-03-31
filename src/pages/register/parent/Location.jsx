// pages/register/parent/Location.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Navigation, ArrowRight, ArrowLeft, Sparkles, Sun, Moon, Loader2 } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import StepProgress from "../../../components/ui/StepProgress";

export default function Location() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [location, setLocation] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    coordinates: { lat: null, lng: null }
  });

  useEffect(() => {
    const savedData = localStorage.getItem("parentRegistration");
    if (!savedData) {
      navigate("/register/parent/step1");
    }
  }, [navigate]);

  // Function to get address from coordinates using reverse geocoding
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      // Using OpenStreetMap Nominatim API (free, no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.address) {
        const address = data.address;
        return {
          address: `${address.road || ''} ${address.house_number || ''}`.trim() || address.suburb || address.neighbourhood || "",
          city: address.city || address.town || address.village || "",
          state: address.state || "",
          pincode: address.postcode || "",
          country: address.country || ""
        };
      }
      return null;
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return null;
    }
  };

  const handleAutoDetect = () => {
    setIsDetecting(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Get address from coordinates
            const addressData = await getAddressFromCoordinates(latitude, longitude);
            
            if (addressData) {
              setLocation({
                ...location,
                address: addressData.address,
                city: addressData.city,
                state: addressData.state,
                pincode: addressData.pincode,
                country: addressData.country,
                coordinates: { lat: latitude, lng: longitude }
              });
            } else {
              // Fallback if address not found
              setLocation({
                ...location,
                coordinates: { lat: latitude, lng: longitude }
              });
              alert("Location detected but address could not be retrieved. Please enter manually.");
            }
          } catch (err) {
            console.error("Error getting address:", err);
            alert("Could not get address from location. Please enter manually.");
          } finally {
            setIsDetecting(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          let errorMessage = "Unable to detect location. ";
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += "Please enable location access in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage += "Location request timed out. Please try again.";
              break;
            default:
              errorMessage += "Please check your location settings.";
          }
          alert(errorMessage);
          setIsDetecting(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert("Geolocation is not supported by your browser. Please enter your address manually.");
      setIsDetecting(false);
    }
  };

  const handleContinue = () => {
    if (location.address && location.city && location.pincode) {
      localStorage.setItem("parentLocation", JSON.stringify(location));
      navigate("/register/parent/step4");
    } else {
      alert("Please fill in all required fields (Address, City, Pincode)");
    }
  };

  return (
    <>
      {/* Fixed Background */}
      <div className={`fixed inset-0 z-0 ${isDark ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 via-white to-indigo-50/30"}`} />
      
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
        <div className="max-w-md w-full">
          <div className={`backdrop-blur-xl rounded-3xl shadow-2xl border p-6 md:p-8 ${
            isDark
              ? "bg-gray-800/95 border-gray-700"
              : "bg-white/95 border-slate-200"
          }`}>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-sm mx-auto ${
                  isDark
                    ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                    : "bg-gradient-to-br from-emerald-500 to-green-500"
                }`}
              >
                <MapPin className="w-6 h-6 text-white" />
              </motion.div>
              
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>Your Location</h2>
              <p className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-slate-500"}`}>Step 3 of 4: Location Details</p>

              {/* Step Progress */}
              <StepProgress 
                currentStep={3} 
                totalSteps={4}
                labels={["Info", "Phone", "Location", "Child"]}
                isDark={isDark}
              />
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAutoDetect}
                disabled={isDetecting}
                className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                  isDark
                    ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30"
                    : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                }`}
              >
                {isDetecting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Detecting location...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-5 h-5" />
                    <span>Auto-detect My Location</span>
                  </>
                )}
              </button>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className={`absolute left-3 top-3 w-5 h-5 ${isDark ? "text-gray-500" : "text-slate-400"}`} />
                  <textarea
                    value={location.address}
                    onChange={(e) => setLocation({ ...location, address: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500/20"
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                    rows="2"
                    placeholder="Street address, apartment number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={location.city}
                    onChange={(e) => setLocation({ ...location, city: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500/20"
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                    State
                  </label>
                  <input
                    type="text"
                    value={location.state}
                    onChange={(e) => setLocation({ ...location, state: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500/20"
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={location.pincode}
                    onChange={(e) => setLocation({ ...location, pincode: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500/20"
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                    placeholder="123456"
                    maxLength="6"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                    Country
                  </label>
                  <input
                    type="text"
                    value={location.country}
                    onChange={(e) => setLocation({ ...location, country: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500/20"
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                    placeholder="Country"
                  />
                </div>
              </div>

              {/* Map Preview (Optional) */}
              {location.coordinates.lat && location.coordinates.lng && (
                <div className={`mt-2 p-3 rounded-xl text-center text-xs ${
                  isDark ? "bg-gray-700/50 text-gray-400" : "bg-green-50 text-green-700"
                }`}>
                  <p>📍 Location detected! Latitude: {location.coordinates.lat.toFixed(4)}, Longitude: {location.coordinates.lng.toFixed(4)}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  onClick={() => navigate("/register/parent/step2")}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 border ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                      : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleContinue}
                  disabled={!location.address || !location.city || !location.pincode}
                  className={`flex-1 py-3 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2 ${
                    isDark
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-yellow-500/25"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-500/25"
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}