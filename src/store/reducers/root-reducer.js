import {combineReducers} from "redux";
import {gameProcess} from "./game-process/game-process";
import {gameData} from "./game-data/game-data";
import {user} from "./user/user";

const NameSpace = {
  DATA: `DATA`,
  GAME: `GAME`,
  USER: `USER`,
};

export const rootReducer = combineReducers({
  [NameSpace.DATA]: gameData,
  [NameSpace.GAME]: gameProcess,
  [NameSpace.USER]: user,
});
