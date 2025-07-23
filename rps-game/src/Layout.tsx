import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="pt-16">
      {" "}
      <Navbar />
      <Outlet />
    </div>
  );
}
