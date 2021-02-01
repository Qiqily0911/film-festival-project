import setListReducer from "./setList";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  setList: setListReducer,
});

export default allReducers;
