import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getAuth, onAuthStateChanged, signOut, type User } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const navLinks = user ? ["game", "profile"] : ["login", "signup", "game"];

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 bg-transparent text-white">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:underline hidden sm:block">
          RPS Game
        </Link>

        {/* Menu Button */}
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

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 items-center">
          {navLinks.map((path) => (
            <li key={path}>
              <Link to={`/${path}`} className="hover:underline">
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            </li>
          ))}

          {user && (
            <>
              <Link to="/profile">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <FaUserCircle size={24} />
                )}
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm text-red-400 hover:text-red-500 ml-2"
              >
                Sign Out
              </button>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
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
              <div className="flex items-center gap-2 mt-4">
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="profile"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ) : (
                    <FaUserCircle size={24} />
                  )}
                </Link>
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
