import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">RPS Game</h1>
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/game" className="hover:underline">
              Game
            </Link>
          </li>
        </ul>
      </div>
      {/* همبرگر منو */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-2">
          <li>
            <Link to="/login" className="block hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="block hover:underline">
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block hover:underline">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/game" className="block hover:underline">
              Game
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
