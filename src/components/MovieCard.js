import React from "react";
import styles from "../style/MovieCard.module.scss";

function MovieCard(props) {
  function ordinalSuffix(i) {
    var j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }

  if (props.prize === null) {
    return (
      <div className={styles.noData}>
        <div className={styles.posterBox}></div>not found
      </div>
    );
  } else {
    return (
      <div
        className={styles.movieCard}
        key={props.movie_id}
        onClick={() => {
          let movieId = props.movie_id;
          props.tmdbApi("", movieId);
          props.tmdbApi("/videos", movieId);
          props.tmdbApi("/images", movieId);
          props.tmdbApi("/credits", movieId);

          props.omdbApi(movieId);
          props.renewData(props);
          // FIXME: can work but slow
          //  props.imdbRating(movieId);
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
              src={`https://image.tmdb.org/t/p/w342${props.poster_path}`}
            />
          )}
        </div>

        <div className={styles.basicInfo}>
          <div>{ordinalSuffix(props.th)}</div>
          <div className={styles.titleEn}>{props.film_name_en}</div>
          <div className={styles.titleZh}>{props.film_name_zh}</div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
