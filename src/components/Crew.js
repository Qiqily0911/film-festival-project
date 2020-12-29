import React, { useState, useEffect } from "react";
import styles from "../style/Crew.module.scss";
import CrewMovieCard from "./CrewCard";
import { ReactComponent as Arrow } from "../image/icon/arrow.svg";
import { ReactComponent as Star } from "../image/icon/star.svg";
import Loading from "./Loading";
// import { firestore } from "../config";

function Crew(props) {
  // console.log(props.personData);
  const [castData, setCastData] = useState("");
  const [crewData, setCrewData] = useState("");
  const [personData, setPersonData] = useState("");
  const [personNameCh, setPersonNameCh] = useState("");
  const [crewMovieData, setCrewMovieData] = useState({
    detail: "",
    overview_translate: "",
  });
  const [infoOpen, setInfoOpen] = useState(false);

  let crewDetial = props.personData.crew;
  let personDetail = props.personData.person;

  useEffect(() => {
    if (crewDetial !== undefined && personDetail !== undefined) {
      setCastData(crewDetial.cast);
      setCrewData(crewDetial.crew);
      setPersonData(personDetail);
      setTimeout(() => {
        props.setCrewLoading(false);
      }, 1000);
    }
  }, [props.personData]);

  useEffect(() => {
    if (personData !== "" && personData["also_known_as"] !== undefined) {
      let a = personData["also_known_as"];

      //  console.log(a);
      setPersonNameCh("");
      for (let i = 0; i < a.length; i++) {
        if (a[i].match(/[\u3400-\u9FBF]/)) {
          setPersonNameCh(a[i]);
          break;
        }
      }
    }
  }, [personData]);

  //  中文簡介
  const overviewData = () => {
    // let dataId = props.movieData.localData.data_id;

    if (crewMovieData.overview_translate !== "") {
      let version = crewMovieData.overview_translate.translations;

      let translateData = "";
      version.forEach((item) => {
        if (item.iso_3166_1 === "CN") {
          translateData = item.data;
        } else if (item.iso_3166_1 === "TW") {
          translateData = item.data;
        }
      });

      return translateData;
    }
  };

  const infoBox = (
    <div className={styles.infoBox} style={{ right: infoOpen ? "0" : "-30%" }}>
      <div className={styles.arrow} onClick={() => setInfoOpen(false)}>
        <Arrow />
      </div>

      <div>
        <img
          alt="poster"
          src={`https://image.tmdb.org/t/p/w154${crewMovieData.detail.poster_path}`}
        />
      </div>

      <a
        href={`https://www.imdb.com/title/${crewMovieData.detail.imdb_id}`}
        target="_blank"
        rel="noreferrer"
      >
        <div>IMDB</div>
      </a>
      <div className={styles.filmTitle}>
        {overviewData() && overviewData().title}
      </div>
      <div className={styles.filmTitle}>{crewMovieData.detail.title}</div>
      <div className={styles.filmTitle2}>
        {crewMovieData.detail.original_title}
      </div>
      <div className={styles.overview}>
        <p>{overviewData() && overviewData().overview}</p>
        <p>{crewMovieData.detail.overview}</p>
      </div>
    </div>
  );

  let obj = {
    person_name: personData.name,
    person_name_ch: personNameCh,
    person_id: personData.id,
    person_imdb_id: personData.imdb_id,
    profile_path: personData.profile_path,
    department: personData.known_for_department,
    user: props.userId,
    time: new Date(),
  };

  const isLiked =
    props.personList &&
    props.personList.find((item) => item.person_id === personData.id);
  console.log(props.personList);
  console.log(isLiked);

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
            <div className={styles.photo}>
              <div>
                <img
                  alt="profile"
                  src={`https://image.tmdb.org/t/p/w154${personData.profile_path}`}
                />
                <div className={styles.likeBtn}>
                  <Star
                    className={isLiked ? styles.addBtn : styles.cancelBtn}
                    onClick={(e) =>
                      isLiked
                        ? props.cancelPerson(e, personData.id)
                        : props.addPerson(e, obj)
                    }
                  />
                </div>
              </div>
            </div>
            <span className={styles.name}>{personData.name}</span>
            {personNameCh}
            {personData.birthday}
            <a
              href={`https://www.imdb.com/name/${personData.imdb_id}/`}
              target="_blank"
              rel="noreferrer"
            >
              <div>IMDB</div>
            </a>

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
                          crewMovieData={crewMovieData}
                          tmdbApi={props.tmdbApi}
                        />
                      ))
                  : ""}
              </div>
            </div>
          </div>
          {infoBox}
          {props.crewLoading ? (
            <div className={styles.loadingAnimate}>
              <Loading />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Crew;
