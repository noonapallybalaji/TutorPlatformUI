// components/ui/StepProgress.jsx
import { useTheme } from "../../context/ThemeContext";

export default function StepProgress({ currentStep, totalSteps, labels }) {
  const { isDark } = useTheme();
  
  return (
    <div className="flex justify-center">
      <div className="flex items-center space-x-2">
        {[...Array(totalSteps)].map((_, idx) => (
          <div key={idx} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                idx + 1 <= currentStep 
                  ? isDark
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : isDark
                  ? "bg-gray-700 text-gray-400"
                  : "bg-slate-200 text-slate-500"
              }`}>
                {idx + 1}
              </div>
              {labels && labels[idx] && (
                <span className={`text-xs mt-1 hidden sm:block ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                  {labels[idx]}
                </span>
              )}
            </div>
            {idx < totalSteps - 1 && (
              <div className={`w-8 h-0.5 mx-1 transition-all ${
                idx + 1 < currentStep 
                  ? isDark ? "bg-yellow-500" : "bg-indigo-600"
                  : isDark ? "bg-gray-700" : "bg-slate-200"
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}