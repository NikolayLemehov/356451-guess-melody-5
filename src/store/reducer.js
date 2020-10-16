import {extend} from "../utils";
import {ActionType} from "./action";

const initialState = {
  mistakeCount: 0,
  step: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.INCREMENT_MISTAKES:
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
