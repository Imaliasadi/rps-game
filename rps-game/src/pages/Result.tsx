import { useLocation, useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";
import { choices, type Choice } from "../data/choices";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

// Interface for the navigation state passed from the Game page
interface LocationState {
  userChoice: Choice;
  computerChoice: Choice;
  result: string;
}

// Helper function to get full choice data (icon, color, etc.) from the key
function getChoiceData(key: Choice) {
  // The non-null assertion (!) is safe here because all keys are valid
  return choices.find((c) => c.key === key)!;
}

export default function Result() {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  // Get the state passed from the previous page (Game)
  const { state } = useLocation() as { state: LocationState };

  // If state is missing (e.g., user navigates directly), redirect to game
  if (!state) {
    navigate("/game");
    return null;
  }
  const { userChoice, computerChoice, result } = state;

  // Get display data for both user and computer choices
  const userData = getChoiceData(userChoice);
  const computerData = getChoiceData(computerChoice);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f3756] to-[#141539] text-white flex flex-col items-center justify-between p-4 space-y-6">
      {result === "You Win!" && <Confetti width={width} height={height} />}
      {/* ScoreBoard displays the current scores */}
      <ScoreBoard />

      <div className="flex justify-center space-x-20">
        {/* User's choice display */}
        <div className="text-center">
          <p className="text-xl font-bold mb-2 uppercase">You Picked</p>
          <div
            className={`inline-block p-6 border-8 rounded-full bg-white ${userData.color}`}
          >
            <img src={userData.icon} alt={userData.label} className="w-24 h-24" />
          </div>
        </div>
        {/* Computer's choice display */}
        <div className="text-center">
          <p className="text-xl mb-2 uppercase font-bold">The House Picked</p>
          <div
            className={`inline-block p-6 border-8 rounded-full bg-white ${computerData.color}`}
          >
            <img src={computerData.icon} alt={computerData.label} className="w-24 h-24" />
          </div>
        </div>
      </div>
      {/* Show the result (Win/Lose/Draw) */}
      <p className="text-6xl font-extrabold uppercase">{result}</p>
      {/* Button to play again, navigates back to the game */}
      <button
        className="bg-transparent text-white px-4 py-2 rounded hover:bg-white hover:text-black transition border-2 border-amber-50"
        onClick={() => navigate("/game")}
      >
        Play Again
      </button>
    </div>
  );
}
