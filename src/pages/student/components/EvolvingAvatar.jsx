// components/EvolvingAvatar.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import { Sparkles } from "lucide-react";

// Avatar configurations based on level
const avatarConfigs = {
  1: { emoji: "🦊", name: "Curious Cub", color: "from-orange-400 to-orange-600", glow: "orange" },
  2: { emoji: "🐨", name: "Eager Koala", color: "from-gray-400 to-gray-600", glow: "gray" },
  3: { emoji: "🐬", name: "Smart Dolphin", color: "from-blue-400 to-blue-600", glow: "blue" },
  4: { emoji: "🦁", name: "Brave Lion", color: "from-yellow-500 to-orange-600", glow: "yellow" },
  5: { emoji: "🦅", name: "Wise Eagle", color: "from-purple-500 to-pink-600", glow: "purple" },
  6: { emoji: "🐉", name: "Legendary Dragon", color: "from-red-500 to-purple-600", glow: "rainbow" }
};

// Streak accessories
const streakAccessories = {
  3: { icon: "🔥", name: "Flame Badge", position: "top-right" },
  7: { icon: "⭐", name: "Star Badge", position: "top-left" },
  14: { icon: "👑", name: "Crown", position: "top" },
  30: { icon: "✨", name: "Legendary Aura", position: "aura" },
  60: { icon: "🌈", name: "Rainbow Trail", position: "trail" }
};

export default function EvolvingAvatar({ level, streak, xp }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  
  const avatar = avatarConfigs[Math.min(level, 6)] || avatarConfigs[1];
  
  // Get accessories based on streak
  const getAccessories = () => {
    console.log(isAnimating)
    const accessories = [];
    const streakLevels = Object.keys(streakAccessories).sort((a,b) => b - a);
    
    for (const streakLevel of streakLevels) {
      if (streak >= parseInt(streakLevel)) {
        accessories.push(streakAccessories[streakLevel]);
        break; // Only show highest achievement
      }
    }
    return accessories;
  };
  
  const accessories = getAccessories();
  
  // Animate avatar on level up
  useEffect(() => {
    if (level > 1) {
      setShowLevelUp(true);
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setShowLevelUp(false), 2000);
      }, 1000);
    }
  }, [level]);
  
  // Calculate next level XP
  const nextLevelXP = level * 400;
  const progressToNext = (xp % 400) / 400 * 100;
  
  return (
    <DashboardCard title="Your Avatar" icon={Sparkles}>
      <div className="relative">
        {/* Level Up Animation */}
        {showLevelUp && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 
              text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap z-20 shadow-lg"
          >
            🎉 Level {level} Unlocked! 🎉
          </motion.div>
        )}
        
        {/* Avatar Container */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-500
              ${avatar.glow === 'orange' ? 'bg-orange-500/30' :
                avatar.glow === 'blue' ? 'bg-blue-500/30' :
                avatar.glow === 'purple' ? 'bg-purple-500/30' :
                avatar.glow === 'rainbow' ? 'bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 opacity-30' :
                'bg-gray-500/30'} animate-pulse`} />
            
            {/* Main Avatar */}
            <motion.div
              animate={isAnimating ? {
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
                y: [0, -10, 0]
              } : {}}
              transition={{ duration: 0.5 }}
              className={`relative w-32 h-32 rounded-2xl bg-gradient-to-br ${avatar.color} 
                flex items-center justify-center text-6xl shadow-2xl cursor-pointer
                transition-all duration-300 hover:scale-105`}
            >
              <span className="text-7xl">{avatar.emoji}</span>
              
              {/* Animated effect for high level */}
              {level >= 6 && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    animate-shimmer" />
                </div>
              )}
            </motion.div>
            
            {/* Accessories */}
            {accessories.map((accessory, index) => (
              <motion.div
                key={accessory.name}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className={`absolute text-3xl ${
                  accessory.position === "top-right" ? "-top-2 -right-2" :
                  accessory.position === "top-left" ? "-top-2 -left-2" :
                  accessory.position === "top" ? "-top-4 left-1/2 -translate-x-1/2" :
                  accessory.position === "aura" ? "inset-0 flex items-center justify-center" :
                  "-bottom-6 left-1/2 -translate-x-1/2"
                }`}
              >
                <span className="text-3xl">{accessory.icon}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Avatar Info */}
          <div className="text-center mt-4">
            <h3 className="font-bold text-lg">{avatar.name}</h3>
            <p className="text-sm text-gray-500">Level {level} • {streak} day streak 🔥</p>
          </div>
          
          {/* Level Progress */}
          <div className="w-full mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Next Level</span>
              <span>{Math.round(progressToNext)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {nextLevelXP - (xp % 400)} XP to next level
            </p>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}