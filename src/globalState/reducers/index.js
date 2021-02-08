import setListReducer from "./setList";
import setPercentYearReducer from "./setPercentYear";
import setUserInfoReducer from "./setUserInfo";
import setMovieDataReducer from "./setMovieData";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  setList: setListReducer,
  setPercentYear: setPercentYearReducer,
  userLike: setUserInfoReducer,
  setMovieData: setMovieDataReducer,
});

export default allReducers;
