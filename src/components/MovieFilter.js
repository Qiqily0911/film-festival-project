import React, { useEffect, useState } from "react";
import styles from "../style/MovieFilter.module.scss";
import { nanoid } from "nanoid";
import oscar from "../oscar_best_film.json";
import cannes from "../CannesFilm.json";
import goldenHorse from "../golden_horse_best_film.json";

function MovieFilter(props) {
  const [addList, setAddList] = useState([]);
  const [subBtnVal, setSubBtnVal] = useState("");

  useEffect(() => {
    function addListBtn() {
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

      const arr = [];
      let count = 3 - props.listState.length;
      console.log(count);
      for (let i = 1; i <= count; i++) {
        arr.push(
          <div className={styles.fesTitle}>
            <div className={styles.closeBox}>+</div>

            {mainBtn}
            <div>
              {subBtnVal === ""
                ? null
                : subBtnData[subBtnVal].arr.map((data) => (
                    <button
                      key={nanoid()}
                      type="button"
                      onClick={selectPrize}
                      value={data.subBtnValue}
                      data-title={subBtnData[subBtnVal].title}
                    >
                      {data.subBtnText}
                    </button>
                  ))}
            </div>
          </div>
        );
      }

      setAddList(arr);
    }

    addListBtn();
  }, [props.listState, subBtnVal]);

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

    props.setFilmList(subBtnData[btnValue].source);
  }

  // 選擇獎項，並設定獎項值（prize）
  function selectPrize(e) {
    let btnValue = e.target.value;

    // console.log(listState);
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
        // renderListState();
      }
      // reset btn value
      props.setFilmList("");
    }

    // 關掉獎項按鈕
    setSubBtnVal("");
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

    arr.splice(order, 1);
    console.log(arr);
    props.setlistState(arr);
  }

  const title = props.listState.map((data) => (
    <div className={styles.fesTitle}>
      <div className={styles.closeBox} onClick={close} data-order={data.order}>
        X
      </div>
      {data.title} <span>{data.prize_name}</span>
    </div>
  ));

  return (
    <div className={styles.movieFilter}>
      <div className={styles.titleBox}>
        {title}
        {addList}
      </div>
    </div>
  );
}

export default MovieFilter;
