import React, {useState} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const";


const withUserAnswer = (Component) => {
  const WithUserAnswer = (props) => {
    const {onAnswer, question} = props;
    const [answers, setAnswers] = useState(new Array(props.question.answers.length).fill(false));

    const handleAnswer = () => {
      onAnswer(question, answers);
    };

    const handleChange = (value, i) => {
      const userAnswers = answers.slice(0);
      userAnswers[i] = value;

      setAnswers(userAnswers);
    };

    return (
      <Component
        {...props}
        userAnswers={answers}
        onAnswer={handleAnswer}
        onChange={handleChange}
      />
    );
  };

  WithUserAnswer.propTypes = {
    question: PropTypes.shape({
      answers: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
      })).isRequired,
      genre: PropTypes.string.isRequired,
      type: PropTypes.oneOf([GameType.GENRE]).isRequired,
    }).isRequired,
    onAnswer: PropTypes.func.isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
