import React, { useState, useEffect } from "react";
import styles from "../style/Crew.module.scss";
import CrewMovieCard from "./CrewCard";
import { ReactComponent as Arrow } from "../image/icon/arrow.svg";
// import { firestore } from "../config";

function Crew(props) {
  const [castData, setCastData] = useState("");
  const [crewData, setCrewData] = useState("");
  const [personData, setPersonData] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);

  let crewDetial = props.tmdbCrew;
  let personDetail = props.tmdbPerson;

  useEffect(() => {
    if (crewDetial !== undefined && personDetail !== undefined) {
      setCastData(crewDetial.cast);
      setCrewData(crewDetial.crew);
      setPersonData(personDetail);
      // console.log(personDetail);
      //  console.log(personData["also_known_as"]);
      //  console.log(personData["also_known_as"][0]);
    }
  }, [crewDetial, personDetail]);

  const infoBox = (
    <div
      className={styles.infoBox}
      style={{ right: infoOpen ? "0" : "-400px" }}
    >
      <div className={styles.arrow} onClick={() => setInfoOpen(false)}>
        <Arrow />
      </div>
      <div>
        <img
          alt="poster"
          src={`https://image.tmdb.org/t/p/w154${props.tmdbData2.poster_path}`}
        />
      </div>
      <a
        href={`https://www.imdb.com/title/${props.tmdbData2.imdb_id}`}
        target="_blank"
        rel="noreferrer"
      >
        <div>IMDB</div>
      </a>
      <div className={styles.filmTitle}>{props.tmdbData2.title}</div>
      <div className={styles.filmTitle2}>{props.tmdbData2.original_title}</div>
      <div className={styles.overview}>
        <p>{props.tmdbData2.overview}</p>
      </div>
    </div>
  );

  let obj = {
    person_name: personData.name,
    person_id: personData.id,
    person_imdb_id: personData.imdb_id,
    profile_path: personData.profile_path,
    department: personData.known_for_department,
    user: props.userId,
    time: new Date(),
  };

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
            {/* {personData["also_known_as"] !== undefined ? personData["also_known_as"][0] : ""} */}
            {personData.birthday}
            <a
              href={`https://www.imdb.com/name/${personData.imdb_id}/`}
              target="_blank"
              rel="noreferrer"
            >
              <div>IMDB</div>
            </a>
            <div
              className={styles.likeBtn}
              onClick={(e) => {
                props.addPerson(e, obj);
                console.log(obj);
              }}
            >
              Like
            </div>
            <div className={styles.biography}>
              <p>{personData.biography}</p>
            </div>
          </div>

          <div className={styles.movieBox}>
            <div className={styles.outter}>
              {/* Cast */}
              <div className={styles.title}>Cast</div>
              <div className={styles.inner}>
                {castData
                  ? castData
                      //   .filter((data) => data.order === 0)
                      .sort((a, b) =>
                        a["release_date"] > b["release_date"] ? 1 : -1
                      )
                      .map((data, i) => (
                        <CrewMovieCard
                          key={i}
                          data={data}
                          likedList={props.likedList}
                          setInfoOpen={setInfoOpen}
                          userId={props.userId}
                          cancelLiked={props.cancelLiked}
                          addLiked={props.addLiked}
                          tmdbData2={props.tmdbData2}
                          tmdbApi={props.tmdbApi}
                        />
                      ))
                  : ""}
              </div>
            </div>
            <div className={styles.outter}>
              {/* Director */}
              <div className={styles.title}>Director</div>
              <div className={styles.inner}>
                {crewData
                  ? crewData
                      .filter((data) => data.job === "Director")
                      .sort((a, b) =>
                        a["release_date"] > b["release_date"] ? 1 : -1
                      )
                      .map((data, j) => (
                        <CrewMovieCard
                          key={j}
                          data={data}
                          likedList={props.likedList}
                          setInfoOpen={setInfoOpen}
                          userId={props.userId}
                          cancelLiked={props.cancelLiked}
                          addLiked={props.addLiked}
                          tmdbData2={props.tmdbData2}
                          tmdbApi={props.tmdbApi}
                        />
                      ))
                  : ""}
              </div>
            </div>
          </div>
          {infoBox}

          {/* {infoOpen ? infoBox : ""} */}
        </div>
      </div>
    </div>
  );
}

export default Crew;
