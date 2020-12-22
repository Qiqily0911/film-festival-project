import React, { useState, useEffect } from "react";
import styles from "../style/MemberPage.module.scss";
import MovieCard from "./MovieCard";

// import { nanoid } from "nanoid";

export function MemberNav() {
  return (
    <div className={styles.navBox}>
      {/* <div className={styles.navBtn}>基本資訊</div> */}
      <div className={styles.navBtn}>我的收藏夾</div>
    </div>
  );
}
export function MemberPage(props) {
  return (
    <>
      <div className={styles.outter}>
        <div className={styles.innerBox}>
          <div className={styles.headline}></div>
          <div className={styles.cardBox}>
            {props.likedList &&
              props.likedList.map((data, i) => (
                <MovieCard
                  key={i}
                  movie_id={data.movie_id}
                  tmdb_id={data.tmdb_id}
                  film_name_zh={data.film_name_zh}
                  film_name_en={data.film_name_en}
                  data_id={data.data_id}
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
          <div className={styles.headline}></div>
          <div className={styles.cardBox}>
            {props.personList.map((data, i) => (
              <div className={styles.personCard} key={i}>
                <div className={styles.posterBox}>
                  <img
                    alt="poster"
                    src={`https://image.tmdb.org/t/p/w185${data.profile_path}`}
                  />
                  {/* <a href={`https://www.imdb.com/name/${data.person_imdb_id}`} target="_blank" rel="noreferrer">
                           <div>IMDB</div>
                        </a> */}
                </div>
                <div className={styles.basicInfo}>
                  <div>{data.person_name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
