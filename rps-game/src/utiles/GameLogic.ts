import { choices, type Choice } from "../data/choices";

export const winMap: Record<Choice, Choice[]> = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};

export const getRandomChoice = (): Choice => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex].key;
};

export const resetScore = () => {
  localStorage.removeItem("youScore");
  localStorage.removeItem("houseScore");
  window.dispatchEvent(new Event("storage"));
};
