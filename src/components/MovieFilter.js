import React, { useState } from "react";
import styles from "../style/MovieFilter.module.scss";
import { nanoid } from "nanoid";
import oscar from "../data/oscar_best_film.json";
import cannes from "../data/CannesFilm.json";
import goldenHorse from "../data/golden_horse_best_film.json";

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

  const selection = (
    <div className={styles.option}>
      {mainBtnData.map((data, i) => (
        <div key={i}>
          <button type="button" value={data.value} onClick={selectFilmList}>
            {data.btnText}
          </button>
          <div data-sub={data.value}></div>
        </div>
      ))}
      {/* <div className={styles.subBtn}> */}
      {/* FIXME 改寫filter btn */}
      {/* <div className={styles.subBtn} name={"index-" + i}> */}
      {/* {subBtn === ""
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
                 ))} */}
      {/* </div> */}
    </div>
  );

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

    arr[order] = { film_list: undefined, order: order };

    // props.setVertical(100);
    props.setlistState(arr);
    console.log(props.listState);
  }

  const title = props.listState.map((data, i) => (
    <div className={styles.fesTitle} key={i}>
      {data.film_list !== undefined ? (
        <div>
          <div
            className={styles.closeBtn}
            onClick={close}
            data-order={data.order}
          >
            ×
          </div>
          <span>{data.title}</span>
          <span>{data.prize_name}</span>
        </div>
      ) : (
        <div>
          <div className={styles.closeBtn} data-order={data.order}>
            ×
          </div>
          <span>選擇影展及獎項</span>
          {selection}
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
