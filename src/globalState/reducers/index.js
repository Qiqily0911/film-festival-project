import setListReducer from "./setList";
import setPercentValueReducer from "./setPercentValue";
import setUserInfoReducer from "./setUserInfo";
import setYearReducer from "./setYear";
import setMovieDataReducer from "./setMovieData";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  setList: setListReducer,
  setPercentValue: setPercentValueReducer,
  userLike: setUserInfoReducer,
  setYear: setYearReducer,
  setMovieData: setMovieDataReducer,
});

export default allReducers;
