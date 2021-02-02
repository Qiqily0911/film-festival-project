import React, { useState, useEffect, useRef } from "react";
import styles from "./style/App.module.scss";

import Welcome from "./components/Welcome";

import Aside from "./components/Aside/Aside";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
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
  setListYearRef,
  setMovieData,
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
  const [welcomeOpen, setWelcome] = useState(true);
  const [yearlist, setList] = useState([]);
  const [yearListRefs, setRefs] = useState("");
  const [prizeArr, setPrizeArr] = useState([]);
  const [isScroll, setScroll] = useState(true);
  const [userId, setUserId] = useState();
  const welcomeRef = useRef(null);

  const slider = useRef(null);
  const [prizeBoxState, setprizeBox] = useState(false);
  const [memberPage, setMemberPage] = useState(false);

  const listState = useSelector((state) => state.setList);
  const yearRange = useSelector((state) => state.setYear);
  const movieData2 = useSelector((state) => state.setYear);
  const dispatch = useDispatch();

  useEffect(() => {
    const aaa = [];

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

      aaa.push(emptyYearBox);
    }

    const yearRefs = aaa.reduce((yearRef, yearBox) => {
      yearRef[yearBox.year] = React.createRef();
      return yearRef;
    }, {});

    setRefs(yearRefs);

    listState.list.map((list) =>
      fillYearList(aaa, list.film_list, list.prize, list.order)
    );

    setList(aaa);
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
    const a = (b) => dispatch(setMovieData(b));
    loadMovieData(496243, "tt6751668", InitMovieInfo, a);
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
        slider={slider}
      />
      <main>
        <div className={styles.container}>
          <Navbar
            setMemberPage={setMemberPage}
            yearListRefs={yearListRefs}
            selectPrize={selectPrize}
            prizeArr={prizeArr}
            setUserId={setUserId}
            memberPage={memberPage}
            setprizeBox={setprizeBox}
          />
          <Container
            selectPrize={selectPrize}
            prizeBoxState={prizeBoxState}
            setprizeBox={setprizeBox}
            userId={userId}
            memberPage={memberPage}
            prizeArr={prizeArr}
            yearlist={yearlist}
            yearListRefs={yearListRefs}
            isScroll={isScroll}
            slider={slider}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
