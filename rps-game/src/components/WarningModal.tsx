interface RulesModalProps {
  onClose: () => void;
  onReset: () => void;
}

export default function RulesModal({ onClose, onReset }: RulesModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white text-black p-8 rounded-lg flex flex-col items-center gap-4 max-w-[300px] w-full">
        <h2 className="text-2xl font-bold">
          Are you sure you want to reset your scores? this action can not be reversed
        </h2>
        <button
          onClick={onReset}
          className="text-red-500 font-bold border-2 border-red-500 rounded px-4 py-1 hover:bg-red-500 hover:text-white transition"
        >
          Reset
        </button>
        <button
          onClick={onClose}
          className="font-bold border-2 border-green-500 rounded px-4 py-1 hover:bg-black hover:text-white transition"
        >
          Don't Reset
        </button>
      </div>
    </div>
  );
}
