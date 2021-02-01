import React, { useState, useEffect, useRef } from "react";
import styles from "../../style/App.module.scss";
import { AuthProvider } from "../../contexts/AuthContexts";
import MovieInfo from "../Info/MovieInfo";
import PrizeInfo from "../Info/PrizeInfo";
import YearList from "./YearList";
import MovieFilter from "./MovieFilter";
import MemberBtn from "./MemberBtn";
import { MemberNav, MemberPage } from "./MemberPage";
import {
  loadMovieData,
  dynamicHeightPercentage,
  useWindowDimensions,
} from "../../utils";
import { setListWidth, setListCase } from "../../globalState/actions";

import { useSelector, useDispatch } from "react-redux";

export default function Main(props) {
  const { height, width } = useWindowDimensions();
  const listState = useSelector((state) => state.setList);
  const dispatch = useDispatch();

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
              yearlist={props.list}
              yearListRefs={props.yearListRefs}
              setlistState={props.setlistState}
              setScroll={props.setScroll}
              selectPrize={props.selectPrize}
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
              resetInfoPosition={props.resetInfoPosition}
              movieInfoOpen={props.movieInfoOpen}
              setMovieInfoOpen={props.setMovieInfoOpen}
            />
          ) : (
            <>
              <YearList
                setMovieData={props.setMovieData}
                movieData={props.movieData}
                yearlist={props.list}
                yearListRefs={props.yearListRefs}
                year={props.year}
                setYear={props.setYear}
                isScroll={props.isScroll}
                userId={props.userId}
                likedList={props.likedList}
                resetInfoPosition={props.resetInfoPosition}
                slider={props.slider}
                movieInfoOpen={props.movieInfoOpen}
                setMovieInfoOpen={props.setMovieInfoOpen}
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
                year={props.year}
                prizeBoxState={props.prizeBoxState}
                setprizeBox={props.setprizeBox}
                movieData={props.movieData}
                setMovieData={props.setMovieData}
                setScroll={props.setScroll}
                loadingOpen={props.loadingOpen}
                resetInfoPosition={props.resetInfoPosition}
                selectPrize={props.selectPrize}
                prizeArr={props.prizeArr}
                movieInfoOpen={props.movieInfoOpen}
                setMovieInfoOpen={props.setMovieInfoOpen}
              />
            </>
          )}
          <MovieInfo
            movieData={props.movieData}
            imageBoxEl={props.imageBoxEl}
            crewsEl={props.crewsEl}
            movieInfoEl={props.movieInfoEl}
            prizeBoxState={props.prizeBoxState}
            setprizeBox={props.setprizeBox}
            userId={props.userId}
            likedList={props.likedList}
            personList={props.personList}
            memberPage={props.memberPage}
            loadingOpen={props.loadingOpen}
            setLoadingOpen={props.setLoadingOpen}
            movieInfoOpen={props.movieInfoOpen}
            setMovieInfoOpen={props.setMovieInfoOpen}
          />
        </div>
      </div>
    </main>
  );
}
