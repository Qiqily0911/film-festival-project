import React, { useState, useEffect, useRef } from "react";
import styles from "../../style/Crew.module.scss";
import CrewMovieCard from "./CrewMovieCard";
import { ReactComponent as Arrow } from "../../image/icon/arrow.svg";
import { ReactComponent as Star } from "../../image/icon/star.svg";
import Loading from "../Loading";
import { addLiked, cancelLiked, overviewChinese } from "../../utils";
import { ReactComponent as Imdb } from "../../image/IMDB_Logo.svg";
import { useSelector, useDispatch } from "react-redux";

function CrewPopup(props) {
  const [personNameCh, setPersonNameCh] = useState("");
  const [crewMovieData, setCrewMovieData] = useState({
    detail: "",
    overview_translate: "",
  });
  const [infoOpen, setInfoOpen] = useState(false);

  const crewData =
    props.personData &&
    props.personData.crew.crew.filter((data) => data.job === "Director");
  const castData = props.personData && props.personData.crew.cast;
  const personData = props.personData && props.personData.person;
  const overviewEl = useRef(null);
  const likeList = useSelector((state) => state.likeList);

  setTimeout(() => {
    props.setCrewLoading(false);
  }, 1000);

  useEffect(() => {
    if (personData !== "" && personData["also_known_as"] !== undefined) {
      const otherName = personData["also_known_as"];

      setPersonNameCh("");
      for (let i = 0; i < otherName.length; i++) {
        if (otherName[i].match(/[\u3400-\u9FBF]/)) {
          setPersonNameCh(otherName[i]);
          break;
        }
      }
    }
  }, [personData]);

  const infoBox = (
    // style={{ right: infoOpen ? "0" : "-30%" }}
    // className={`${styles.infoBox} ${infoOpen ? styles.move : styles.back}`
    <div className={styles.infoBox} style={{ right: infoOpen ? "0" : "-30%" }}>
      <div className={styles.arrow} onClick={() => setInfoOpen(false)}>
        <Arrow />
      </div>

      <div>
        {crewMovieData.detail.poster_path ? (
          <img
            alt="poster"
            src={`https://image.tmdb.org/t/p/w154${crewMovieData.detail.poster_path}`}
          />
        ) : (
          <div className={styles.noPoster}>no poster</div>
        )}
      </div>

      <div className={styles.filmTitle}>
        {crewMovieData.overview_translate &&
          overviewChinese(crewMovieData) &&
          overviewChinese(crewMovieData).title}
      </div>
      <div className={styles.filmTitle}>
        {crewMovieData.detail.title}
        <a
          href={`https://www.imdb.com/title/${crewMovieData.detail.imdb_id}`}
          target="_blank"
          rel="noreferrer"
        >
          <Imdb />
        </a>
      </div>
      <div className={styles.filmTitle2}>
        {crewMovieData.detail.original_title}
      </div>
      <div className={styles.overview}>
        <p ref={overviewEl}>
          {crewMovieData.overview_translate &&
            overviewChinese(crewMovieData) &&
            overviewChinese(crewMovieData).overview}
        </p>
        <p>{crewMovieData.detail.overview}</p>
      </div>
    </div>
  );

  const obj = {
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
    likeList.personList &&
    likeList.personList.find((item) => item.person_id === personData.id);

  const crewMovieCards = (title, crewArr) => {
    let newArr = [];
    if (title === "Director") {
      newArr = crewArr.filter((data) => data.job === "Director");
    } else {
      newArr = crewArr;
    }

    return (
      <div className={styles.outter}>
        <div className={styles.title}>{title}</div>
        <div className={styles.inner}>
          {newArr &&
            newArr
              .sort((a, b) => (a["release_date"] > b["release_date"] ? 1 : -1))
              .map((data, i) => (
                <CrewMovieCard
                  key={i}
                  data={data}
                  setInfoOpen={setInfoOpen}
                  userId={props.userId}
                  setCrewMovieData={setCrewMovieData}
                  overviewEl={overviewEl}
                />
              ))}
        </div>
      </div>
    );
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
          {infoBox}
          <div className={styles.wrap}>
            <div className={styles.profile}>
              <div className={styles.photo}>
                <div>
                  {personData.profile_path ? (
                    <img
                      alt="profile"
                      src={`https://image.tmdb.org/t/p/w154${personData.profile_path}`}
                    />
                  ) : (
                    <div className={styles.noprofile}>
                      <p>No Photo</p>
                    </div>
                  )}

                  <div className={styles.likeBtn}>
                    {props.userId && (
                      <Star
                        className={isLiked ? styles.addBtn : styles.cancelBtn}
                        onClick={(e) =>
                          isLiked
                            ? cancelLiked(
                                e,
                                likeList.personList,
                                "person_liked",
                                personData.id
                              )
                            : addLiked(e, "person_liked", obj)
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
              <span className={styles.name}>{personData.name}</span>
              {personNameCh}

              <div className={styles.below}>
                {personData.birthday}
                <a
                  href={`https://www.imdb.com/name/${personData.imdb_id}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Imdb />
                </a>
              </div>

              <div className={styles.biography}>
                <p>{personData.biography}</p>
              </div>
            </div>
            <div className={styles.movieBox}>
              {crewMovieCards("Director", crewData)}
              {crewMovieCards("Cast", castData)}
            </div>
          </div>

          {props.crewLoading && (
            <div className={styles.loadingAnimate}>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CrewPopup;
