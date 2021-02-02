const initialYear = {
  max: 2020,
  min: 1928,
};

const setYearReducer = (state = initialYear, action) => {
  if (action.type === "SETYEAR") {
    return { ...state, max: action.max, min: action.min };
  }

  return state;
};

export default setYearReducer;
