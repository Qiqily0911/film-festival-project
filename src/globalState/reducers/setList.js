import { InitListState } from "../../data/LocalSource";

const initialState = {
  listCase: 3,
  list: InitListState,
};

const setListReducer = (state = initialState, action) => {
  const newList = { ...state };
  switch (action.type) {
    case "SETLIST_WIDTH":
      const arr = InitListState.slice(0, action.num);
      return { ...state, list: arr };
    case "SETLIST_CLOSE":
      newList.list[action.index] = { film_list: null, order: action.index };
      return newList;
    case "SETLIST_ADD":
      console.log(state);
      newList.list[action.index] = action.select;
      return newList;
    case "SETLIST_CASE":
      newList.listCase = action.listCase;
      return newList;

    default:
      return state;
  }
};

export default setListReducer;
