const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;
    case "DECREMENT":
      return { ...state, state };
    default:
      return state;
  }
};

export default counterReducer;
