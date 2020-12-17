import React, { useState, useEffect } from "react";
import styles from "../style/PrizeInfo.module.scss";
// import OscarLogo from "../data/logo/oscar_logo.png";
// import CannesLogo from "../data/logo/Cannes_logo.png";
// import BerlinLogo from "../data/logo/Berlin_logo.png";
// import GoldenHorseLogo from "../data/logo/Golden_Horse.png";

function PrizeInfo(props) {
  // {
  //     title: "奧斯卡金像獎",
  //     prize_name: "Best Film",
  //     film_list: oscar,
  //     prize: "best_film",
  //     logo: OscarLogo,
  //     order: 0,
  //   },

  //    "th": 62,
  //    "year": 2009,
  //    "prize": "un_certain_regard",
  //    "film_name_zh": "非普通教慾",
  //    "film_name_en": "Canine",
  //    "atmovie_link": "http://app2.atmovies.com.tw/film/fdel21379182/",
  //    "imdb_link": "https://www.imdb.com/title/tt1379182",
  //    "movie_id": "tt1379182",
  //    "poster_path": "/xUnbL2Uoh4zoc1hJvIV6MDDJpka.jpg"

  const year = Math.floor(
    props.vertical * ((props.maxYear - props.minYear) / 100) + props.minYear
  );
  // console.log(year);

  const content = (
    <div className={styles.innerBox}>
      {props.listState.map((list, i) => {
        let templist = list.film_list || [];
        // console.log(templist);
        return (
          <div className={styles.prizeData} key={i}>
            <div className={styles.logo}>
              <img src={list.logo} alt="logo" />
            </div>

            <div className={styles.title}>{list.title}</div>
            <div>
              {/* {list.prize_name!==null} */}
              {templist
                .filter((film) => film.year === year)
                .map((data, j) => (
                  <div
                    data-id={data.movie_id}
                    className={styles.winner}
                    key={j}
                  >
                    <span>{props.ordinalSuffix(data.th)}</span>
                    <div>{data.prize}</div>
                    <div
                      className={styles.filmName}
                      onClick={() => console.log(data.tmdb_id)}
                    >
                      <div>{data.film_name_en}</div>
                      <div>{data.film_name_zh}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className={styles.prizeInfo}
      style={{ right: props.prizeBoxState ? "20px" : "-410px" }}
    >
      <div
        className={styles.handleBar}
        onClick={() =>
          props.prizeBoxState
            ? props.setprizeBox(false)
            : props.setprizeBox(true)
        }
      >
        {year} Film Festival
      </div>
      <div className={styles.outterBox}>{content}</div>
    </div>
  );
}

export default PrizeInfo;
