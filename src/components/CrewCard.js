import React, { useState, useEffect } from "react";
import styles from "../style/Crew.module.scss";
import { ReactComponent as Bookmark } from "../image/icon/add.svg";

export default function CrewCard(props) {
  //  console.log(props.data);
  let obj = {
    user: props.userId,
    movie_id: "",
    tmdb_id: props.data.id,
    data_id: "",
    poster_path: props.data.poster_path,
    film_name_en: props.data.title,
    film_name_zh: "",
    time: new Date(),
    year:
      props.data.release_date !== undefined
        ? props.data.release_date.split("-")[0]
        : "",
  };

  const isLiked = Boolean(
    props.likedList &&
      props.likedList.find((item) => item.tmdb_id === props.data.id)
  );

  return (
    <div
      className={styles.movieCard}
      key={props.data.credit_id}
      value={props.data.id}
    >
      {/* ------- keetTag --------*/}
      {props.userId ? (
        <Bookmark
          className={isLiked ? styles.addBtn : styles.cancelBtn}
          //    data-id={props.movie_id}
          onClick={(e) =>
            isLiked
              ? props.cancelLiked(e, props.data.id)
              : props.addLiked(e, obj)
          }
        />
      ) : (
        ""
      )}
      {/* ------- keetTag --------*/}

      <div
        className={styles.poster}
        onClick={() => {
          Promise.all([
            props.tmdbApi("", props.data.id),
            props.tmdbApi("/translations", props.data.id),
          ]).then((arr) => {
            props.setCrewMovieData({
              ...props.crewMovieData,
              detail: arr[0],
              overview_translate: arr[1],
            });
          });
          props.setInfoOpen(true);
        }}
      >
        {/* {console.log(props.data)} */}
        {props.data.poster_path !== null ? (
          <img
            alt="poster"
            src={`https://image.tmdb.org/t/p/w154${props.data.poster_path}`}
          />
        ) : (
          <div className={styles.noPic}></div>
        )}
      </div>
      <div className={styles.basicInfo}>
        <div>
          {props.data.release_date !== undefined
            ? props.data.release_date.split("-")[0]
            : ""}
        </div>
        <div>{props.data.title}</div>
      </div>
    </div>
  );
}
