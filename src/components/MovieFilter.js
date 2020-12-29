import React, { useState, useEffect } from "react";
import styles from "../style/MovieFilter.module.scss";
import { BtnData } from "../data/BtnData";
// import { CSSTransition } from "react-transition-group";

function MovieFilter(props) {
  //  let [currentlist, setCurrentList] = useState("");
  const [subBtnVal, setSubBtnVal] = useState({
    "index-0": "",
    "index-1": "",
    "index-2": "",
  });
  const [prizeArr, setPrizeArr] = useState([]);

  // 設定影展和獎項
  function selectPrize(e) {
    let num1 = Number(e.target.parentNode.dataset.order);
    let num2 = Number(e.target.dataset.order);
    let order = Number(e.nativeEvent.path[5].dataset.order);

    let btnSelect = {
      title: BtnData[num1].btnText,
      prize_zh: BtnData[num1].arr[num2].subBtnName,
      prize_name: BtnData[num1].arr[num2].subBtnText,
      list_name: BtnData[num1].list_name,
      film_list: BtnData[num1].value,
      prize: BtnData[num1].arr[num2].subBtnValue,
      prizeId: BtnData[num1].arr[num2].subBtnId,
      logo: BtnData[num1].logo,
      order: order,
    };

    let arr = [...props.listState];

    // 選不同獎項
    for (let i = 0; i < props.listState.length; i++) {
      if (props.listState[i].film_list !== undefined) {
        if (btnSelect.title === props.listState[i].title) {
          if (btnSelect.prize === props.listState[i].prize) {
            alert("選過囉");
            return;
          }
        }
      }
    }

    // reset subBtn value
    let name = `index-${order}`;
    setSubBtnVal({
      ...subBtnVal,
      [name]: "",
    });

    arr[order] = btnSelect;
    props.setlistState(arr);
    props.setPercentValue(100);
    props.setScroll(true);
  }

  function close(e) {
    let order = Number(e.target.dataset.order);
    let arr = [...props.listState];
    arr[order] = { film_list: undefined, order: order };
    props.setlistState(arr);
  }

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      if (props.listState[i].film_list !== undefined) {
        arr.push(props.listState[i].prizeId);
        // console.log(props.listState[i]);
      } else {
        arr.push(null);
      }
    }
    setPrizeArr(arr);
  }, [props.listState]);

  const title = props.listState.map((list, i) => (
    <div className={styles.fesTitle} key={i}>
      {list.film_list !== undefined ? (
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
      ) : (
        <div data-order={list.order} name={"index-" + i}>
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
                    subBtnVal["index-" + i] === data.btnText
                      ? styles.wrapOpen
                      : ""
                  }`}
                  //  style={{
                  //     transitionDuration: `${data.arr.length * 0.3}s`,
                  //  }}
                  value={data.btnText}
                  onClick={(e) => {
                    if (subBtnVal[`index-${i}`] === e.target.value) {
                      setSubBtnVal({
                        ...subBtnVal,
                        [`index-${i}`]: "",
                      });
                    } else {
                      setSubBtnVal({
                        ...subBtnVal,
                        [`index-${i}`]: e.target.value,
                      });
                    }
                  }}
                >
                  <button
                    type="button"
                    className={styles.mainBtn}
                    value={data.btnText}
                  >
                    {data.btnText}
                  </button>

                  <div
                    id={data.btnText}
                    className={styles.subBtn}
                    data-order={j}
                  >
                    {data.arr.map((subBtn, k) => (
                      <>
                        <button
                          key={k}
                          type="button"
                          onClick={selectPrize}
                          data-order={k}
                          style={{
                            color: prizeArr.includes(subBtn.subBtnId)
                              ? "#ad9654"
                              : "gray",
                          }}
                        >
                          {/* {console.log(subBtn.subBtnId)} */}
                          {subBtn.subBtnName}
                        </button>
                      </>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  ));
  //  console.log(currentlist);
  return (
    <div className={styles.movieFilter}>
      {/* {console.log(prizeArr)} */}
      <div className={styles.titleBox}>{title}</div>
    </div>
  );
}

export default MovieFilter;
