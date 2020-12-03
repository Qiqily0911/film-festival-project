import React from "react";
import styles from "../style/YearList.module.scss";
import MovieCard from "./MovieCard";
import { nanoid } from "nanoid";

function YearList(props) {
  function close(e) {
    let order = Number(e.target.dataset.order);
    console.log(order);
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

  const showYearList = props.yearlist.map((yearbox) => {
    const moviePrize = yearbox.list.map((data) => data[0].prize);
    if (moviePrize.find((data) => data !== null) === undefined) {
      return null;
    } else {
      //  console.log(yearbox.year);
      return (
        <div key={nanoid()} className={styles.yearBox} data-year={yearbox.year}>
          {yearbox.list.map((data) => {
            return (
              <MovieCard
                renewData={props.renewData}
                tmdbApi={props.tmdbApi}
                omdbApi={props.omdbApi}
                //  imdbRating={props.imdbRating}
                key={nanoid()}
                th={data[0].th}
                year={data[0].year}
                prize={data[0].prize}
                atmovie_link={data[0].atmovie_link}
                imdb_link={data[0].imdb_link}
                movie_id={data[0].movie_id}
                film_name_zh={data[0].film_name_zh}
                film_name_en={data[0].film_name_en}
                poster_path={data[0].poster_path}
              />
            );
          })}
        </div>
      );
    }
  });

  return (
    <div>
      <div className={styles.titleBox}>{title}</div>

      <div className={styles.YearListBox}>
        <div className={styles.YearList}>{showYearList}</div>
      </div>
    </div>
  );
}

export default YearList;
