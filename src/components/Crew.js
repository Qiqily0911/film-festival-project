import React, { useState, useEffect } from "react";
import styles from "../style/Crew.module.scss";
import CrewMovieCard from "./CrewCard";
import { ReactComponent as Arrow } from "../image/icon/arrow.svg";
// import { firestore } from "../config";

function Crew(props) {
  console.log(props.personData);
  const [castData, setCastData] = useState("");
  const [crewData, setCrewData] = useState("");
  const [personData, setPersonData] = useState("");
  const [crewMovieData, setCrewMovieData] = useState(["", ""]);
  const [infoOpen, setInfoOpen] = useState(false);

  let crewDetial = props.personData.crew;
  let personDetail = props.personData.person;

  useEffect(() => {
    if (crewDetial !== undefined && personDetail !== undefined) {
      setCastData(crewDetial.cast);
      setCrewData(crewDetial.crew);
      setPersonData(personDetail);
    }
  }, [props.personData]);
  //  中文簡介
  //  const overviewChinese = () => {
  //     console.log(crewMovieData[1]);
  //     if (crewMovieData[1] !== "" && crewMovieData[1].translations !== undefined) {
  //        let version = crewMovieData[1].translations;
  //        for (let i = 0; i < version.length; i++) {
  //           if (version[i]["iso_3166_1"] === "TW") {
  //              return version[i].data.overview;
  //           }
  //           // FIXME: 簡中簡介判斷
  //           // if (version[i]["iso_3166_1"] === "CN" && version[i].data.overview !== "") {
  //           //    console.log("cn");
  //           //    return version[i].data.overview;
  //           // }
  //        }
  //     }
  //  };

  const infoBox = (
    <div
      className={styles.infoBox}
      style={{ right: infoOpen ? "0" : "-400px" }}
    >
      <div className={styles.arrow} onClick={() => setInfoOpen(false)}>
        <Arrow />
      </div>
      {console.log(crewMovieData)}
      <div>
        <img
          alt="poster"
          src={`https://image.tmdb.org/t/p/w154${crewMovieData[0].poster_path}`}
        />
      </div>
      <a
        href={`https://www.imdb.com/title/${crewMovieData[0].imdb_id}`}
        target="_blank"
        rel="noreferrer"
      >
        <div>IMDB</div>
      </a>
      <div className={styles.filmTitle}>{crewMovieData[0].title}</div>
      <div className={styles.filmTitle2}>{crewMovieData[0].original_title}</div>
      <div className={styles.overview}>
        {/* FIXME: 會報錯？i don't know */}
        {console.log(crewMovieData[0], crewMovieData[1])}
        {/* <p>{overviewChinese()}</p> */}
        <p>{crewMovieData[0].overview}</p>
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
                          setCrewMovieData={setCrewMovieData}
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
                          setCrewMovieData={setCrewMovieData}
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
