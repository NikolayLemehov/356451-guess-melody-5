import {combineReducers} from "redux";
import {gameProcess} from "./game-process/game-process";
import {gameData} from "./game-data/game-data";

const NameSpace = {
  DATA: `DATA`,
  GAME: `GAME`,
};

export const rootReducer = combineReducers({
  [NameSpace.DATA]: gameData,
  [NameSpace.GAME]: gameProcess,
});
