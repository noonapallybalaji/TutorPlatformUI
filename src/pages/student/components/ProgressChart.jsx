import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", progress: 40 },
  { day: "Tue", progress: 60 },
  { day: "Wed", progress: 50 },
  { day: "Thu", progress: 80 },
  { day: "Fri", progress: 70 },
];

export default function ProgressChart() {
  return (
    <div className="bg-white/40 backdrop-blur-lg p-6 rounded-2xl shadow-lg h-[300px]">
      <h2 className="text-lg font-semibold mb-4">Learning Progress</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <Tooltip />
          <Line type="monotone" dataKey="progress" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}