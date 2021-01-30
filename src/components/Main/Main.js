import React, { useState, useEffect, useRef } from "react";
import styles from "../../style/App.module.scss";
import { AuthProvider } from "../../contexts/AuthContexts";
import MovieInfo from "../Info/MovieInfo";
import PrizeInfo from "../Info/PrizeInfo";
import YearList from "./YearList";
import MovieFilter from "./MovieFilter";
import MemberBtn from "./MemberBtn";
import { MemberNav, MemberPage } from "./MemberPage";

export default function Main(props) {
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
              listState={props.listState}
              setPercentValue={props.setPercentValue}
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
              listCase={props.listCase}
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
              listCase={props.listCase}
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
                listState={props.listState}
                year={props.year}
                setYear={props.setYear}
                setPercentValue={props.setPercentValue}
                percentValue={props.percentValue}
                isScroll={props.isScroll}
                userId={props.userId}
                likedList={props.likedList}
                resetInfoPosition={props.resetInfoPosition}
                slider={props.slider}
                listCase={props.listCase}
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
                setYear={props.setYear}
                percentValue={props.percentValue}
                prizeBoxState={props.prizeBoxState}
                setprizeBox={props.setprizeBox}
                movieData={props.movieData}
                setMovieData={props.setMovieData}
                listState={props.listState}
                setPercentValue={props.setPercentValue}
                setScroll={props.setScroll}
                loadingOpen={props.loadingOpen}
                resetInfoPosition={props.resetInfoPosition}
                selectPrize={props.selectPrize}
                prizeArr={props.prizeArr}
                listCase={props.listCase}
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
            listCase={props.listCase}
            movieInfoOpen={props.movieInfoOpen}
            setMovieInfoOpen={props.setMovieInfoOpen}
          />
        </div>
      </div>
    </main>
  );
}
