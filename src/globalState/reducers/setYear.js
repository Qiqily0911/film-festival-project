const initialYear = {
  max: 2020,
  min: 1928,
};

const setYearReducer = (state = initialYear, action) => {
  switch (action.type) {
    case "SETYEAR":
      return { ...state, max: action.max, min: action.min };

    default:
      return state;
  }
};

export default setYearReducer;
