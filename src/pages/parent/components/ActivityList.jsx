import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, BookOpen } from "lucide-react";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import ListItem from "../../../components/dashboard/ListItem";

export default function ActivityList() {
  const activities = [
    { title: "Math homework submitted", icon: CheckCircle2 },
    { title: "Science class attended", icon: BookOpen },
    { title: "English test completed", icon: CheckCircle2 },
    { title: "Progress improved by 10%", icon: TrendingUp },
  ];

  return (
    <DashboardCard title="Recent Activity" icon={CheckCircle2}>
      <div className="space-y-1">
        {activities.map((activity, i) => {
          const IconComponent = activity.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ListItem
                title={activity.title}
                icon={IconComponent}
                divider={i < activities.length - 1}
              />
            </motion.div>
          );
        })}
      </div>
    </DashboardCard>
  );
}