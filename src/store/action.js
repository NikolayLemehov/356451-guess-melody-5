import {getIsGenreAnswerCorrect, getIsArtistAnswerCorrect} from "../game";
import {GameType} from "../const";

export const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET_GAME: `RESET_GAME`,
  INCREMENT_MISTAKE: `INCREMENT_MISTAKE`,
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
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

export const loadQuestions = (questions) => ({
  type: ActionType.LOAD_QUESTIONS,
  payload: questions,
});
