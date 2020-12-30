import React, { useState, useEffect, useRef } from "react";
import styles from "./style/App.module.scss";
import { tmdbKey, omdbKey, firestore } from "./config";
import { AuthProvider } from "./contexts/AuthContexts";
import Welcome from "./components/Welcome";
import ControlSilder from "./components/ControlSlider";
import YearList from "./components/YearList";
import MovieInfo from "./components/MovieInfo";
import PrizeInfo from "./components/PrizeInfo";
import MovieFilter from "./components/MovieFilter";
import MemberBtn from "./components/MemberBtn";
import { MemberNav, MemberPage } from "./components/MemberPage";
import { InitMovieInfo, InitListState } from "./data/LocalSource";
import { ReactComponent as Logo } from "./image/logo-2.svg";
import { loadMovieData } from "./utils";

function App() {
  const [movieData, setMovieData] = useState({
    detail: "",
    video: "",
    images: "",
    credits: "",
    localData: "",
    omdbData: "",
    imdbRating: "",
    overview_translate: "",
  });

  const [welcomeOpen, setWelcome] = useState(true);
  const [list, setList] = useState([]);
  const [yearListRefs, setRefs] = useState("");
  const [listState, setlistState] = useState(InitListState);
  const [filmList, setFilmList] = useState("");
  const [prize, setPrize] = useState("");
  const [loadingOpen, setLoadingOpen] = useState(false);

  // init control-slider

  const [year, setYear] = useState({
    min: 1928,
    max: 2020,
  });
  const [percentValue, setPercentValue] = useState(100);
  const [minYear, setMin] = useState(1928);
  const [maxYear, setMax] = useState(2020);
  const [isScroll, setScroll] = useState(true);

  // get uid
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState();

  const movieInfoEl = useRef(null);
  const crewsEl = useRef(null);
  const infoWrap = useRef(null);

  const [prizeBoxState, setprizeBox] = useState(false);
  const [memberPage, setMemberPage] = useState(false);
  const [likedList, setLikedList] = useState();
  const [personList, setPersonList] = useState();

  useEffect(() => {
    const yearList = [];
    for (let i = 2020; i >= 1928; i--) {
      let item = { year: i, list: [[], [], []] };
      yearList.push(item);
    }

    const refs = yearList.reduce((acc, value) => {
      acc[value.year] = React.createRef();
      return acc;
    }, {});

    setRefs(refs);

    listState.map((list) =>
      fillYearList(yearList, list.film_list, list.prize, list.order)
    );
    setList(yearList);

    setSilderValue();

    for (let i = 0; i < listState.length; i++) {
      if (listState[i].film_list !== undefined) {
        setScroll(true);
        return;
      }
    }

    function setSilderValue() {
      if (yearListRefs !== null) {
        if (
          yearListRefs[year.min] !== undefined &&
          yearListRefs[year.min].current !== null
        ) {
          let a = year.max - year.min + 1;
          let b = yearListRefs[year.min].current.getBoundingClientRect();
          let c = a * b.height;
          let d = Math.floor(((b.bottom - 100) / c) * 100);
          setPercentValue(d);
        }
      }
    }

    setScroll(false);
  }, [listState]);

  useEffect(() => {
    if (userId) {
      function userLikedList(firebaseCollection, listHook) {
        firestore
          .collection(firebaseCollection)
          .where("user", "==", userId)
          .onSnapshot((onSnapshot) => {
            let arr = [];
            onSnapshot.forEach((doc) => {
              arr.push(doc.data());
            });
            listHook(arr);
          });
      }

      userLikedList("movie_liked", setLikedList);
      userLikedList("person_liked", setPersonList);
    }
  }, [userId]);

  useEffect(() => {
    loadMovieData(496243, "tt6751668", InitMovieInfo, setMovieData);
  }, []);

  function fillYearList(yearList, fes, prize, order) {
    if (fes !== undefined) {
      let data = fes.filter((obj) => obj.prize === prize);

      yearList.forEach((yearbox) => {
        let box = yearbox.list[order];

        data.forEach((item) => {
          if (item.year === yearbox.year) {
            box.push(item);
          }
        });
        if (box.length === 0) {
          box.push({ prize: null });
        }
      });
    } else {
      yearList.forEach((yearbox) => {
        yearbox.list[order].push({ prize: null });
      });
    }
  }

  function resetInfoPosition() {
    infoWrap.current.style.overflow = "hidden";
    setLoadingOpen(true);

    if (movieInfoEl.current && crewsEl.current !== null) {
      crewsEl.current.scrollLeft = 0;
      movieInfoEl.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <div className={styles.outter}>
      {/* <Welcome welcomeOpen={welcomeOpen} welcomeRef={welcomeRef} setWelcome={setWelcome} /> */}
      <aside>
        <div
          className={styles.logo}
          onClick={() => {
            setMemberPage(false);
          }}
        >
          <Logo />
        </div>
        {memberPage ? (
          <div className={styles.slider}></div>
        ) : (
          <ControlSilder
            percentValue={percentValue}
            setPercentValue={setPercentValue}
            yearListRefs={yearListRefs}
            year={year}
            setYear={setYear}
            minYear={minYear}
            maxYear={maxYear}
            setScroll={setScroll}
            isScroll={isScroll}
          />
        )}
      </aside>
      <main>
        <div className={styles.container}>
          <div className={styles.navbar}>
            {memberPage ? (
              <MemberNav setMemberPage={setMemberPage} />
            ) : (
              <MovieFilter
                filmList={filmList}
                setFilmList={setFilmList}
                prize={prize}
                setPrize={setPrize}
                yearlist={list}
                yearListRefs={yearListRefs}
                listState={listState}
                setlistState={setlistState}
                setPercentValue={setPercentValue}
                setScroll={setScroll}
              />
            )}

            <AuthProvider>
              <MemberBtn
                setUserData={setUserData}
                userData={userData}
                setUserId={setUserId}
                memberPage={memberPage}
                setMemberPage={setMemberPage}
                setprizeBox={setprizeBox}
              />
            </AuthProvider>
          </div>
          <div className={styles.subContainer}>
            {memberPage ? (
              <>
                <MemberPage
                  userId={userId}
                  userData={userData}
                  memberPage={memberPage}
                  likedList={likedList}
                  personList={personList}
                  setMovieData={setMovieData}
                  resetInfoPosition={resetInfoPosition}
                />
              </>
            ) : (
              <>
                <YearList
                  setMovieData={setMovieData}
                  movieData={movieData}
                  prize={prize}
                  yearlist={list}
                  yearListRefs={yearListRefs}
                  listState={listState}
                  setlistState={setlistState}
                  year={year}
                  setYear={setYear}
                  setMin={setMin}
                  minYear={minYear}
                  setMax={setMax}
                  maxYear={maxYear}
                  setPercentValue={setPercentValue}
                  percentValue={percentValue}
                  isScroll={isScroll}
                  userId={userId}
                  likedList={likedList}
                  resetInfoPosition={resetInfoPosition}
                />
                <PrizeInfo
                  year={year}
                  setYear={setYear}
                  minYear={minYear}
                  maxYear={maxYear}
                  percentValue={percentValue}
                  prizeBoxState={prizeBoxState}
                  setprizeBox={setprizeBox}
                  movieData={movieData}
                  setMovieData={setMovieData}
                  listState={listState}
                  setlistState={setlistState}
                  setPercentValue={setPercentValue}
                  setScroll={setScroll}
                  loadingOpen={loadingOpen}
                  resetInfoPosition={resetInfoPosition}
                />
              </>
            )}
            <MovieInfo
              movieData={movieData}
              resetInfoPosition={resetInfoPosition}
              movieInfoEl={movieInfoEl}
              crewsEl={crewsEl}
              infoWrap={infoWrap}
              prizeBoxState={prizeBoxState}
              setprizeBox={setprizeBox}
              userId={userId}
              likedList={likedList}
              personList={personList}
              memberPage={memberPage}
              loadingOpen={loadingOpen}
              setLoadingOpen={setLoadingOpen}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
