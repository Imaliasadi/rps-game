/**
 * ChoiceButton component renders a single game choice (rock, paper, etc.)
 * Props:
 * - icon: SVG icon for the choice
 * - label: text label for accessibility
 * - onClick: handler when the button is clicked
 * - color: Tailwind border color class
 * - position: Tailwind absolute positioning class
 */
type Props = {
  icon: string;
  label: string;
  onClick?: () => void;
  color: string;
  position: string;
};

export default function ChoiceButton({ icon, label, onClick, color, position }: Props) {
  return (
    <button
      className={`sm:w-32 sm:h-32 w-25 h-25 shadow-lg items-center hover:-translate-y-4 hover:scale-105 transition-transform flex justify-center rounded-full border-9 inset-shadow bg-white ${color} ${position}`}
      onClick={onClick}
      aria-label={label}
    >
      <img src={icon} alt={label} className="w-12 h-12" />
    </button>
  );
}
