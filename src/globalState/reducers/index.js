import setListReducer from "./setList";
import setPercentValueReducer from "./setPercentValue";
import likeListReducer from "./likeList";
import setYearReducer from "./setYear";
import setMovieDataReducer from "./setMovieData";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  setList: setListReducer,
  setPercentValue: setPercentValueReducer,
  likeList: likeListReducer,
  setYear: setYearReducer,
  setMovieData: setMovieDataReducer,
});

export default allReducers;
