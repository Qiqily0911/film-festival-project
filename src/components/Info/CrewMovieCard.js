import React from "react";
import styles from "../../style/Crew.module.scss";
import { ReactComponent as Bookmark } from "../../image/icon/add.svg";
import { ReactComponent as Nopic } from "../../image/icon/no-pic.svg";
import { dataApi, addLiked, cancelLiked } from "../../utils";
import { useSelector, useDispatch } from "react-redux";

function CrewMovieCard(props) {
  const userLike = useSelector((state) => state.userLike);
  const obj = {
    user: userLike.user.uid,
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
    userLike.movieList &&
      userLike.movieList.find((item) => item.tmdb_id === props.data.id)
  );

  function getData() {
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
  }

  return (
    <div
      className={styles.movieCard}
      key={props.data.credit_id}
      value={props.data.id}
    >
      {userLike.user.uid && (
        <Bookmark
          className={isLiked ? styles.addBtn : styles.cancelBtn}
          onClick={(e) =>
            isLiked
              ? cancelLiked(e, userLike.movieList, "movie_liked", props.data.id)
              : addLiked(e, "movie_liked", obj)
          }
        />
      )}

      <div className={styles.poster} onClick={getData}>
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
