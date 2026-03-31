import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartContainer from "../../../components/dashboard/ChartContainer";

const data = [
  { month: "Jan", value: 5000 },
  { month: "Feb", value: 8000 },
  { month: "Mar", value: 12000 },
  { month: "Apr", value: 15000 },
  { month: "May", value: 18000 },
  { month: "Jun", value: 22000 },
];

export default function EarningsChart() {
  return (
    <ChartContainer title="Earnings" height="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
          <CartesianGrid strokeDasharray="0" stroke="rgba(100, 116, 139, 0.1)" />
          <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
            }}
            cursor={{ stroke: "#10b981", strokeWidth: 2 }}
            formatter={(value) => `₹${value.toLocaleString()}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#earningsGradient)"
            strokeWidth={3}
            dot={{ fill: "#10b981", r: 5 }}
            activeDot={{ r: 7 }}
            isAnimationActive
          />
          <defs>
            <linearGradient id="earningsGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}