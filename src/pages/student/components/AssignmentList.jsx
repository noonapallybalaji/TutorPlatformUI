const assignments = [
  { title: "Math Homework", status: "Pending" },
  { title: "Science Project", status: "Completed" },
  { title: "English Essay", status: "Pending" },
];

export default function AssignmentList() {
  return (
    <div className="bg-white/40 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Assignments</h2>

      {assignments.map((a, i) => (
        <div key={i} className="flex justify-between mb-3">
          <span>{a.title}</span>
          <span
            className={`text-sm px-2 py-1 rounded ${
              a.status === "Completed"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {a.status}
          </span>
        </div>
      ))}
    </div>
  );
}