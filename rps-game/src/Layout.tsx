import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Toaster position="top-center" richColors /> <Navbar />
      <Outlet />
    </div>
  );
}
