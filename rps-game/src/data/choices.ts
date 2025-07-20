import rockIcon from "../assets/icon-rock.svg";
import paperIcon from "../assets/icon-paper.svg";
import scissorsIcon from "../assets/icon-scissors.svg";
import lizardIcon from "../assets/icon-lizard.svg";
import spockIcon from "../assets/icon-spock.svg";

/**
 * Centralized data for all game choices.
 * Each choice includes its key, icon, border color, label, and pentagon position.
 */
export const choices = [
  {
    key: "rock",
    icon: rockIcon,
    color: "border-[#de3a5a]",
    label: "rock",
    positionClass: "absolute -bottom-10 -right-3",
  },
  {
    key: "paper",
    icon: paperIcon,
    color: "border-[#5471f3]",
    label: "paper",
    positionClass: "absolute top-[18%] -right-14",
  },
  {
    key: "scissors",
    icon: scissorsIcon,
    color: "border-[#eca81e]",
    label: "scissors",
    positionClass: "absolute -top-14 left-1/2 -translate-x-1/2",
  },
  {
    key: "lizard",
    icon: lizardIcon,
    color: "border-[#8c5de5]",
    label: "lizard",
    positionClass: "absolute -bottom-10 -left-3",
  },
  {
    key: "spock",
    icon: spockIcon,
    color: "border-[#40b9ce]",
    label: "spock",
    positionClass: "absolute top-[18%] -left-14",
  },
] as const;

// Type for valid choice keys
export type Choice = (typeof choices)[number]["key"];
