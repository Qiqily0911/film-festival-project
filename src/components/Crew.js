import React, { useState, useEffect } from "react";
import styles from "../style/Crew.module.scss";

function Crew(props) {
  const [castData, setCastData] = useState("");
  const [crewData, setCrewData] = useState("");
  const [personData, setPersonData] = useState("");
  let crewDetial = props.tmdbCrew;
  let personDetail = props.tmdbPerson;

  useEffect(() => {
    if (crewDetial !== undefined && personDetail !== undefined) {
      console.log(crewDetial);
      console.log(personDetail);
      setCastData(crewDetial.cast);
      setCrewData(crewDetial.crew);
      setPersonData(personDetail);
    }
  }, [crewDetial, personDetail]);

  return (
    <div className={styles.crewDiv}>
      <div className={styles.crewBox}>
        <div
          className={styles.closeBtn}
          onClick={() => props.setCrewOpen(false)}
        >
          ×
        </div>
        <div className={styles.text}>
          <img
            alt="profile"
            src={`https://image.tmdb.org/t/p/w154${personData.profile_path}`}
          />
          {personData.name}
          {personData.birthday}
          <a href={`https://www.imdb.com/name/${personData.imdb_id}/`}>
            <div>IMDB</div>
          </a>
          {/* <p>{personData.biography}</p> */}

          {/* {castData ? castData[0].title : ""}
               <br />
               {crewData ? crewData[0].title : ""} */}
        </div>
      </div>
    </div>
  );
}

export default Crew;
