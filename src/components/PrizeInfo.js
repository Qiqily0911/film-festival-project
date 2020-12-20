import React, { useState, useEffect } from "react";
import { BtnData } from "../data/BtnData";
import { ReactComponent as Arrow } from "../image/icon/arrow.svg";
import styles from "../style/PrizeInfo.module.scss";

function PrizeInfo(props) {
  const year = Math.floor(
    props.vertical * ((props.maxYear - props.minYear) / 100) + props.minYear
  );
  const [infoHeight, setHeight] = useState({
    "index-1": "calc(100% / 3)",
    "index-2": "calc(100% / 3)",
    "index-3": "calc(100% / 3)",
  });

  const content = (list, index) => {
    let templist = list.film_list || [];

    // open prize info card and change card height
    function openCard(i) {
      let a = { ...infoHeight };
      if (
        infoHeight[`index-${i + 1}`] === "calc(100% / 3)" ||
        infoHeight[`index-${i + 1}`] === "30px"
      ) {
        Object.keys(a).forEach((key) => (a[key] = "30px"));
        a[`index-${i + 1}`] = "calc(100% - 60px)";
        setHeight(a);
      } else {
        Object.keys(a).forEach((key) => (a[key] = "calc(100% / 3)"));
        setHeight(a);
      }
    }

    // 依據每筆資料的 data_id 找對應名稱
    let prizeId = (dataId) => dataId.substring(dataId.length - 1) - 1;
    let prizeName = (i, data) => BtnData[i].arr[prizeId(data.data_id)];

    for (let i = 0; i < BtnData.length; i++) {
      if (BtnData[i].list_name === list.list_name) {
        return (
          <div
            className={styles.prizeData}
            key={index}
            style={{ height: infoHeight[`index-${index + 1}`] }}
            onClick={() => openCard(index)}
          >
            <div
              className={styles.prizeBlock}
              style={{
                top:
                  infoHeight[`index-${index + 1}`] === "30px" ? "0" : "-30px",
              }}
            >
              <div>{BtnData[i].btnText}</div>
              <div>{BtnData[i].official_name}</div>
            </div>
            {/* {infoHeight[`index-${index + 1}`] === "40px" ?  : ""} */}

            <div className={styles.inner}>
              <div className={styles.logo}>
                <a href={BtnData[i].web_link} target="_blank" rel="noreferrer">
                  <img src={list.logo} alt="logo" />
                </a>
              </div>
              <div className={styles.title}>
                <div>{BtnData[i].btnText}</div>
                <div>{BtnData[i].official_name}</div>
              </div>

              {/* <div>{BtnData[i].description}</div> */}
              <div>
                <div>
                  {templist
                    .filter((film) => film.year === year)
                    .map((data, j) => (
                      <div
                        data-id={data.movie_id}
                        className={styles.winner}
                        key={j}
                      >
                        <div className={styles.prizeName}>
                          <div className={styles.th}>
                            {" "}
                            {props.ordinalSuffix(data.th)}
                          </div>
                          <div>{prizeName(i, data).subBtnName}</div>
                          <div>{prizeName(i, data).subBtnText}</div>
                        </div>

                        <div
                          className={styles.filmName}
                          onClick={(e) => {
                            let movieId = data.tmdb_id;
                            props.tmdbApi("", movieId);
                            props.tmdbApi("/videos", movieId);
                            props.tmdbApi("/images", movieId);
                            props.tmdbApi("/credits", movieId);

                            props.omdbApi(data.movie_id);
                            props.renewData(data);
                            // console.log(props);

                            props.setInfoBox(true);
                            console.log(data.tmdb_id);
                            e.stopPropagation();
                          }}
                        >
                          <div>{data.film_name_zh}</div>
                          <div>{data.film_name_en}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div
      className={styles.prizeInfo}
      style={{ right: props.prizeBoxState ? "450px" : "30px" }}
    >
      <div
        className={styles.handleBar}
        onClick={() => {
          if (props.infoBoxState === true) {
            props.prizeBoxState
              ? props.setprizeBox(false)
              : props.setprizeBox(true);
          }
        }}
      >
        <Arrow
          className={styles.arrow}
          style={{
            transform: props.prizeBoxState ? "rotate(0deg)" : "rotate(180deg)",
          }}
        />
        <span>{year}</span> Film Festival
      </div>
      <div className={styles.outterBox}>
        <div className={styles.innerBox}>
          {props.listState.map((list, i) => content(list, i))}
        </div>
      </div>
    </div>
  );
}

export default PrizeInfo;
