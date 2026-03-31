import Navbar from "../components/Navbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-20">{children}</div>
    </>
  );
}