const initialState = {
  user: "",
  movieList: [],
  personList: [],
};

const setUserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SETUSER_INFO":
      return { ...state, user: action.user };
    case "SETUSER_MOVIE":
      return { ...state, movieList: action.movie };
    case "SETUSER_PERSON":
      return { ...state, personList: action.person };

    default:
      return state;
  }
};

export default setUserInfoReducer;
