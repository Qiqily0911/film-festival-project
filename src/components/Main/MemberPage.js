import React, { useState } from "react";
import styles from "../../style/MemberPage.module.scss";
import MovieCard from "./MovieCard";
import { ReactComponent as Star } from "../../image/icon/star.svg";
import { ReactComponent as Arrow } from "../../image/icon/arrow.svg";
import { dataApi, cancelLiked } from "../../utils";
import CrewPopup from "../Info/CrewPopup";

export function MemberNav(props) {
  return (
    <div className={styles.navBox}>
      <div
        className={styles.backBtn}
        onClick={() => {
          props.setMemberPage(false);
        }}
      >
        <Arrow className={styles.arrow} />
      </div>
      <div className={styles.navBtn}>我的收藏夾</div>
    </div>
  );
}
export function MemberPage(props) {
  const [isCrewOpen, setCrewOpen] = useState(false);
  const [crewLoading, setCrewLoading] = useState(false);
  const [personData, setPersonData] = useState({});

  return (
    <div className={styles.outter}>
      <div className={styles.innerBox}>
        <div className={styles.headline}>
          <span>收藏的電影</span>
        </div>
        <div className={styles.cardBox}>
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
                    resetInfoPosition={props.resetInfoPosition}
                    movieInfoOpen={props.movieInfoOpen}
                    setMovieInfoOpen={props.setMovieInfoOpen}
                  />
                );
              })}

          {[...Array(6)].map((el, index) => (
            <div className={styles.blank} key={index}></div>
          ))}
        </div>
        <div className={styles.headline}>
          <span>喜愛的演員及導演</span>
        </div>
        <div className={styles.cardBox}>
          {props.personList
            .sort((a, b) => (a.time.seconds > b.time.seconds ? 1 : -1))
            .map((data, i) => (
              <div className={styles.personCard} key={i}>
                {console.log(data)}
                <div
                  className={styles.posterBox}
                  onClick={() => {
                    Promise.all([
                      dataApi(
                        "tmdb",
                        "person",
                        "/movie_credits",
                        data.person_id
                      ),
                      dataApi("tmdb", "person", "", data.person_id),
                    ])
                      .then((arr) => {
                        setPersonData({
                          crew: arr[0],
                          person: arr[1],
                        });
                      })
                      .then(() => {
                        if (personData !== {}) {
                          setCrewOpen(true);
                          setCrewLoading(true);
                        }
                      });
                  }}
                >
                  <img
                    alt="poster"
                    src={`https://image.tmdb.org/t/p/w185${data.profile_path}`}
                  />
                  <Star
                    onClick={(e) =>
                      cancelLiked(
                        e,
                        props.personList,
                        "person_liked",
                        data.person_id
                      )
                    }
                  />
                </div>
                <div className={styles.basicInfo}>
                  <div>{data.person_name}</div>
                  <div>{data.person_name_ch}</div>
                </div>
              </div>
            ))}

          {[...Array(6)].map((el, index) => (
            <div className={styles.blank} key={index}></div>
          ))}
        </div>
      </div>

      {isCrewOpen && (
        <CrewPopup
          userId={props.userId}
          setCrewOpen={setCrewOpen}
          personData={personData}
          likedList={props.likedList}
          crewLoading={crewLoading}
          setCrewLoading={setCrewLoading}
          personList={props.personList}
        />
      )}
    </div>
  );
}
