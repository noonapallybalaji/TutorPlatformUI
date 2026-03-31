import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Tutors from "./components/Tutors";
import Subjects from "./components/Subjects";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function Home() { // ✅ FIXED
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen text-gray-800">
      <Navbar />

      <Hero />
      <Tutors />
      <Subjects />
      <Features />
      <CTA />
      <Footer />

    </div>
  );
}