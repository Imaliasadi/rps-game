import rulesUmage from "../assets/image-rules-bonus.svg";

interface RulesModalProps {
  onClose: () => void;
}

export default function RulesModal({ onClose }: RulesModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white text-black p-8 rounded-lg flex flex-col items-center gap-4 max-w-[300px] w-full">
        <h2 className="text-2xl font-bold">Rules</h2>
        <img src={rulesUmage} alt="rules" className="w-full" />
        <button
          onClick={onClose}
          className="text-red-500 font-bold border-2 border-red-500 rounded px-4 py-1 hover:bg-red-500 hover:text-white transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
