import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../../firebase/fireBase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

export default function GoogleAuthButton() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      toast.success(`Welcome, ${user.displayName || "Player"}! 🎉`);
      navigate("/game");
    } catch (err) {
      console.error(err);
      toast.error("Google Sign-in failed 😓");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="p-3 rounded-2xl mx-auto mt-3 text-sm bg-white text-black hover:bg-gray-400 flex items-center justify-center gap-2 border border-gray-300 shadow-sm cursor-pointer"
    >
      <FcGoogle className="text-xl" />
      {loading ? "Signing in..." : "Continue with Google"}
    </button>
  );
}
