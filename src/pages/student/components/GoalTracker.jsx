// components/GoalTracker.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import { Target, CheckCircle2, Plus } from "lucide-react";

export default function GoalTracker() {
  const [goals, setGoals] = useState([
    { id: 1, title: "Complete Fractions Module", progress: 60, due: "2 days left", priority: "high" },
    { id: 2, title: "Read 5 Books", progress: 40, due: "5 days left", priority: "medium" },
    { id: 3, title: "Practice Math Daily", progress: 85, due: "Today", priority: "high" }
  ]);
  
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  
  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, {
        id: Date.now(),
        title: newGoal,
        progress: 0,
        due: "7 days left",
        priority: "low"
      }]);
      setNewGoal("");
      setShowAddGoal(false);
    }
  };
  
  return (
    <DashboardCard title="Your Goals" icon={Target}>
      <div className="space-y-3">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${goal.progress === 100 ? 'text-green-500' : 'text-gray-400'}`} />
                <span className="font-medium text-sm dark:text-white">{goal.title}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                goal.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
              }`}>
                {goal.priority}
              </span>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{goal.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
              />
            </div>
            
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-400 dark:text-gray-500">{goal.due}</span>
              <button className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400">Update →</button>
            </div>
          </motion.div>
        ))}
        
        {/* Add Goal Button */}
        <AnimatePresence>
          {!showAddGoal ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddGoal(true)}
              className="w-full mt-2 p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl 
                text-gray-500 dark:text-gray-400 hover:border-green-500 hover:text-green-500 
                transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Custom Goal
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Enter your goal..."
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg mb-2 
                  focus:outline-none focus:border-green-500 dark:bg-gray-700 dark:text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddGoal}
                  className="flex-1 px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardCard>
  );
}