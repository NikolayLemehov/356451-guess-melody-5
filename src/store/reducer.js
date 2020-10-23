import {extend} from "../utils";
import {ActionType} from "./action";
import questions from "../mocks/questions";

const initialState = {
  mistakeCount: 0,
  step: 0,
  questions,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      const nextStep = state.step + action.payload;
      return extend(state, {
        step: nextStep,
      });

    case ActionType.INCREMENT_MISTAKE:
      return extend(state, {
        mistakeCount: state.mistakeCount + action.payload,
      });

    case ActionType.RESET_GAME:
      return extend({}, initialState);

    default:
      return state;
  }
};

export {reducer};
