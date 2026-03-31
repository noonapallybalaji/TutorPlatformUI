import TutorSidebar from "../pages/tutor/components/TutorSidebar";
import TutorTopbar from "../pages/tutor/components/TutorTopbar";

export default function TutorLayout({ children }) {
  return (
    <div className="flex h-screen">
      <TutorSidebar />

      <div className="flex-1 flex flex-col">
        <TutorTopbar />

        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}