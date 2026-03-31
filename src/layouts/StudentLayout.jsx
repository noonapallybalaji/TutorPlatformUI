import StudentSidebar from "../pages/student/components/StudentSidebar";
import StudentTopbar from "../pages/student/components/StudentTopbar";

export default function StudentLayout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-green-50">
      
      <StudentSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <StudentTopbar />

        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}