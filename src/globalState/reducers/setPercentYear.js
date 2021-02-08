const initialState = {
  percent: 100,
  currentYear: 2020,
};

const setPercentReducer = (state = initialState, action) => {
  if (action.type === "SETPERCENT") {
    const min = action.yearRange.min;
    const max = action.yearRange.max;
    const currentYear = Math.floor(state.percent * ((max - min) / 100) + min);
    return { ...state, percent: action.value, currentYear: currentYear };
  }
  return state;
};

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

const setPercentYearReducer = (state = {}, action) => {
  const yearRange = state.yearRange;
  return {
    yearRange: setYearReducer(state.yearRange, action),
    percent: setPercentReducer(state.percent, { ...action, yearRange }),
  };
};

export default setPercentYearReducer;
