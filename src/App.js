import React, { useState, useEffect, useRef } from "react";
import styles from "./style/App.module.scss";
import { firestore } from "./config";
import Welcome from "./components/Welcome";

import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";
import { InitMovieInfo } from "./data/LocalSource";
import {
  loadMovieData,
  dynamicHeightPercentage,
  useWindowDimensions,
} from "./utils";
import { useSelector, useDispatch } from "react-redux";
import {
  setListAdd,
  setPercentValue,
  setLikeMovie,
  setLikePerson,
} from "./globalState/actions";

function fillYearList(emptyYearList, fes, prize, order) {
  if (fes) {
    const data = fes.filter((obj) => obj.prize === prize);

    emptyYearList.forEach((yearbox) => {
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
    emptyYearList.forEach((yearbox) => {
      yearbox.list[order].push({ prize: null });
    });
  }
}

function preventDoubleSelect(listState, btnSelect) {
  for (let i = 0; i < listState.length; i++) {
    if (
      listState[i].film_list &&
      btnSelect.title === listState[i].title &&
      btnSelect.prize === listState[i].prize
    ) {
      alert("選過囉");
      return false;
    } else {
      return true;
    }
  }
}

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
  const [prizeArr, setPrizeArr] = useState([]);
  const [loadingOpen, setLoadingOpen] = useState(false);

  const [isScroll, setScroll] = useState(true);

  const [userId, setUserId] = useState();
  const welcomeRef = useRef(null);
  const imageBoxEl = useRef(null);
  const crewsEl = useRef(null);
  const movieInfoEl = useRef(null);
  const slider = useRef(null);

  const [prizeBoxState, setprizeBox] = useState(false);
  const [memberPage, setMemberPage] = useState(false);

  const [likedList, setLikedList] = useState();
  const [personList, setPersonList] = useState();

  const [movieInfoOpen, setMovieInfoOpen] = useState(false);

  const listState = useSelector((state) => state.setList);
  const yearRange = useSelector((state) => state.setYear);
  const dispatch = useDispatch();

  useEffect(() => {
    const yearList = [];

    for (let i = 2020; i >= 1928; i--) {
      const emptyYearBox = { year: i, list: [] };
      switch (listState.listCase) {
        case 3:
          emptyYearBox.list = [[], [], []];

          break;
        case 2:
        case 1:
          emptyYearBox.list = [[], []];

          break;
        case 0:
          emptyYearBox.list = [[]];

          break;
        default:
          emptyYearBox.list = [[], [], []];
      }

      yearList.push(emptyYearBox);
    }

    const yearRefs = yearList.reduce((yearRef, yearBox) => {
      yearRef[yearBox.year] = React.createRef();
      return yearRef;
    }, {});

    setRefs(yearRefs);

    listState.list.map((list) =>
      fillYearList(yearList, list.film_list, list.prize, list.order)
    );
    setList(yearList);
    setSilderValue();
    setScroll(false);

    for (let i = 0; i < listState.list.length; i++) {
      if (listState.list[i].film_list) {
        setScroll(true);
        return;
      }
    }
  }, [listState.list, listState.listCase]);

  useEffect(() => {
    const prizeIdArr = [];
    for (let i = 0; i < listState.list.length; i++) {
      if (listState.list[i].film_list?.length > 0) {
        prizeIdArr.push(listState.list[i].prizeId);
      } else {
        prizeIdArr.push(null);
      }
    }

    setPrizeArr(prizeIdArr);
  }, [listState.list]);

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

  function setSilderValue() {
    if (
      yearListRefs &&
      yearListRefs[yearRange.min] &&
      yearListRefs[yearRange.min].current
    ) {
      const percentage = dynamicHeightPercentage(
        yearRange.max,
        yearRange.min,
        yearListRefs
      );
      dispatch(setPercentValue(percentage));
    }
  }

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

    if (preventDoubleSelect(listState.list, btnSelect)) {
      dispatch(setListAdd(index, btnSelect));
      dispatch(setPercentValue(100));
    }
  }

  return (
    <div className={styles.outter}>
      {/* <Welcome welcomeOpen={welcomeOpen} setWelcome={setWelcome} welcomeRef={welcomeRef} /> */}
      <Aside
        setMemberPage={setMemberPage}
        memberPage={memberPage}
        yearListRefs={yearListRefs}
        setScroll={setScroll}
        isScroll={isScroll}
        slider={slider}
      />
      <Main
        memberPage={memberPage}
        setMemberPage={setMemberPage}
        list={list}
        yearListRefs={yearListRefs}
        listState={listState}
        setScroll={setScroll}
        selectPrize={selectPrize}
        prizeArr={prizeArr}
        setUserId={setUserId}
        setprizeBox={setprizeBox}
        userId={userId}
        likedList={likedList}
        personList={personList}
        setMovieData={setMovieData}
        resetInfoPosition={resetInfoPosition}
        movieInfoOpen={movieInfoOpen}
        setMovieInfoOpen={setMovieInfoOpen}
        movieData={movieData}
        isScroll={isScroll}
        slider={slider}
        prizeBoxState={prizeBoxState}
        loadingOpen={loadingOpen}
        imageBoxEl={imageBoxEl}
        crewsEl={crewsEl}
        movieInfoEl={movieInfoEl}
        setLoadingOpen={setLoadingOpen}
      />
    </div>
  );
}

export default App;
