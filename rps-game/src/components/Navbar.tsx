import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 w-full fixed top-0 z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">RPS Game</h1>
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <ul className="hidden md:flex space-x-4">
          {["login", "signup", "profile", "game"].map((path) => (
            <li key={path}>
              <Link to={`/${path}`} className="hover:underline">
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-2">
          {["login", "signup", "profile", "game"].map((path) => (
            <li key={path}>
              <Link
                to={`/${path}`}
                className="block hover:underline"
                onClick={() => setIsOpen(false)}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
