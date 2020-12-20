import React, { useState } from "react";
import styles from "../style/MovieFilter.module.scss";
import { BtnData } from "../data/BtnData";
import { CSSTransition } from "react-transition-group";

function MovieFilter(props) {
  const [subBtnVal, setSubBtnVal] = useState({
    "index-1": "",
    "index-2": "",
    "index-3": "",
  });

  // const [subBtnOpen, setOpen] = useState(false);

  function selectFilmList(e) {
    let btnValue = e.target.value;
    let name = e.nativeEvent.path[4].getAttribute("name");

    //  reset button
    // let a = document.getElementsByClassName(`${styles.subBtnAfter}`);
    // if (a.length !== 0) {
    //    a[0].className = a[0].className.replace(`${styles.subBtnAfter}`, `${styles.subBtnBefore}`);
    // }

    // let b = document.getElementsByClassName(`${styles.subBtnBefore}`);
    // for (let i = 0; i < b.length; i++) {
    //    b[i].style.marginTop = "-10px";
    // }

    // e.target.nextSibling.style.visibility = "visible";
    // e.target.nextSibling.className = e.target.nextSibling.className.replace(
    //    `${styles.subBtnBefore}`,
    //    `${styles.subBtnAfter}`
    // );

    setSubBtnVal({
      ...subBtnVal,
      [name]: btnValue,
    });
  }

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
    props.setVertical(100);
    props.setScroll(true);
  }

  function close(e) {
    let order = Number(e.target.dataset.order);
    let arr = [...props.listState];
    arr[order] = { film_list: undefined, order: order };
    props.setlistState(arr);
  }

  const title = props.listState.map((list, i) => (
    <div className={styles.fesTitle} key={i}>
      {/* {console.log(props.listState)} */}
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
            {/* <div className={styles.addBtn}>×</div> */}
            <span>
              選擇
              <br />
              影展及獎項
            </span>

            <div className={styles.option}>
              {BtnData.map((data, j) => (
                <div key={j}>
                  <button
                    type="button"
                    onClick={selectFilmList}
                    value={data.btnText}
                  >
                    {data.btnText}
                  </button>
                  {/* FIXME make btn close smoothly */}
                  <CSSTransition
                    in={subBtnVal[`index-${i}`] === data.btnText}
                    timeout={300}
                    // unmountOnExit
                    classNames={styles.subBtnAnimate}
                  >
                    <div
                      className={styles.subBtn}
                      data-order={j}
                      // style={{ visibility: subBtnVal[`index-${i}`] === data.btnText ? "visible" : "hidden" }}
                    >
                      {data.arr.map((subBtn, k) => (
                        <>
                          {/* {list.list_name === data.list_name && list.prize === subBtn.subBtnValue
                                          ? console.log("selected")
                                          : console.log(list.list_name, data.list_name, list.prize, subBtn.subBtnValue)} */}
                          <button
                            key={k}
                            type="button"
                            onClick={selectPrize}
                            data-order={k}
                          >
                            {subBtn.subBtnName}
                          </button>
                        </>
                      ))}
                    </div>
                  </CSSTransition>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  ));

  return (
    <div className={styles.movieFilter}>
      <div className={styles.titleBox}>{title}</div>
    </div>
  );
}

export default MovieFilter;
