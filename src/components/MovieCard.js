import React, { useEffect, useState } from "react";
import styles from "../style/MovieCard.module.scss";
import { ReactComponent as Bookmark } from "../image/icon/add.svg";
// import { firestore } from "../config";
// const movieLiked = firestore.collection("movie_liked");

function MovieCard(props) {
  // 加入收藏，在firestore加入資料

  let obj = {
    user: props.userId,
    movie_id: props.listData.movie_id,
    tmdb_id: props.listData.tmdb_id,
    data_id: props.listData.data_id,
    poster_path: props.listData.poster_path,
    film_name_en: props.listData.film_name_en,
    film_name_zh: props.listData.film_name_zh,
    time: new Date(),
    year: props.listData.year,
  };

  const notFound = (
    <div className={styles.movieCard}>
      <div className={styles.notFound}></div>
      <div className={styles.basicInfo}>
        <div>
          <div className={styles.titleZh}>尚無資料</div>
        </div>
      </div>
    </div>
  );

  const hasCard = (
    <div
      className={styles.movieCard}
      key={props.listData.movie_id}
      onClick={() => {
        let movieId = props.listData.tmdb_id;
        // console.log(props.listData);
        props.setLoadingOpen(true);

        Promise.all([
          props.tmdbApi("", movieId),
          props.tmdbApi("/videos", movieId),
          props.tmdbApi("/images", movieId),
          props.tmdbApi("/credits", movieId),
          props.movie_id !== "" ? props.omdbApi(props.listData.movie_id) : "",
          props.tmdbApi("/translations", movieId),
        ]).then((arr) => {
          props.setMovieData({
            ...props.movieData,
            detail: arr[0],
            video: arr[1],
            images: arr[2],
            credits: arr[3],
            localData: props.listData,
            omdbData: arr[4],
            overview_translate: arr[5],
          });
          //  console.log(arr[5]);
        });

        props.setInfoBox(true);

        // FIXME: can work but slow
        //  props.imdbRating(movieId);
      }}
    >
      {/* add to movie list */}
      {props.userId ? (
        <Bookmark
          className={props.isLiked ? styles.addBtn : styles.cancelBtn}
          data-id={props.listData.movie_id}
          onClick={(e) =>
            props.isLiked
              ? props.cancelLiked(e, props.listData.tmdb_id)
              : props.addLiked(e, obj)
          }
        />
      ) : (
        ""
      )}

      <div className={styles.posterBox}>
        {props.listData.poster_path === null ||
        props.listData.poster_path === undefined ? (
          // if poster_path was null
          <div className={styles.noPoster}>
            <p>Poster not found</p>
          </div>
        ) : (
          // if data has poster_path, then render the picture
          <img
            alt="poster"
            src={`https://image.tmdb.org/t/p/w342${props.listData.poster_path}`}
          />
        )}
      </div>

      <div className={styles.basicInfo}>
        {/* <div className={styles.th}>{ordinalSuffix(props.th)}</div> */}
        <div>
          <div className={styles.titleEn}>{props.listData.film_name_en}</div>
          <div className={styles.titleZh}>{props.listData.film_name_zh}</div>
        </div>
      </div>
    </div>
  );

  return props.listData.prize === null ? notFound : hasCard;
}

export default React.memo(MovieCard);
