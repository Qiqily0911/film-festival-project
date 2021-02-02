import React, { useState } from "react";
import styles from "../../style/MovieFilter.module.scss";
import { BtnData } from "../../data/LocalSource";
import { setListClose } from "../../globalState/actions";
import { useSelector, useDispatch } from "react-redux";

function MovieFilter(props) {
  const listState = useSelector((state) => state.setList);
  const dispatch = useDispatch();
  const [subBtnVal, setSubBtnVal] = useState({
    "index-0": "",
    "index-1": "",
    "index-2": "",
  });

  function selectPrize(e) {
    const dataId = e.target.value;
    const prizeName = dataId.substring(0, dataId.length - 3);
    const prizeNum = dataId.substring(dataId.length - 1) - 1;

    const fesData = BtnData.find((e) => e.list_name === prizeName);
    const prizeData = fesData.arr[prizeNum];
    const index = Number(e.target.dataset.order);

    props.selectPrize(fesData, prizeData, index);

    setSubBtnVal({
      ...subBtnVal,
      [`index-${index}`]: "",
    });
  }

  function close(e) {
    const order = Number(e.target.dataset.order);
    dispatch(setListClose(order));
  }

  function selectFestival(e, i) {
    if (subBtnVal[`index-${i}`] !== e.target.value) {
      setSubBtnVal({
        ...subBtnVal,
        [`index-${i}`]: e.target.value,
      });
    }
  }

  const selectedList = (list) => (
    <div>
      <div className={styles.inner}>
        <div>
          <span className={styles.title}>
            <div
              className={styles.closeBtn}
              onClick={close}
              data-order={list.order}
            >
              ×
            </div>
            {list.title}
          </span>
          <br />
          <span className={styles.prize}>{list.prize_zh}</span>
        </div>
      </div>
    </div>
  );

  const notSelectList = (i) => (
    <div name={"index-" + i}>
      <div className={styles.inner}>
        <span>
          選擇
          <br />
          影展及獎項
        </span>

        <div className={styles.option}>
          {BtnData.map((data, j) => (
            <div
              key={j}
              className={`${styles.wrap} ${
                subBtnVal["index-" + i] === data.btnText ? styles.wrapOpen : ""
              }`}
            >
              <button
                type="button"
                className={styles.mainBtn}
                value={data.btnText}
                onClick={(e) => selectFestival(e, i)}
              >
                {data.btnText}
              </button>

              <div className={styles.subBtn}>
                {data.arr.map((subBtn, k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={selectPrize}
                    value={subBtn.dataId}
                    data-order={i}
                    style={{
                      color: props.prizeArr.includes(subBtn.dataId)
                        ? "#ad9654"
                        : "gray",
                    }}
                  >
                    {subBtn.subBtnName}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.movieFilter}>
      <div className={styles.titleBox}>
        {listState.list.map((list, i) => (
          <div className={styles.fesTitle} key={i}>
            {list.film_list ? selectedList(list) : notSelectList(i)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieFilter;
