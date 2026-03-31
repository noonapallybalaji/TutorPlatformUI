import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
// import Register from "./pages/Register"; // Commented out if not used
import RoleSelection from "./pages/RoleSelection";
import ParentDashboard from "./pages/parent/ParentDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TutorDashboard from "./pages/tutor/TutorDashboard";

// Parent/Student Registration Flow
import BasicInfo from "./pages/register/parent/BasicInfo";
import MobileVerification from "./pages/register/parent/MobileVerification";
import Location from "./pages/register/parent/Location";
import ChildProfile from "./pages/register/parent/ChildProfile";

// Tutor Registration Flow
import TutorBasicInfo from "./pages/register/tutor/TutorBasicInfo";
import TutorMobileVerification from "./pages/register/tutor/TutorMobileVerification";
import TutorProfile from "./pages/register/tutor/TutorProfile";
import TutorLocationSchedule from "./pages/register/tutor/TutorLocationSchedule";

// Layouts
import PublicLayout from "./layouts/Publiclayout";
import ParentLayout from "./layouts/ParentLayout";
import StudentLayout from "./layouts/StudentLayout";
import TutorLayout from "./layouts/TutorLayout";

// Context Providers
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* 🌐 PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicLayout>
              <RoleSelection />
            </PublicLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <PublicLayout>
              <Profile />
            </PublicLayout>
          }
        />

        {/* 👨‍👩‍👧 PARENT / STUDENT REGISTRATION FLOW */}
        <Route path="/register/parent/step1" element={<BasicInfo />} />
        <Route path="/register/parent/step2" element={<MobileVerification />} />
        <Route path="/register/parent/step3" element={<Location />} />
        <Route path="/register/parent/step4" element={<ChildProfile />} />

        {/* 👨‍🏫 TUTOR REGISTRATION FLOW */}
        <Route path="/register/tutor/step1" element={<TutorBasicInfo />} />
        <Route path="/register/tutor/step2" element={<TutorMobileVerification />} />
        <Route path="/register/tutor/step3" element={<TutorProfile />} />
        <Route path="/register/tutor/step4" element={<TutorLocationSchedule />} />

        {/* 👨‍👩‍👧 PARENT DASHBOARD */}
        <Route
          path="/parent-dashboard"
          element={
            <ParentLayout>
              <ParentDashboard />
            </ParentLayout>
          }
        />

        {/* 🎓 STUDENT DASHBOARD */}
        <Route
          path="/student-dashboard"
          element={
            <StudentLayout>
              <StudentDashboard />
            </StudentLayout>
          }
        />

        {/* 👨‍🏫 TUTOR DASHBOARD */}
        <Route
          path="/tutor-dashboard"
          element={
            <TutorLayout>
              <TutorDashboard />
            </TutorLayout>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}