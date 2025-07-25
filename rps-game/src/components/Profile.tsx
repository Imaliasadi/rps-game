import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/fireBase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChevronDown, LogOut } from "lucide-react";

export default function UserMenu() {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);

  const displayName = user?.displayName || "Player";

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
      >
        {displayName}
        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute top-12 right-0 bg-white text-black shadow-md rounded-xl p-2 w-32 z-50">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full text-left hover:bg-gray-100 rounded-lg px-3 py-2 transition"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
