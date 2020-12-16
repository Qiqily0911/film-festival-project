import React, { useEffect, useState } from "react";
import styles from "../style/MovieCard.module.scss";
// import { firestore } from "../config";
// const movieLiked = firestore.collection("movie_liked");

function MovieCard(props) {
  // 加入收藏，在firestore加入資料
  let obj = {
    user: props.userId,
    movie_id: props.movie_id,
    tmdb_id: props.tmdb_id,
    poster_path: props.poster_path,
    film_name_en: props.film_name_en,
    film_name_zh: props.film_name_zh,
  };

  console.log("--render all movie cards--");
  const notFound = <div className={styles.notFound}></div>;

  const hasCard = (
    <div
      className={styles.movieCard}
      key={props.movie_id}
      // data-id={props.movie_id}
      onClick={() => {
        let movieId = props.movie_id;
        props.tmdbApi("", movieId);
        props.tmdbApi("/videos", movieId);
        props.tmdbApi("/images", movieId);
        props.tmdbApi("/credits", movieId);

        props.omdbApi(movieId);
        props.renewData(props);
        props.setInfoBox(true);
        // FIXME: can work but slow
        //  props.imdbRating(movieId);
      }}
    >
      {/* add to movie list */}
      {props.userId ? (
        <div
          style={{
            borderColor: props.isLiked
              ? "transparent #D8AE00 transparent transparent"
              : "transparent  #00000050 transparent transparent",
          }}
          className={styles.keepTag}
          data-id={props.movie_id}
          onClick={(e) =>
            props.isLiked
              ? props.cancelLiked(e, props.movie_id)
              : props.addLiked(e, obj)
          }
        ></div>
      ) : (
        ""
      )}

      <div className={styles.posterBox}>
        {props.poster_path === null || props.poster_path === undefined ? (
          // if poster_path was null
          <div className={styles.noPoster}>
            <p>Poster not found</p>
          </div>
        ) : (
          // if data has poster_path, then render the picture
          <img
            alt="poster"
            src={`https://image.tmdb.org/t/p/w342${props.poster_path}`}
          />
        )}
      </div>

      <div className={styles.basicInfo}>
        {/* <div className={styles.th}>{ordinalSuffix(props.th)}</div> */}
        <div>
          <div className={styles.titleEn}>{props.film_name_en}</div>
          <div className={styles.titleZh}>{props.film_name_zh}</div>
        </div>
      </div>
    </div>
  );

  return props.prize === null ? notFound : hasCard;
}

export default React.memo(MovieCard);
