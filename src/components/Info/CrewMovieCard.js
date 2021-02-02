import React from "react";
import styles from "../../style/Crew.module.scss";
import { ReactComponent as Bookmark } from "../../image/icon/add.svg";
import { ReactComponent as Nopic } from "../../image/icon/no-pic.svg";
import { dataApi, addLiked, cancelLiked } from "../../utils";
import { useSelector, useDispatch } from "react-redux";

function CrewMovieCard(props) {
  const likeList = useSelector((state) => state.likeList);
  const obj = {
    user: props.userId,
    movie_id: "",
    tmdb_id: props.data.id,
    data_id: "",
    poster_path: props.data.poster_path,
    film_name_en: props.data.title,
    film_name_zh: "",
    time: new Date(),
    year: props.data.release_date && props.data.release_date.split("-")[0],
  };

  const isLiked = Boolean(
    likeList.movieList &&
      likeList.movieList.find((item) => item.tmdb_id === props.data.id)
  );

  return (
    <div
      className={styles.movieCard}
      key={props.data.credit_id}
      value={props.data.id}
    >
      {props.userId && (
        <Bookmark
          className={isLiked ? styles.addBtn : styles.cancelBtn}
          onClick={(e) =>
            isLiked
              ? cancelLiked(e, likeList.movieList, "movie_liked", props.data.id)
              : addLiked(e, "movie_liked", obj)
          }
        />
      )}

      <div
        className={styles.poster}
        onClick={() => {
          Promise.all([
            dataApi("tmdb", "movie", "", props.data.id),
            dataApi("tmdb", "movie", "/translations", props.data.id),
          ])
            .then((arr) => {
              props.setCrewMovieData({
                ...props.crewMovieData,
                detail: arr[0],
                overview_translate: arr[1],
              });
            })
            .then(props.setInfoOpen(true));

          props.overviewEl.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      >
        {props.data.poster_path !== null ? (
          <img
            alt="poster"
            src={`https://image.tmdb.org/t/p/w154${props.data.poster_path}`}
          />
        ) : (
          <div className={styles.noPic}>
            <Nopic />
          </div>
        )}
      </div>
      <div className={styles.basicInfo}>
        <div>
          {props.data.release_date && props.data.release_date.split("-")[0]}
        </div>
        <div>{props.data.title}</div>
      </div>
    </div>
  );
}

export default React.memo(CrewMovieCard);
