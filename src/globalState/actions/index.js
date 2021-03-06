export const setListWidth = (num) => {
  return {
    type: "SETLIST_WIDTH",
    num: num,
  };
};

export const setListCase = (num) => {
  return {
    type: "SETLIST_CASE",
    listCase: num,
  };
};

// export const setListYearRef = (yearRef) => {
//    return {
//       type: "SETLIST_YEARREF",
//       yearRef: yearRef,
//    };
// };

export const setListPrize = (arr) => {
  return {
    type: "SETLIST_PRIZE",
    prizeArr: arr,
  };
};

export const setListClose = (num) => {
  return {
    type: "SETLIST_CLOSE",
    index: num,
  };
};

export const setListAdd = (num, obj) => {
  return {
    type: "SETLIST_ADD",
    index: num,
    select: obj,
  };
};

export const setPercentValue = (value) => {
  return {
    type: "SETPERCENT",
    value: value,
  };
};

export const setYear = (max, min) => {
  return {
    type: "SETYEAR",
    max: max,
    min: min,
  };
};
export const setUserInfo = (user) => {
  return {
    type: "SETUSER_INFO",
    user: user,
  };
};

export const setLikeMovie = (movie) => {
  return {
    type: "SETUSER_MOVIE",
    movie: movie,
  };
};

export const setLikePerson = (person) => {
  return {
    type: "SETUSER_PERSON",
    person: person,
  };
};

export const setMovieData = (dataArr) => {
  return {
    type: "SETDATA_MOVIE",
    data: dataArr,
  };
};
