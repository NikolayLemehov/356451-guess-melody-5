import {extend} from "../../../utils";
import {ActionType} from "../../action";

const initialState = {
  mistakeCount: 0,
  step: 0,
};

const gameProcess = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      const nextStep = state.step + action.payload;

      return extend(state, {
        step: nextStep,
      });

    case ActionType.INCREMENT_MISTAKE:
      return extend(state, {
        mistakes: state.mistakeCount + action.payload,
      });

    case ActionType.RESET_GAME:
      return extend({}, initialState);
  }

  return state;
};


export {gameProcess};
