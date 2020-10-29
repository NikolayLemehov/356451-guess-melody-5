import {getIsGenreAnswerCorrect, getIsArtistAnswerCorrect} from "../game";
import {GameType} from "../const";

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET_GAME: `RESET_GAME`,
  INCREMENT_MISTAKE: `INCREMENT_MISTAKE`,
};

export const incrementStep = () => ({
  type: ActionType.INCREMENT_STEP,
  payload: 1,
});

export const resetGame = () => ({
  type: ActionType.RESET_GAME,
});

export const incrementMistake = (question, userAnswer) => {
  let isCorrectAnswer = false;
  switch (question.type) {
    case GameType.ARTIST:
      isCorrectAnswer = getIsArtistAnswerCorrect(question, userAnswer);
      break;
    case GameType.GENRE:
      isCorrectAnswer = getIsGenreAnswerCorrect(question, userAnswer);
      break;
  }
  return {
    type: ActionType.INCREMENT_MISTAKE,
    payload: isCorrectAnswer ? 0 : 1,
  };
};

export {ActionType};
