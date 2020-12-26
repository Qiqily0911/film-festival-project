import React, { useState, useEffect } from "react";
import styles from "../style/MemberPage.module.scss";
import MovieCard from "./MovieCard";

export function MemberNav(props) {
  return (
    <div className={styles.navBox}>
      <div
        className={styles.navBtn}
        onClick={() => {
          props.setMemberPage(false);
        }}
      >
        Back
      </div>
      <div className={styles.navBtn}>我的收藏夾</div>
    </div>
  );
}
export function MemberPage(props) {
  return (
    <div className={styles.outter}>
      <div className={styles.innerBox}>
        <div className={styles.headline}>收藏的電影</div>
        <div className={styles.cardBox}>
          {/* {console.log(props.likedList)} */}
          {props.likedList &&
            props.likedList
              .sort((a, b) => (a.time.seconds > b.time.seconds ? 1 : -1))
              .map((data, i) => {
                const listData = {
                  th: "",
                  year: data.year,
                  prize: "",
                  atmovie_link: "",
                  imdb_link: "",
                  movie_id: data.movie_id,
                  tmdb_id: data.tmdb_id,
                  data_id: data.data_id,
                  film_name_zh: data.film_name_zh,
                  film_name_en: data.film_name_en,
                  poster_path: data.poster_path,
                };
                return (
                  <MovieCard
                    key={i}
                    listData={listData}
                    setMovieData={props.setMovieData}
                    userId={props.userId}
                    isLiked={true}
                    memberPage={props.memberPage}
                    likedList={props.likedList}
                    cancelLiked={props.cancelLiked}
                    tmdbApi={props.tmdbApi}
                    omdbApi={props.omdbApi}
                    setInfoBox={props.setInfoBox}
                    renewData={props.renewData}
                    setLoadingOpen={props.setLoadingOpen}
                    movieInfoEl={props.movieInfoEl}
                    crewsEl={props.crewsEl}
                    infoWrap={props.infoWrap}
                  />
                );
              })}
          {/* ---- blank ---- */}
          <div className={styles.blank}></div>
          <div className={styles.blank}></div>
          <div className={styles.blank}></div>
          <div className={styles.blank}></div>
          <div className={styles.blank}></div>
          <div className={styles.blank}></div>
        </div>
        <div className={styles.headline}>喜愛的演員及導演</div>
        <div className={styles.cardBox}>
          {props.personList
            .sort((a, b) => (a.time.seconds > b.time.seconds ? 1 : -1))
            .map((data, i) => (
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
                  <div>{data.person_name_ch}</div>
                </div>
              </div>
            ))}
          {/* ---- blank ---- */}
          <div className={styles.blank}></div>
          <div className={styles.blank}></div>
          <div className={styles.blank}></div>
          <div className={styles.blank}></div>
          <div className={styles.blank}></div>
          <div className={styles.blank}></div>
        </div>
      </div>
    </div>
  );
}
