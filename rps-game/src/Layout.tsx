import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

export default function Layout() {
  return (
    <div>
      <Toaster position="top-center" richColors /> <Navbar />
      <Outlet />
      <Analytics />
    </div>
  );
}
