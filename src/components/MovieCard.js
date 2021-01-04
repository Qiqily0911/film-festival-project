import React from "react";
import styles from "../style/MovieCard.module.scss";
import { loadMovieData, addLiked, cancelLiked } from "../utils";

import { ReactComponent as Bookmark } from "../image/icon/add.svg";
import { ReactComponent as Nopic } from "../image/icon/no-pic.svg";

function MovieCard(props) {
  const obj = {
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
    <div className={styles.movieCard} style={{ cursor: "default" }}>
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
      style={{ margin: props.memberPage ? "20px" : "" }}
      key={props.listData.movie_id}
      onClick={() => {
        const tmdbId = props.listData.tmdb_id;
        const imdbId = props.listData.movie_id;
        props.resetInfoPosition();
        loadMovieData(tmdbId, imdbId, props.listData, props.setMovieData);
      }}
    >
      {props.userId ? (
        <Bookmark
          className={props.isLiked ? styles.addBtn : styles.cancelBtn}
          data-id={props.listData.movie_id}
          onClick={(e) => {
            const tmdbId = props.listData.tmdb_id;

            props.isLiked
              ? cancelLiked(e, props.likedList, "movie_liked", tmdbId)
              : addLiked(e, "movie_liked", obj);
          }}
        />
      ) : (
        ""
      )}

      <div className={styles.posterBox}>
        {props.listData.poster_path === null ||
        props.listData.poster_path === undefined ? (
          <div className={styles.noPoster}>
            <Nopic />
          </div>
        ) : (
          <img
            alt="poster"
            src={`https://image.tmdb.org/t/p/w342${props.listData.poster_path}`}
          />
        )}
      </div>

      <div className={styles.basicInfo}>
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
