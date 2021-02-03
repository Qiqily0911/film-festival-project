import React, { useState, useEffect, useRef } from "react";
import styles from "../../style/App.module.scss";
import { firestore } from "../../config";
import MovieInfo from "../Info/MovieInfo";
import PrizeInfo from "../Info/PrizeInfo";
import YearList from "./YearList";

import { MemberPage } from "./MemberPage";
import { useWindowDimensions } from "../../utils";
import {
  setListWidth,
  setListCase,
  setLikeMovie,
  setLikePerson,
} from "../../globalState/actions";

import { useSelector, useDispatch } from "react-redux";

export default function SubContainer(props) {
  const { height, width } = useWindowDimensions();
  const listState = useSelector((state) => state.setList);
  const dispatch = useDispatch();

  const imageBoxEl = useRef(null);
  const crewsEl = useRef(null);
  const movieInfoEl = useRef(null);
  const infoBoxRef = {
    imageBox: imageBoxEl,
    crewBox: crewsEl,
    movieInfoBox: movieInfoEl,
  };
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [movieInfoOpen, setMovieInfoOpen] = useState(false);

  useEffect(() => {
    if (props.userId) {
      function userLikedList(firebaseCollection, listHook) {
        firestore
          .collection(firebaseCollection)
          .where("user", "==", props.userId)
          .onSnapshot((onSnapshot) => {
            const arr = [];
            onSnapshot.forEach((doc) => {
              arr.push(doc.data());
            });
            listHook(arr);
          });
      }

      const setMovieList = (arr) => dispatch(setLikeMovie(arr));
      const setPersonList = (arr) => dispatch(setLikePerson(arr));

      userLikedList("movie_liked", setMovieList);
      userLikedList("person_liked", setPersonList);
    }
  }, [props.userId]);

  function resetInfoPosition() {
    movieInfoEl.current.style.overflow = "hidden";
    setLoadingOpen(true);

    if (imageBoxEl.current && crewsEl.current) {
      crewsEl.current.scrollLeft = 0;
      imageBoxEl.current.scrollLeft = 0;
      imageBoxEl.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  useEffect(() => {
    if (width > 1024) {
      widthDetect(3);
    } else if (width <= 1024 && width >= 769) {
      widthDetect(2, 2);
    } else if (width <= 768 && width >= 501) {
      widthDetect(1, 2);
    } else if (width <= 500) {
      widthDetect(0, 1);
    }

    function widthDetect(listCase, num) {
      if (listCase !== listState.listCase) {
        dispatch(setListCase(listCase));
        dispatch(setListWidth(num));
      }
    }
  }, [width]);

  return (
    <div className={styles.subContainer}>
      {props.memberPage ? (
        <MemberPage
          userId={props.userId}
          memberPage={props.memberPage}
          resetInfoPosition={resetInfoPosition}
          setMovieInfoOpen={setMovieInfoOpen}
        />
      ) : (
        <>
          <YearList
            yearlist={props.yearlist}
            yearListRefs={props.yearListRefs}
            isScroll={props.isScroll}
            userId={props.userId}
            resetInfoPosition={resetInfoPosition}
            sliderRef={props.sliderRef}
            setMovieInfoOpen={setMovieInfoOpen}
          />
          <div
            className={styles.switchBtn}
            onClick={() =>
              props.prizeBoxState
                ? props.setprizeBox(false)
                : props.setprizeBox(true)
            }
          >
            {props.prizeBoxState ? "Poster" : "List"} mode
          </div>
          <PrizeInfo
            prizeBoxState={props.prizeBoxState}
            setprizeBox={props.setprizeBox}
            resetInfoPosition={resetInfoPosition}
            selectPrize={props.selectPrize}
            setMovieInfoOpen={setMovieInfoOpen}
          />
        </>
      )}
      <MovieInfo
        infoBoxRef={infoBoxRef}
        prizeBoxState={props.prizeBoxState}
        setprizeBox={props.setprizeBox}
        userId={props.userId}
        memberPage={props.memberPage}
        loadingOpen={loadingOpen}
        setLoadingOpen={setLoadingOpen}
        movieInfoOpen={movieInfoOpen}
        setMovieInfoOpen={setMovieInfoOpen}
      />
    </div>
  );
}
