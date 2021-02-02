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

// 處理非同步問題
export const setLikeMovie = (movie) => {
  return {
    type: "SETLIKE_MOVIE",
    movie: movie,
  };
};

export const setLikePerson = (person) => {
  return {
    type: "SETLIKE_PERSON",
    person: person,
  };
};
