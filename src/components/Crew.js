import React, { useState, useEffect } from "react";
import styles from "../style/Crew.module.scss";
import { firestore } from "../config";
const movieLiked = firestore.collection("movie_liked");

function Crew(props) {
  const [castData, setCastData] = useState("");
  const [crewData, setCrewData] = useState("");
  const [personData, setPersonData] = useState("");

  let crewDetial = props.tmdbCrew;
  let personDetail = props.tmdbPerson;

  useEffect(() => {
    if (crewDetial !== undefined && personDetail !== undefined) {
      // console.log(crewDetial);
      // console.log(personDetail);
      setCastData(crewDetial.cast);
      setCrewData(crewDetial.crew);
      setPersonData(personDetail);
      // console.log(crewDetial, personDetail);
    }
  }, [crewDetial, personDetail]);

  // 加入收藏，在firestore加入資料
  function addLiked(e) {
    console.log(e.currentTarget.value);

    let obj = {
      user: props.userId,
      //  movie_id: props.movie_id,
      tmdb_id: props.tmdb_id,
      poster_path: props.poster_path,
      film_name_en: props.film_name_en,
      //  film_name_zh: props.film_name_zh,
    };
    console.log(obj);

    // movieLiked
    //    .add(obj)
    //    .then((res) => {
    //       movieLiked.doc(res.id).set({ id: res.id }, { merge: true });
    //    })
    //    .then(() => {
    //       console.log("add movie success!");
    //    });

    e.stopPropagation();
    console.log("===========");
  }

  // 取消收藏，並恢復原本 keepTag 樣式
  function cancelLiked(e) {
    // console.log(props.likedList);
    // console.log(e.currentTarget);

    for (let i = 0; i < props.likedList.length; i++) {
      let a = props.movie_id;
      if (a === props.likedList[i].movie_id) {
        // console.log(props.likedList[i].id);
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

  return (
    <div className={styles.crewDiv}>
      <div className={styles.crewBox}>
        <div
          className={styles.closeBtn}
          onClick={() => props.setCrewOpen(false)}
        >
          ×
        </div>
        <div className={styles.container}>
          <div className={styles.profile}>
            <div>
              <img
                alt="profile"
                src={`https://image.tmdb.org/t/p/w154${personData.profile_path}`}
              />
            </div>
            <span className={styles.name}>{personData.name}</span>
            {personData.birthday}
            <a
              href={`https://www.imdb.com/name/${personData.imdb_id}/`}
              target="_blank"
              rel="noreferrer"
            >
              <div>IMDB</div>
            </a>
          </div>

          {/* <p>{personData.biography}</p> */}
          <div className={styles.movieBox}>
            <div className={styles.outter}>
              <div className={styles.title}>Cast</div>
              <div className={styles.inner}>
                {castData
                  ? castData
                      //   .filter((data) => data.order === 0)
                      .sort((a, b) =>
                        a["release_date"] > b["release_date"] ? 1 : -1
                      )
                      .map((data) => (
                        <div
                          className={styles.movieCard}
                          key={data.credit_id}
                          value={data.id}
                          onClick={() => console.log(data.id)}
                        >
                          <div className={styles.poster}>
                            {data.poster_path !== null ? (
                              <img
                                alt="poster"
                                src={`https://image.tmdb.org/t/p/w154${data.poster_path}`}
                              />
                            ) : (
                              <div className={styles.noPic}></div>
                            )}
                          </div>
                          <div>{data.release_date}</div>
                          <div>{data.title}</div>
                          {/* .match(/^\d{4}$/g) */}
                        </div>
                      ))
                  : ""}
              </div>
            </div>
            <div className={styles.outter}>
              <div className={styles.title}>Director</div>
              <div className={styles.inner}>
                {crewData
                  ? crewData
                      .filter((data) => data.job === "Director")
                      .sort((a, b) =>
                        a["release_date"] > b["release_date"] ? 1 : -1
                      )
                      .map((data) => (
                        <div
                          className={styles.movieCard}
                          key={data.credit_id}
                          value={data.id}
                          onClick={() => console.log(data.id)}
                        >
                          <div className={styles.poster}>
                            {data.poster_path !== null ? (
                              <img
                                alt="poster"
                                src={`https://image.tmdb.org/t/p/w154${data.poster_path}`}
                              />
                            ) : (
                              <div className={styles.noPic}></div>
                            )}
                          </div>
                          <div>{data.release_date}</div>
                          <div>{data.title}</div>
                        </div>
                      ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Crew;
