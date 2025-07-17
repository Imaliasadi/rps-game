type Props = {
  icon: string;
  label: string;
  onClick?: () => void;
  color: string;
};

export default function ChoiceButton({ icon, label, onClick, color }: Props) {
  return (
    <button
      className={`w-32 h-32 shadow-lg items-center hover:scale-105 transition-transform flex justify-center rounded-full border-8 bg-white ${color}`}
      onClick={onClick}
      aria-label={label}
    >
      <img src={icon} alt={label} className="w-12 h-12" />
    </button>
  );
}
