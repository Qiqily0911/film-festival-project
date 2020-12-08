import React, { useState } from "react";
import styles from "../style/MovieFilter.module.scss";
import { nanoid } from "nanoid";
import oscar from "../oscar_best_film.json";
import cannes from "../CannesFilm.json";
import goldenHorse from "../golden_horse_best_film.json";

function MovieFilter(props) {
  const [subBtnVal, setSubBtnVal] = useState({
    "index-1": "",
    "index-2": "",
    "index-3": "",
  });

  // 主要按鈕
  const mainBtnData = [
    {
      value: "cannes",
      btnText: "坎城影展",
    },
    {
      value: "oscar",
      btnText: "奧斯卡金像獎",
    },
    {
      value: "goldenHorse",
      btnText: "金馬影展",
    },
  ];

  const subBtnData = {
    cannes: {
      source: cannes,
      title: "坎城影展",
      arr: [
        { subBtnValue: "palme_d_or", subBtnText: "Palme d'Or" },
        {
          subBtnValue: "un_certain_regard",
          subBtnText: "Un Certain Regard",
        },
      ],
    },
    oscar: {
      source: oscar,
      title: "奧斯卡金像獎",
      arr: [{ subBtnValue: "best_film", subBtnText: "Best Film" }],
    },
    goldenHorse: {
      source: goldenHorse,
      title: "金馬獎",
      arr: [
        { subBtnValue: "best_film", subBtnText: "Best Film" },
        {
          subBtnValue: "best_actress",
          subBtnText: "Best actress",
        },
      ],
    },
  };

  //  render main button
  const mainBtn = mainBtnData.map((data) => (
    <button
      key={nanoid()}
      type="button"
      value={data.value}
      onClick={selectFilmList}
    >
      {data.btnText}
    </button>
  ));

  const arr = [];
  let count = 3 - props.listState.length;
  for (let i = 1; i <= count; i++) {
    let subBtn = subBtnVal["index-" + i];

    arr.push(
      <div className={styles.fesTitle}>
        <div className={styles.addBtn}>+</div>
        <span>選擇影展及獎項</span>
        <div className={styles.option}>
          {mainBtn}
          <div className={styles.subBtn} name={"index-" + i}>
            {subBtn === ""
              ? null
              : subBtnData[subBtn].arr.map((data) => (
                  <button
                    key={nanoid()}
                    type="button"
                    onClick={selectPrize}
                    value={data.subBtnValue}
                    data-title={subBtnData[subBtn].title}
                  >
                    {data.subBtnText}
                  </button>
                ))}
          </div>
        </div>
      </div>
    );
  }

  // 選擇影展，並設定影展值（filmList）
  function selectFilmList(e) {
    // let btn = e.currentTarget;
    // btn.classList.add(styles.currentBtn);
    // console.log(btn);
    let btnValue = e.target.value;
    let subBtnBox = e.target.parentElement.lastChild;
    let name = subBtnBox.getAttribute("name");

    // 按鈕切換
    switch (btnValue) {
      case "cannes":
        setSubBtnVal({
          ...subBtnVal,
          [name]: "cannes",
        });
        break;

      case "oscar":
        setSubBtnVal({
          ...subBtnVal,
          [name]: "oscar",
        });
        break;

      case "goldenHorse":
        setSubBtnVal({
          ...subBtnVal,
          [name]: "goldenHorse",
        });
        break;

      default:
        setSubBtnVal({
          ...subBtnVal,
          [name]: "",
        });
    }

    props.setFilmList(subBtnData[btnValue].source);
  }

  // 選擇獎項，並設定獎項值（prize）
  function selectPrize(e) {
    let btnValue = e.target.value;

    // 若filmList、prize不為空值，將當前值傳入obj，並push進listState 裡
    if (props.filmList !== "") {
      let btnSelect = {
        title: e.target.dataset.title,
        prize_name: e.target.innerText,
        film_list: props.filmList,
        prize: btnValue,
        order: props.yearlist[0].list.length,
      };

      //若 listState 中超過三個清單，則不加入 listState
      if (props.listState.length < 3) {
        const newListState = [...props.listState, btnSelect];
        props.setlistState(newListState);
      }
      // reset btn value
      props.setFilmList("");
    }

    let subBtnBox = e.target.parentElement;
    let name = subBtnBox.getAttribute("name");

    // 關掉獎項按鈕
    setSubBtnVal({
      ...subBtnVal,
      [name]: "",
    });
  }

  function close(e) {
    let order = Number(e.target.dataset.order);
    let arr = [...props.listState];

    if (order === 0) {
      if (arr.length === 1) {
        arr.splice(order, 1);
        props.setlistState(arr);
        return;
      } else {
        arr[1].order = 0;
        if (arr.length === 3) {
          arr[2].order = 1;
        }
      }
    } else if (order === 1) {
      if (arr.length === 3) {
        arr[2].order = 1;
      }
    }
    props.setVertical(100);
    arr.splice(order, 1);
    props.setlistState(arr);
  }

  const title = props.listState.map((data) => (
    <div className={styles.fesTitle} key={nanoid()}>
      <div className={styles.closeBtn} onClick={close} data-order={data.order}>
        ×
      </div>
      <span>{data.title}</span>
      <span>{data.prize_name}</span>
    </div>
  ));

  return (
    <div className={styles.movieFilter}>
      <div className={styles.titleBox}>
        {title}
        {arr}
      </div>
      <div className={styles.loginBtn}>
        <svg
          id="login"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="40"
          height="40"
        >
          <path d="M0,50A49.91,49.91,0,0,1,50.35,0C77.4,0,99.93,22.48,99.94,49.52c0,28-22.16,50.42-49.8,50.42A49.92,49.92,0,0,1,0,50ZM85.11,78.25C99.39,61.11,99.26,33,79.43,15.71a45.05,45.05,0,0,0-65,6.35C-1,41.65,4.12,66.36,15,78.19l.37-1.38c3.28-11.83,10.62-20,22-24.55a3.66,3.66,0,0,1,2.58.15,22.38,22.38,0,0,0,19.88,0,3.17,3.17,0,0,1,2.78-.17A35.29,35.29,0,0,1,82.89,71.85C83.76,73.89,84.36,76.05,85.11,78.25Z" />
          <path d="M67.81,32.09A17.84,17.84,0,1,1,50.09,14.3,17.8,17.8,0,0,1,67.81,32.09Z" />
        </svg>
        {/* <div>LOGIN</div> */}
      </div>
    </div>
  );
}

export default MovieFilter;
