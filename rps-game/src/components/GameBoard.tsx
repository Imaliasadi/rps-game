import ChoiceButton from "./ChoiceButton";
import { choices, type Choice } from "../data/choices";

interface Props {
  playRound: (choice: Choice) => void;
}

function GameBoard({ playRound }: Props) {
  return (
    // The parent div is relative and sized to match the pentagon background
    <div className="relative w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] bg-[url('./assets/bg-pentagon.svg')] bg-no-repeat bg-center bg-contain flex items-center justify-center">
      {choices.map((choice) => (
        <ChoiceButton
          key={choice.key}
          icon={choice.icon}
          label={choice.label}
          color={choice.color}
          position={choice.positionClass}
          onClick={() => {
            playRound(choice.key);
          }}
        />
      ))}
    </div>
  );
}

export default GameBoard;
