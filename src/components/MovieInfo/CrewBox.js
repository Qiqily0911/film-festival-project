import React, { useState } from "react";
import styles from "../../style/MovieInfo.module.scss";
import MovieInfoCrew from "./MovieInfoCrew";
import CrewPopup from "../CrewPopup/CrewPopup";
import { useSelector } from "react-redux";

export default function CrewBox(props) {
  const [isCrewOpen, setCrewOpen] = useState(false);
  const [crewLoading, setCrewLoading] = useState(false);
  const [personData, setPersonData] = useState({});
  const movieData = useSelector((state) => state.setMovieData);

  const director =
    movieData.credits &&
    movieData.credits["crew"].filter((person) => person.job === "Director")[0];
  const casts =
    movieData.credits &&
    movieData.credits["cast"].filter((person) => person.order <= 5);

  return (
    <div className={styles.crew}>
      <div className={styles.outter} ref={props.infoBoxRef.crewBox}>
        <div>
          <span className={styles.title}>Director</span>
          <div className={styles.castBox}>
            <MovieInfoCrew
              person={director}
              setPersonData={setPersonData}
              setCrewOpen={setCrewOpen}
              setCrewLoading={setCrewLoading}
            />
          </div>
        </div>
        <div>
          <span className={styles.title}>Cast</span>
          <div className={styles.castBox}>
            {casts &&
              casts.map((person, k) => (
                <MovieInfoCrew
                  key={k}
                  person={person}
                  setPersonData={setPersonData}
                  setCrewOpen={setCrewOpen}
                  setCrewLoading={setCrewLoading}
                />
              ))}
          </div>
        </div>
      </div>

      {isCrewOpen && (
        <CrewPopup
          setCrewOpen={setCrewOpen}
          personData={personData}
          crewLoading={crewLoading}
          setCrewLoading={setCrewLoading}
        />
      )}
    </div>
  );
}
