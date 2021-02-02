import setListReducer from "./setList";
import setPercentValueReducer from "./setPercentValue";
import likeListReducer from "./likeList";
import setYearReducer from "./setYear";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  setList: setListReducer,
  setPercentValue: setPercentValueReducer,
  likeList: likeListReducer,
  setYear: setYearReducer,
});

export default allReducers;
