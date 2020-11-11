import {gameProcess} from "./game-process";
import {
  ActionType,
} from "../../action";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(gameProcess(void 0, {})).toEqual({
    step: 0,
    mistakeCount: 0,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(gameProcess({
    step: 0,
    mistakeCount: 0,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  })).toEqual({
    step: 1,
    mistakeCount: 0,
  });

  expect(gameProcess({
    step: 0,
    mistakeCount: 0,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 0,
  })).toEqual({
    step: 0,
    mistakeCount: 0,
  });
});

it(`Reducer should increment number of mistakeCount by a given value`, () => {
  expect(gameProcess({
    step: 0,
    mistakeCount: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKE,
    payload: 1,
  })).toEqual({
    step: 0,
    mistakeCount: 1,
  });

  expect(gameProcess({
    step: 0,
    mistakeCount: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKE,
    payload: 0,
  })).toEqual({
    step: 0,
    mistakeCount: 0,
  });
});

it(`Reducer should return default`, () => {
  expect(gameProcess({
    step: 5,
    mistakeCount: 1,
  }, {
    type: ActionType.RESET_GAME,
    payload: null,
  })).toEqual({
    step: 0,
    mistakeCount: 0,
  });

  expect(gameProcess({
    step: 0,
    mistakeCount: 0,
  }, {
    type: ActionType.RESET_GAME,
    payload: null,
  })).toEqual({
    step: 0,
    mistakeCount: 0,
  });

  expect(gameProcess({
    step: 2,
    mistakeCount: 0,
  }, {
    type: ActionType.RESET_GAME,
    payload: null,
  })).toEqual({
    step: 0,
    mistakeCount: 0,
  });
});
