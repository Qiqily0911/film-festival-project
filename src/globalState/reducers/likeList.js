const initialState = {
  movieList: [],
  personList: [],
};

const likeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SETLIKE_MOVIE":
      return { ...state, movieList: action.movie };
    case "SETLIKE_PERSON":
      return { ...state, personList: action.person };

    default:
      return state;
  }
};

export default likeListReducer;
