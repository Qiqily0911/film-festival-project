import React from "react";
import styles from "../style/MovieCard.module.scss";
// import { firestore } from "../config";

function MovieCard(props) {
  function addList(e) {
    e.preventDefault();
    console.log(props.user);
    // let users = firestore.collection("users");
    // users.where("uid", "==");
  }

  if (props.prize === null) {
    return (
      <div className={styles.movieCard}>
        <div className={styles.posterBox}>
          <div className={styles.notFound}></div>
        </div>
        <div className={styles.basicInfo}>
          <div>
            <div className={styles.titleZh}>No Data</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={styles.movieCard}
        key={props.movie_id}
        data-id={props.movie_id}
        onClick={(e) => {
          let movieId = props.movie_id;
          props.tmdbApi("", movieId);
          props.tmdbApi("/videos", movieId);
          props.tmdbApi("/images", movieId);
          props.tmdbApi("/credits", movieId);

          props.omdbApi(movieId);
          props.renewData(props);
          console.log(e.currentTarget.dataset.id);
          // FIXME: can work but slow
          //  props.imdbRating(movieId);
        }}
      >
        {/* add to movie list */}
        <div className={styles.keepTag} onClick={addList}></div>
        <div className={styles.posterBox}>
          {props.poster_path === null ? (
            // if poster_path was null
            <div className={styles.notFound}>
              <p>poster not found</p>
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
  }
}

export default MovieCard;
