import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getAuth, onAuthStateChanged, signOut, type User } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const navLinks = user ? ["game"] : ["login", "signup", "game"];
  const displayName = user?.displayName || "Player";

  const handleSignOut = async () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");
    if (confirmLogout) {
      await signOut(auth);
      setDropdownOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 bg-transparent text-white">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:underline hidden sm:block">
          RPS Game
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden w-8 h-8 z-50 absolute right-0 top-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div
            className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-white transition-transform duration-300"
            style={{
              transform: isOpen
                ? "translate(-50%, -50%) rotate(45deg)"
                : "translate(-50%, -6px)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-white transition-opacity duration-300"
            style={{
              opacity: isOpen ? 0 : 1,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-white transition-transform duration-300"
            style={{
              transform: isOpen
                ? "translate(-50%, -50%) rotate(-45deg)"
                : "translate(-50%, 6px)",
            }}
          />
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-4 items-center">
          {navLinks.map((path) => (
            <li key={path}>
              <Link to={`/${path}`} className="hover:underline">
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            </li>
          ))}

          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:underline"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <FaUserCircle size={24} />
                )}
                <span>{displayName}</span>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 bg-white text-black rounded shadow p-2 z-50"
                  >
                    <button
                      onClick={handleSignOut}
                      className="block px-4 py-2 hover:bg-red-100 text-red-600 rounded"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </ul>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute left-0 right-0 mt-4 p-4 bg-white/10 backdrop-blur-md rounded shadow-lg space-y-3"
          >
            {navLinks.map((path) => (
              <Link
                key={path}
                to={`/${path}`}
                className="block text-white hover:underline"
                onClick={() => setIsOpen(false)}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            ))}

            {user && (
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                  ) : (
                    <FaUserCircle size={24} />
                  )}
                  <span>{displayName}</span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  className="text-red-400 text-sm hover:text-red-500"
                >
                  Sign Out
                </button>
              </div>
            )}

            <Link
              to="/"
              className="block text-white font-bold hover:underline mt-2"
              onClick={() => setIsOpen(false)}
            >
              RPS Game
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
