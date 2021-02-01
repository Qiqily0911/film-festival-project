const setPercentValueReducer = (state = 100, action) => {
  switch (action.type) {
    case "SETPERCENT":
      return (state = action.value);

    default:
      return state;
  }
};

export default setPercentValueReducer;
