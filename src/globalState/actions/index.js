export const increment = (num) => {
  return {
    type: "INCREMENT",
    payload: num,
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

export const setListWith = (num) => {
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
