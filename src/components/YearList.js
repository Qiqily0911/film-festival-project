import React, { useState, useEffect } from "react";
import styles from "../style/YearList.module.scss";
import MovieCard from "./MovieCard";
// import { nanoid } from "nanoid";
// import { firestore } from "../config";

function YearList(props) {
  const [showList, setShowList] = useState("");
  //  console.log(props.yearlist);
  // render 電影卡片（無狀態）
  useEffect(() => {
    const showYearList = props.yearlist.map((yearbox, i) => {
      const moviePrize = yearbox.list.map((data) => data[0].prize);

      if (moviePrize.find((data) => data !== null) === undefined) {
        return null;
      } else {
        return (
          <div
            key={i}
            ref={props.yearListRefs[yearbox.year]}
            className={styles.yearBox}
            data-index={yearbox.year}
          >
            {/* {console.log(likedList)} */}
            {yearbox.list.map((data, j) => {
              const isLiked =
                props.likedList &&
                props.likedList.find(
                  (item) => item.movie_id === data[0].movie_id
                );

              return (
                <MovieCard
                  renewData={props.renewData}
                  tmdbApi={props.tmdbApi}
                  omdbApi={props.omdbApi}
                  //  imdbRating={props.imdbRating}
                  key={j}
                  th={data[0].th}
                  year={data[0].year}
                  prize={data[0].prize}
                  atmovie_link={data[0].atmovie_link}
                  imdb_link={data[0].imdb_link}
                  movie_id={data[0].movie_id}
                  tmdb_id={data[0].tmdb_id}
                  film_name_zh={data[0].film_name_zh}
                  film_name_en={data[0].film_name_en}
                  poster_path={data[0].poster_path}
                  isLiked={Boolean(isLiked)}
                  userId={props.userId}
                  setInfoBox={props.setInfoBox}
                  likedList={props.likedList}
                  addLiked={props.addLiked}
                  cancelLiked={props.cancelLiked}

                  // memberPage={props.memberPage}
                />
              );
            })}
          </div>
        );
      }
    });

    // find the min year of yearList
    if (props.listState.length !== 0) {
      for (let i = showYearList.length; i > 0; i--) {
        if (showYearList[i] !== undefined && showYearList[i] !== null) {
          let min = showYearList[i].props["data-index"];
          props.setMin(min);
          break;
        }
      }
    }

    // find the max year of yearList
    if (props.listState.length !== 0) {
      for (let i = 0; i < showYearList.length; i++) {
        if (showYearList[i] !== undefined && showYearList[i] !== null) {
          let max = showYearList[i].props["data-index"];
          props.setMax(max);
          break;
        }
      }
    }

    setShowList(showYearList);
  }, [props.yearlist, props.likedList]);

  // 偵測滾動事件，並改變滑桿數值
  function detect() {
    if (props.isScroll) {
      let a = props.maxYear - props.minYear + 1;
      let b = props.yearListRefs[props.minYear].current.getBoundingClientRect();
      let c = a * b.height;
      let d = Math.floor(((b.bottom - 100) / c) * 100);
      props.setVertical(d);
    }
    console.log("...scroll...");
  }

  return (
    <div className={styles.yearListBox} onWheel={detect}>
      <div className={styles.yearList}>
        {/* render movieCard */}
        {showList}
      </div>
    </div>
  );
}

export default YearList;
