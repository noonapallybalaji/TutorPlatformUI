const students = [
  { name: "Rahul", progress: "80%" },
  { name: "Anjali", progress: "65%" },
];

export default function StudentList() {
  return (
    <div className="bg-white/40 p-6 rounded-2xl shadow-lg">
      <h3 className="font-semibold mb-4">Students</h3>

      {students.map((s, i) => (
        <div key={i} className="flex justify-between mb-2">
          <span>{s.name}</span>
          <span>{s.progress}</span>
        </div>
      ))}
    </div>
  );
}