import React, { useState, useEffect, useRef } from "react";
import styles from "../../style/Crew.module.scss";
import CrewMovieCard from "./CrewMovieCard";
import SideInfo from "./SideInfo";
import SideProfile from "./SideProfile";
import Loading from "../Loading";
import { useSelector } from "react-redux";

function CrewPopup(props) {
  const [personNameCh, setPersonNameCh] = useState("");
  const [crewMovieData, setCrewMovieData] = useState({
    detail: "",
    overview_translate: "",
  });
  const [infoOpen, setInfoOpen] = useState(false);

  const crewData = props.personData?.crew.crew.filter(
    (data) => data.job === "Director"
  );
  const castData = props.personData?.crew.cast;
  const personData = props.personData?.person;
  const overviewEl = useRef(null);
  const userLike = useSelector((state) => state.userLike);

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

  const obj = {
    person_name: personData.name,
    person_name_ch: personNameCh,
    person_id: personData.id,
    person_imdb_id: personData.imdb_id,
    profile_path: personData.profile_path,
    department: personData.known_for_department,
    user: userLike.user.uid,
    time: new Date(),
  };

  const isLiked =
    userLike.personList &&
    userLike.personList.find((item) => item.person_id === personData.id);

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
          <SideInfo
            infoOpen={infoOpen}
            setInfoOpen={setInfoOpen}
            crewMovieData={crewMovieData}
            overviewEl={overviewEl}
          />
          <div className={styles.wrap}>
            <SideProfile
              personData={personData}
              isLiked={isLiked}
              personNameCh={personNameCh}
              obj={obj}
            />

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
