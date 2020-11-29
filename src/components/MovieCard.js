import React from "react";
import styles from "../style/MovieCard.module.scss";

function MovieCard(props) {
  return (
    <div
      className={styles.movieCard}
      key={props.movie_id}
      onClick={() => {
        let movieId = props.movie_id;
        props.tmdbApi("", movieId);
        props.tmdbApi("/videos", movieId);
        props.tmdbApi("/images", movieId);
        props.renewData(props);
      }}
    >
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
            src={`http://image.tmdb.org/t/p/w342${props.poster_path}`}
          />
        )}
      </div>

      <div className={styles.basicInfo}>
        <div>{props.year}</div>
        <div className={styles.titleEn}>{props.film_name_en}</div>
        <div className={styles.titleZh}>{props.film_name_zh}</div>
      </div>
    </div>
  );
}

export default MovieCard;
