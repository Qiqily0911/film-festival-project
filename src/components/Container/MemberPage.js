import React, { useState } from "react";
import styles from "../../style/MemberPage.module.scss";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";
import CrewPopup from "../CrewPopup/CrewPopup";
import { useSelector } from "react-redux";

export function MemberPage(props) {
  const [isCrewOpen, setCrewOpen] = useState(false);
  const [crewLoading, setCrewLoading] = useState(false);
  const [personData, setPersonData] = useState({});
  const userLike = useSelector((state) => state.userLike);

  const HeadLine = (props) => (
    <div className={styles.headline}>
      <span>{props.text}</span>
    </div>
  );

  return (
    <div className={styles.outter}>
      <div className={styles.innerBox}>
        <HeadLine text="收藏的電影" />

        <div className={styles.cardBox}>
          {userLike.movieList &&
            userLike.movieList
              .sort((a, b) => (a.time.seconds > b.time.seconds ? 1 : -1))
              .map((data, i) => {
                return (
                  <MovieCard
                    key={i}
                    data={data}
                    isLiked={true}
                    memberPage={props.memberPage}
                    resetInfoPosition={props.resetInfoPosition}
                    setMovieInfoOpen={props.setMovieInfoOpen}
                  />
                );
              })}

          {[...Array(6)].map((el, index) => (
            <div className={styles.blank} key={index}></div>
          ))}
        </div>
        <HeadLine text="喜愛的演員及導演" />
        <div className={styles.cardBox}>
          {userLike.personList
            .sort((a, b) => (a.time.seconds > b.time.seconds ? 1 : -1))
            .map((data, i) => (
              <PersonCard
                data={data}
                key={i}
                setPersonData={setPersonData}
                personData={personData}
                setCrewOpen={setCrewOpen}
                setCrewLoading={setCrewLoading}
              />
            ))}

          {[...Array(6)].map((el, index) => (
            <div className={styles.blank} key={index}></div>
          ))}
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
