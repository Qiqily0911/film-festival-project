import React, { useState, useEffect, useRef } from "react";
import styles from "../../style/App.module.scss";
import { AuthProvider } from "../../contexts/AuthContexts";
import MovieInfo from "../Info/MovieInfo";
import PrizeInfo from "../Info/PrizeInfo";
import YearList from "../SubContainer/YearList";
import MovieFilter from "../Navbar/MovieFilter";
import MemberBtn from "../Navbar/MemberNav";
import { MemberNav, MemberPage } from "../SubContainer/MemberPage";
import {
  loadMovieData,
  dynamicHeightPercentage,
  useWindowDimensions,
} from "../../utils";
import {
  setListAdd,
  setPercentValue,
  setListWidth,
  setListCase,
} from "../../globalState/actions";

import { useSelector, useDispatch } from "react-redux";

export default function Main(props) {
  const { height, width } = useWindowDimensions();
  const listState = useSelector((state) => state.setList);
  const dispatch = useDispatch();

  const imageBoxEl = useRef(null);
  const crewsEl = useRef(null);
  const movieInfoEl = useRef(null);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [movieInfoOpen, setMovieInfoOpen] = useState(false);

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
    <main>
      <div className={styles.container}>
        <div className={styles.navbar}>
          {props.memberPage ? (
            <MemberNav setMemberPage={props.setMemberPage} />
          ) : (
            <MovieFilter
              yearListRefs={props.yearListRefs}
              prizeArr={props.prizeArr}
            />
          )}

          <AuthProvider>
            <MemberBtn
              setUserId={props.setUserId}
              memberPage={props.memberPage}
              setMemberPage={props.setMemberPage}
              setprizeBox={props.setprizeBox}
            />
          </AuthProvider>
        </div>
        <div className={styles.subContainer}>
          {props.memberPage ? (
            <MemberPage
              userId={props.userId}
              memberPage={props.memberPage}
              likedList={props.likedList}
              personList={props.personList}
              setMovieData={props.setMovieData}
              resetInfoPosition={resetInfoPosition}
              movieInfoOpen={movieInfoOpen}
              setMovieInfoOpen={setMovieInfoOpen}
            />
          ) : (
            <>
              <YearList
                setMovieData={props.setMovieData}
                movieData={props.movieData}
                yearlist={props.yearlist}
                yearListRefs={props.yearListRefs}
                setYear={props.setYear}
                isScroll={props.isScroll}
                userId={props.userId}
                likedList={props.likedList}
                resetInfoPosition={resetInfoPosition}
                slider={props.slider}
                movieInfoOpen={movieInfoOpen}
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
                movieData={props.movieData}
                setMovieData={props.setMovieData}
                resetInfoPosition={resetInfoPosition}
                prizeArr={props.prizeArr}
                movieInfoOpen={movieInfoOpen}
                setMovieInfoOpen={setMovieInfoOpen}
              />
            </>
          )}
          <MovieInfo
            movieData={props.movieData}
            imageBoxEl={imageBoxEl}
            crewsEl={crewsEl}
            movieInfoEl={movieInfoEl}
            prizeBoxState={props.prizeBoxState}
            setprizeBox={props.setprizeBox}
            userId={props.userId}
            likedList={props.likedList}
            personList={props.personList}
            memberPage={props.memberPage}
            loadingOpen={loadingOpen}
            setLoadingOpen={setLoadingOpen}
            movieInfoOpen={movieInfoOpen}
            setMovieInfoOpen={setMovieInfoOpen}
          />
        </div>
      </div>
    </main>
  );
}
