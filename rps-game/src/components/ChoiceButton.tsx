type Props = {
  icon: string;
  label: string;
  onClick?: () => void;
};

export default function ChoiceButton({ icon, label, onClick }: Props) {
  return (
    <button
      className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center border-8 hover:scale-105 transition-transform"
      onClick={onClick}
      aria-label={label}
    >
      <img src={icon} alt={label} className="w-12 h-12" />
    </button>
  );
}
