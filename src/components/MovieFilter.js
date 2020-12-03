import React, { useState } from "react";
import styles from "../style/MovieFilter.module.scss";
import { nanoid } from "nanoid";
import oscar from "../oscar_best_film.json";
import cannes from "../CannesFilm.json";
import goldenHorse from "../golden_horse_best_film.json";

function MovieFilter(props) {
  const [subBtnVal, setSubBtnVal] = useState("");

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

  const subBtnData = {
    cannes: {
      source: cannes,
      title: "坎城影展",
      arr: [
        { subBtnValue: "palme_d_or", subBtnText: "Palme d'Or 金棕櫚獎" },
        {
          subBtnValue: "un_certain_regard",
          subBtnText: "Un Certain Regard 一種注目",
        },
      ],
    },
    oscar: {
      source: oscar,
      title: "奧斯卡金像獎",
      arr: [{ subBtnValue: "best_film", subBtnText: "Best Film 最佳影片" }],
    },
    goldenHorse: {
      source: goldenHorse,
      title: "金馬獎",
      arr: [
        { subBtnValue: "best_film", subBtnText: "Best Film 最佳影片" },
        {
          subBtnValue: "best_actress",
          subBtnText: "Best actress 最佳女主角",
        },
      ],
    },
  };

  // 選擇影展，並設定影展值（filmList）
  function selectFilmList(e) {
    let btnValue = e.target.value;

    //   console.log(btnValue);

    // 按鈕切換
    switch (btnValue) {
      case "cannes":
        setSubBtnVal("cannes");
        break;

      case "oscar":
        setSubBtnVal("oscar");
        break;

      case "goldenHorse":
        setSubBtnVal("goldenHorse");
        break;

      default:
        setSubBtnVal("");
    }

    //   console.log(subBtnData[btnValue].source);
    props.setFilmList(subBtnData[btnValue].source);
  }

  // 選擇獎項，並設定獎項值（prize）
  function selectPrize(e) {
    let btnValue = e.target.value;

    // console.log(listState);
    // 若filmList、prize不為空值，將當前值傳入obj，並push進listState 裡
    console.log(props.filmList);
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
        // renderListState();
      } else {
        alert("!!");
      }
      // reset btn value
      props.setFilmList("");
    }

    // 關掉獎項按鈕
    setSubBtnVal("");
  }

  return (
    <div>
      <div className={styles.movieFilter}>
        {mainBtn}
        <div>
          {subBtnVal === "" ? (
            <div></div>
          ) : (
            subBtnData[subBtnVal].arr.map((data) => (
              <button
                key={nanoid()}
                type="button"
                onClick={selectPrize}
                value={data.subBtnValue}
                data-title={subBtnData[subBtnVal].title}
              >
                {data.subBtnText}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieFilter;
