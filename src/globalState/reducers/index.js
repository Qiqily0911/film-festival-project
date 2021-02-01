import setListReducer from "./setList";
import setPercentValueReducer from "./setPercentValue";
import likeListReducer from "./likeList";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  setList: setListReducer,
  setPercentValue: setPercentValueReducer,
  likeList: likeListReducer,
});

export default allReducers;
