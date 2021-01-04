import React, { useState, useEffect, useRef } from "react";
import styles from "./style/App.module.scss";
import { firestore } from "./config";
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
import { loadMovieData, dynamicHeightPercentage } from "./utils";

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
  const [prizeArr, setPrizeArr] = useState([]);

  const [loadingOpen, setLoadingOpen] = useState(false);

  const [year, setYear] = useState({
    min: 1928,
    max: 2020,
  });
  const [percentValue, setPercentValue] = useState(100);
  const [isScroll, setScroll] = useState(true);

  const [userId, setUserId] = useState();
  const movieInfoEl = useRef(null);
  const crewsEl = useRef(null);
  const infoWrap = useRef(null);
  const slider = useRef(null);

  const [prizeBoxState, setprizeBox] = useState(false);
  const [memberPage, setMemberPage] = useState(false);

  const [likedList, setLikedList] = useState();
  const [personList, setPersonList] = useState();

  useEffect(() => {
    const yearList = [];
    for (let i = 2020; i >= 1928; i--) {
      const item = { year: i, list: [[], [], []] };
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
      if (
        yearListRefs &&
        yearListRefs[year.min] !== undefined &&
        yearListRefs[year.min].current !== null
      ) {
        const percentage = dynamicHeightPercentage(
          year.max,
          year.min,
          yearListRefs
        );
        setPercentValue(percentage);
      }
    }

    const arr = [];
    for (let i = 0; i < 3; i++) {
      if (listState[i].film_list !== undefined) {
        arr.push(listState[i].prizeId);
      } else {
        arr.push(null);
      }
    }
    // console.log(listState);
    setPrizeArr(arr);

    setScroll(false);
  }, [listState]);

  // console.log(listState);

  useEffect(() => {
    if (userId) {
      function userLikedList(firebaseCollection, listHook) {
        firestore
          .collection(firebaseCollection)
          .where("user", "==", userId)
          .onSnapshot((onSnapshot) => {
            const arr = [];
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
      const data = fes.filter((obj) => obj.prize === prize);

      yearList.forEach((yearbox) => {
        const box = yearbox.list[order];

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

  function preventDoubleSelect(btnSelect) {
    for (let i = 0; i < listState.length; i++) {
      if (
        listState[i].film_list &&
        btnSelect.title === listState[i].title &&
        btnSelect.prize === listState[i].prize
      ) {
        alert("選過囉");
        return;
      }
    }
  }

  function selectPrize(fesData, prizeData, index) {
    const btnSelect = {
      title: fesData.btnText,
      prize_zh: prizeData.subBtnName,
      prize_name: prizeData.subBtnText,
      list_name: fesData.list_name,
      film_list: fesData.value,
      prize: prizeData.subBtnValue,
      prizeId: prizeData.dataId,
      logo: fesData.logo,
      order: index,
    };

    preventDoubleSelect(btnSelect);

    const arr = [...listState];
    arr[index] = btnSelect;

    setlistState(arr);
    setPercentValue(100);
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
            setScroll={setScroll}
            isScroll={isScroll}
            slider={slider}
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
                yearlist={list}
                yearListRefs={yearListRefs}
                listState={listState}
                setlistState={setlistState}
                setPercentValue={setPercentValue}
                setScroll={setScroll}
                selectPrize={selectPrize}
                prizeArr={prizeArr}
              />
            )}

            <AuthProvider>
              <MemberBtn
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
                  yearlist={list}
                  yearListRefs={yearListRefs}
                  listState={listState}
                  setlistState={setlistState}
                  year={year}
                  setYear={setYear}
                  setPercentValue={setPercentValue}
                  percentValue={percentValue}
                  isScroll={isScroll}
                  userId={userId}
                  likedList={likedList}
                  resetInfoPosition={resetInfoPosition}
                  slider={slider}
                />
                <PrizeInfo
                  year={year}
                  setYear={setYear}
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
                  selectPrize={selectPrize}
                  prizeArr={prizeArr}
                />
              </>
            )}
            <MovieInfo
              movieData={movieData}
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
