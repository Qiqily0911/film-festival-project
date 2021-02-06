import React from "react";
import styles from "../../style/MovieCard.module.scss";
import { loadMovieData, addLiked, cancelLiked } from "../../utils";
import { ReactComponent as Bookmark } from "../../image/icon/add.svg";
import { ReactComponent as Nopic } from "../../image/icon/no-pic.svg";
import { useSelector, useDispatch } from "react-redux";
import { setMovieData } from "../../globalState/actions";

function MovieCard(props) {
  const dispatch = useDispatch();
  const userLike = useSelector((state) => state.userLike);
  const obj = {
    user: userLike.user.uid,
    movie_id: props.data.movie_id,
    tmdb_id: props.data.tmdb_id,
    data_id: props.data.data_id,
    poster_path: props.data.poster_path,
    film_name_en: props.data.film_name_en,
    film_name_zh: props.data.film_name_zh,
    time: new Date(),
    year: props.data.year,
  };

  return (
    <div
      className={styles.movieCard}
      style={{ margin: props.memberPage ? "20px" : "" }}
      key={props.data.movie_id}
      onClick={() => {
        const tmdbId = props.data.tmdb_id;
        const imdbId = props.data.movie_id;
        props.setMovieInfoOpen(true);
        props.resetInfoPosition();
        const setMovieDataReducer = (arr) => dispatch(setMovieData(arr));
        loadMovieData(tmdbId, imdbId, props.data, setMovieDataReducer);
      }}
    >
      {userLike.user.uid && (
        <Bookmark
          className={props.isLiked ? styles.addBtn : styles.cancelBtn}
          data-id={props.data.movie_id}
          onClick={(e) => {
            const tmdbId = props.data.tmdb_id;

            props.isLiked
              ? cancelLiked(e, userLike.movieList, "movie_liked", tmdbId)
              : addLiked(e, "movie_liked", obj);
          }}
        />
      )}

      <div className={styles.posterBox}>
        {props.data.poster_path === null ||
        props.data.poster_path === undefined ? (
          <div className={styles.noPoster}>
            <Nopic />
          </div>
        ) : (
          <img
            alt="poster"
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w342${props.data.poster_path}`}
          />
        )}
      </div>

      <div className={styles.basicInfo}>
        <div>
          <div className={styles.titleEn}>{props.data.film_name_en}</div>
          <div className={styles.titleZh}>{props.data.film_name_zh}</div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MovieCard);
