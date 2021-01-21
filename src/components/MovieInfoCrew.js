import React from "react";
import styles from "../style/MovieInfo.module.scss";
import { dataApi } from "../utils";

function MovieInfoCrew(props) {
  return (
    <div
      className={styles.castPic}
      key={props.person.credit_id}
      data-creditid={props.person.id}
      onClick={() => {
        Promise.all([
          dataApi("tmdb", "person", "/movie_credits", props.person.id),
          dataApi("tmdb", "person", "", props.person.id),
        ])
          .then((arr) => {
            props.setPersonData({
              crew: arr[0],
              person: arr[1],
            });
          })
          .then(() => {
            if (props.personData !== {}) {
              props.setCrewOpen(true);
              props.setCrewLoading(true);
            }
          });
      }}
    >
      {props.person.profile_path ? (
        <img
          alt="profile"
          src={`https://image.tmdb.org/t/p/w154${props.person.profile_path}`}
        />
      ) : (
        <div className={styles.noPic}>No Photo</div>
      )}

      <div className={styles.personName}>
        <p>{props.person.name}</p>
      </div>
    </div>
  );
}

export default MovieInfoCrew;
