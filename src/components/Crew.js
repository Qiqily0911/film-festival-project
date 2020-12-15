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
            <a href={`https://www.imdb.com/name/${personData.imdb_id}/`}>
              <div>IMDB</div>
            </a>
          </div>

          {/* <p>{personData.biography}</p> */}
          <div className={styles.movieBox}>
            {castData
              ? castData
                  //   .filter((data) => data.order === 0)
                  .sort((a, b) =>
                    a["release_date"] > b["release_date"] ? 1 : -1
                  )
                  .map((data) => (
                    <div className={styles.movieCard}>
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
            {crewData
              ? crewData
                  .filter((data) => data.job === "Director")
                  .sort((a, b) =>
                    a["release_date"] > b["release_date"] ? 1 : -1
                  )
                  .map((data) => (
                    <div className={styles.movieCard}>
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

          <br />
        </div>
      </div>
    </div>
  );
}

export default Crew;
