const initialData = {
  detail: "",
  video: "",
  images: "",
  credits: "",
  overview_translate: "",
  omdbData: "",
  localData: "",
};

const setMovieDataReducer = (state = initialData, action) => {
  if (action.type === "SETDATA_MOVIE") {
    return {
      ...state,
      detail: action.data[0],
      video: action.data[1],
      images: action.data[2],
      credits: action.data[3],
      overview_translate: action.data[4],
      omdbData: action.data[5],
      localData: action.data[6],
    };
  }
  return state;
};

export default setMovieDataReducer;
