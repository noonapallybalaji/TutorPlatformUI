import { motion } from "framer-motion";
import { BarChart3, TrendingUp, BookOpen, Award } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import ProgressChart from "./components/ProgressChart";
import ActivityList from "./components/ActivityList";
import AIInsights from "./components/AIInsights";

export default function ParentDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      

      <div className="flex-1 flex flex-col overflow-hidden">
        

        <motion.div
          className="flex-1 overflow-y-auto p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-heading-3xl mb-2">Welcome Back!</h1>
            <p className="text-muted">Here's how your child is doing this week</p>
          </motion.div>

          {/* STATS GRID */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <StatCard
              title="Attendance"
              value="92%"
              subtitle="This week"
              icon={BookOpen}
              trend="↑ 2% from last week"
            />
            <StatCard
              title="Math Progress"
              value="80%"
              subtitle="Current level"
              icon={TrendingUp}
              trend="↑ Improving"
            />
            <StatCard
              title="Homework Done"
              value="18/20"
              subtitle="Completed"
              icon={Award}
              trend="90% completion"
            />
            <StatCard
              title="Health Score"
              value="85/100"
              highlight
              icon={BarChart3}
              trend="Excellent"
            />
          </motion.div>

          {/* MAIN CONTENT GRID */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            <div className="lg:col-span-2">
              <ProgressChart />
            </div>
            <AIInsights />
          </motion.div>

          {/* ACTIVITY */}
          <motion.div variants={itemVariants}>
            <ActivityList />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}