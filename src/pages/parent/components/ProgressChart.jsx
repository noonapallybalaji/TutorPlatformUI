import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import ChartContainer from "../../../components/dashboard/ChartContainer";

const data = [
  { name: "Mon", progress: 60 },
  { name: "Tue", progress: 70 },
  { name: "Wed", progress: 65 },
  { name: "Thu", progress: 80 },
  { name: "Fri", progress: 85 },
  { name: "Sat", progress: 75 },
  { name: "Sun", progress: 90 },
];

export default function ProgressChart() {
  return (
    <ChartContainer title="Weekly Progress" height="h-80">
      <div className="h-full w-full min-h-[260px] min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="0" stroke="rgba(100, 116, 139, 0.1)" />
          <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
            }}
            cursor={{ stroke: "#3b82f6", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="progress"
            stroke="url(#colorGradient)"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", r: 5 }}
            activeDot={{ r: 7 }}
            isAnimationActive
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}