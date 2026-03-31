import { motion } from "framer-motion";
import { DollarSign, Users, Calendar, Star } from "lucide-react";
import TutorSidebar from "./components/TutorSidebar";
import TutorTopbar from "./components/TutorTopbar";
import StatsCard from "./components/StatsCard";
import EarningsChart from "./components/EarningsChart";
import StudentList from "./components/StudentList";
import SessionList from "./components/SessionList";
import AIInsights from "./components/AIInsights";

export default function TutorDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <TutorSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TutorTopbar />

        <motion.div
          className="p-6 grid grid-cols-12 gap-6 overflow-y-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatsCard
              title="Total Earnings"
              value="₹45,000"
              icon={DollarSign}
            />
            <StatsCard
              title="Active Students"
              value="18"
              icon={Users}
            />
            <StatsCard
              title="Sessions"
              value="120"
              icon={Calendar}
            />
            <StatsCard
              title="Rating"
              value="4.8"
              subtitle="⭐"
              icon={Star}
              variant="highlight"
            />
          </motion.div>

          {/* Chart */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8">
            <EarningsChart />
          </motion.div>

          {/* AI Insights */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4">
            <AIInsights />
          </motion.div>

          {/* Students */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-6">
            <StudentList />
          </motion.div>

          {/* Sessions */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-6">
            <SessionList />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}