import React, { useEffect, useState } from "react";
import styles from "../style/MovieCard.module.scss";
import { firestore } from "../config";
const movieLiked = firestore.collection("movie_liked");

function MovieCard(props) {
  // 加入收藏，在firestore加入資料
  function addLiked(e) {
    console.log(e.currentTarget.dataset["id"]);

    let obj = {
      user: props.userId,
      movie_id: props.movie_id,
      poster_path: props.poster_path,
      film_name_en: props.film_name_en,
      film_name_zh: props.film_name_zh,
    };
    console.log(obj);

    movieLiked
      .add(obj)
      .then((res) => {
        movieLiked.doc(res.id).set({ id: res.id }, { merge: true });
      })
      .then(() => {
        console.log("add movie success!");
      });

    e.stopPropagation();
    console.log("===========");
  }

  // 取消收藏，並恢復原本 keepTag 樣式
  function cancelLiked(e) {
    console.log(props.likedList);
    console.log(e.currentTarget);
    for (let i = 0; i < props.likedList.length; i++) {
      let a = props.movie_id;
      if (a === props.likedList[i].movie_id) {
        console.log(222);
        console.log(props.likedList[i].id);
        movieLiked
          .doc(props.likedList[i].id)
          .delete()
          .then(() => {
            console.log("delete data successful");
            e.stopPropagation();
          });
      }
    }
    e.stopPropagation();
  }

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
          onClick={props.isLiked ? cancelLiked : addLiked}
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
