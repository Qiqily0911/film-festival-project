import React, { useState, useEffect } from "react";
import styles from "../style/MemberPage.module.scss";
import { firestore } from "../config";
import MovieCard from "./MovieCard";

// import { nanoid } from "nanoid";

export function MemberNav() {
  return (
    <div className={styles.navBox}>
      <div className={styles.navBtn}>基本資訊</div>
      <div className={styles.navBtn}>收藏夾</div>
    </div>
  );
}
export function MemberPage(props) {
  return (
    <>
      <div className={styles.movieCardBox}>
        <div className={styles.innerBox}>
          {props.likedList &&
            props.likedList.map((data, i) => (
              <MovieCard
                key={i}
                movie_id={data.movie_id}
                tmdb_id={data.tmdb_id}
                film_name_zh={data.film_name_zh}
                film_name_en={data.film_name_en}
                poster_path={data.poster_path}
                userId={props.userId}
                isLiked={true}
                memberPage={props.memberPage}
                likedList={props.likedList}
                cancelLiked={props.cancelLiked}
                tmdbApi={props.tmdbApi}
                omdbApi={props.omdbApi}
                setInfoBox={props.setInfoBox}
                renewData={props.renewData}
              />
            ))}
        </div>
      </div>
    </>
  );
}
