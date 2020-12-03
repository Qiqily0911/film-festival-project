import React, { useEffect, useState } from "react";
import styles from "../style/MovieFilter.module.scss";
import { nanoid } from "nanoid";
import oscar from "../oscar_best_film.json";
import cannes from "../CannesFilm.json";
import goldenHorse from "../golden_horse_best_film.json";

function MovieFilter(props) {
  const [subBtn, setSubBtn] = useState("");
  const [filmList, setFilmList] = useState("");
  const [prize, setPrize] = useState("");

  useEffect(() => {
    console.log(filmList);
    console.log(prize);
  }, [filmList, prize]);

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
      arr: [{ subBtnValue: "best_film", subBtnText: "Best Film 最佳影片" }],
    },
    goldenHorse: {
      source: goldenHorse,
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

    // 開啟獎項按鈕
    let btn = (x) =>
      subBtnData[x].arr.map((data) => (
        <button
          key={nanoid()}
          type="button"
          onClick={selectPrize}
          value={data.subBtnValue}
        >
          {data.subBtnText}
        </button>
      ));

    // 按鈕切換
    switch (btnValue) {
      case "cannes":
        setSubBtn(btn("cannes"));
        break;

      case "oscar":
        setSubBtn(btn("oscar"));
        break;

      case "goldenHorse":
        setSubBtn(btn("goldenHorse"));
        break;

      default:
        setSubBtn("");
    }

    setFilmList(subBtnData[btnValue].source);
  }

  // 選擇獎項，並設定獎項值（prize）
  function selectPrize(e) {
    let btnValue = e.target.value;
    setPrize(btnValue);

    // console.log(listState);
    // 若filmList、prize不為空值，將當前值傳入obj，並push進listState 裡
    if (filmList !== "") {
      let btnSelect = {
        film_list: filmList,
        prize: prize,
        order: props.yearlist[0].list.length,
      };
      //若 listState 中超過三個清單，則不加入 listState
      if (props.listState.length < 3) {
        props.setlistState([...props.listState, btnSelect]);
        console.log(props.listState);
        // renderListState();
      } else {
        alert("!!");
      }
      // reset btn value
      // setFilmList("");
      // setPrize("");
    }

    // 關掉獎項按鈕
    setSubBtn("");
  }

  return (
    <div>
      <div className={styles.movieFilter}>
        {mainBtn}
        <div>{subBtn}</div>
      </div>
    </div>
  );
}

export default MovieFilter;
