import {getIsGenreAnswerCorrect, getIsArtistAnswerCorrect} from "../game";
import {GameType} from "../const";

export const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET_GAME: `RESET_GAME`,
  INCREMENT_MISTAKE: `INCREMENT_MISTAKE`,
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
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

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});
