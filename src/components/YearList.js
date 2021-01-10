import React, { useEffect } from "react";
import styles from "../style/YearList.module.scss";
import MovieCard from "./MovieCard";
import { dynamicHeightPercentage } from "../utils";

function YearList(props) {
  useEffect(() => {
    if (props.listState.every((item) => !item.film_list)) {
      props.slider.current.style.visibility = "hidden";
    } else {
      props.slider.current.style.visibility = "visible";
      const arr = props.listState.map(
        (item) => item.film_list && item.film_list.map((film) => film.year)
      );

      const max = [];
      const min = [];

      arr.forEach((list) => {
        list && max.push(Math.max(...list));
        list && min.push(Math.min(...list));
      });

      props.setYear({
        ...props.year,
        max: Math.max(...max),
        min: Math.min(...min),
      });
    }
  }, [props.yearlist]);

  function detectScroll() {
    if (props.isScroll) {
      const percentage = dynamicHeightPercentage(
        props.year.max,
        props.year.min,
        props.yearListRefs
      );
      props.setPercentValue(percentage);
    }
  }

  const isLiked = (data) =>
    props.likedList &&
    props.likedList.find((item) => item.movie_id === data[0].movie_id);
  const listData = (data) => {
    return {
      th: data[0].th,
      year: data[0].year,
      prize: data[0].prize,
      atmovie_link: data[0].atmovie_link,
      imdb_link: data[0].imdb_link,
      movie_id: data[0].movie_id,
      tmdb_id: data[0].tmdb_id,
      data_id: data[0].data_id,
      film_name_zh: data[0].film_name_zh,
      film_name_en: data[0].film_name_en,
      poster_path: data[0].poster_path,
    };
  };

  return (
    <div className={styles.yearListBox} onWheel={detectScroll}>
      <div className={styles.yearList}>
        {props.yearlist.map((yearbox, i) =>
          yearbox.list
            .map((filmData) => filmData[0].prize)
            .every((data) => data === null) ? null : (
            <div
              key={i}
              ref={props.yearListRefs[yearbox.year]}
              className={styles.yearBox}
            >
              <div className={styles.yearTitle}>
                <div className={styles.line}></div>
                <span>{yearbox.year}</span>
                <div className={styles.line}></div>
              </div>
              <div className={styles.cardWrap}>
                {yearbox.list.map((data, j) => (
                  <MovieCard
                    setMovieInfoOpen={props.setMovieInfoOpen}
                    setMovieData={props.setMovieData}
                    movieData={props.movieData}
                    key={j}
                    listData={listData(data)}
                    isLiked={Boolean(isLiked(data))}
                    userId={props.userId}
                    likedList={props.likedList}
                    setLoadingOpen={props.setLoadingOpen}
                    resetInfoPosition={props.resetInfoPosition}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default YearList;
