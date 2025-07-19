import ChoiceButton from "./ChoiceButton";

interface Props {
  playRound: (choice: Choice) => void;
}
import { choices, type Choice } from "../data/choices";
function GameBoard({ playRound }: Props) {
  return (
    <div className="relative w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] bg-[url('./assets/bg-pentagon.svg')] bg-no-repeat bg-center bg-contain flex items-center justify-center">
      {choices.map((choice) => (
        <ChoiceButton
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
