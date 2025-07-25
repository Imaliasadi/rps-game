import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

const GitHubLoginButton = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("GitHub user:", user);

      //navigate to game page after succesfull login
      navigate("/game");
    } catch (err) {
      console.error("GitHub login error:", err);
      if (err instanceof Error) setError(err.message);
      else setError("somthing went wrong");
    }
  };

  return (
    <>
      <button
        onClick={handleGitHubLogin}
        className="bg-gray-900 text-white text-sm py-2 px-4 rounded flex items-center gap-2 hover:bg-gray-800 transition mx-auto mt-4 cursor-pointer"
      >
        <FaGithub size={20} />
        Continue with GitHub
      </button>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </>
  );
};

export default GitHubLoginButton;
