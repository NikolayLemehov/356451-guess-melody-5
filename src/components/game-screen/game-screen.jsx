import React from "react";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import {GameType} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import Mistakes from "../mistakes/mistakes";

import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";

const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

const GameScreen = (props) => {
  const {questions, step, onUserAnswer, resetGame, mistakeCount} = props;
  const question = questions[step];

  if (step >= questions.length || !question) {
    resetGame();

    return (
      <Redirect to="/" />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <ArtistQuestionScreenWrapped
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakeCount}/>
        </ArtistQuestionScreenWrapped>
      );
    case GameType.GENRE:
      return (
        <GenreQuestionScreenWrapped
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakeCount}/>
        </GenreQuestionScreenWrapped>
      );
  }

  return <Redirect to="/" />;
};

GameScreen.propTypes = {
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  mistakeCount: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  mistakeCount: state.mistakeCount,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));
  },
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
