const sessions = [
  { student: "Rahul", time: "6 PM" },
  { student: "Anjali", time: "7 PM" },
];

export default function SessionList() {
  return (
    <div className="bg-white/40 p-6 rounded-2xl shadow-lg">
      <h3 className="font-semibold mb-4">Upcoming Sessions</h3>

      {sessions.map((s, i) => (
        <div key={i} className="flex justify-between mb-2">
          <span>{s.student}</span>
          <span>{s.time}</span>
        </div>
      ))}
    </div>
  );
}