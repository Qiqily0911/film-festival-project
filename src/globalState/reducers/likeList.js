const initialState = {
  movieList: [],
  personList: [],
};

const likeListReducer = (state = initialState, action) => {
  const newList = { ...state };
  switch (action.type) {
    // 處理非同步問題
    case "SETLIKE_MOVIE":
      return (newList.movieList = action.movie);
    case "SETLIKE_PERSON":
      return (newList.personList = action.person);

    default:
      return state;
  }
};

export default likeListReducer;
