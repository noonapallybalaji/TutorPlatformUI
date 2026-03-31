import { Bell } from "lucide-react";

export default function TutorTopbar() {
  return (
    <div className="h-16 bg-white/30 backdrop-blur-xl flex justify-between items-center px-6">
      <h2 className="text-xl font-semibold">Tutor Dashboard</h2>

      <div className="flex items-center gap-4">
        <Bell />
        <img
          src="https://i.pravatar.cc/40"
          className="w-9 h-9 rounded-full"
        />
      </div>
    </div>
  );
}