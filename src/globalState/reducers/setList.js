import { InitListState } from "../../data/LocalSource";

const initialState = {
  listCase: 3,
  list: InitListState,
  prize: ["oscar_01", "cannes_01", "goldenHorse_01"],
  //  yearRef: "",
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
      newList.list[action.index] = action.select;
      return newList;

    case "SETLIST_PRIZE":
      newList.prize = action.prizeArr;
      return newList;

    case "SETLIST_CASE":
      newList.listCase = action.listCase;
      return newList;

    // case "SETLIST_YEARREF":
    //    newList.yearRef = action.yearRef;
    //    return newList;

    default:
      return state;
  }
};

export default setListReducer;
