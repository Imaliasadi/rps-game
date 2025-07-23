import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent text-white p-4 w-full fixed top-0 z-50">
      <div className="flex justify-between items-center">
        <Link className="text-2xl font-bold hover:underline hidden sm:block" to={"/"}>
          RPS Game
        </Link>
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
          <Link className="block hover:underline" to={"/"}>
            RPS Game
          </Link>
        </ul>
      )}
    </nav>
  );
}
