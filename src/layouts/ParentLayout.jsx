import Sidebar from "../pages/parent/components/Sidebar";
import Topbar from "../pages/parent/components/Topbar";

export default function ParentLayout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-white">
      
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}