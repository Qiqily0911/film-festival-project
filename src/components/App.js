import React, { useState, useEffect, useRef } from "react";
import styles from "../style/App.module.scss";
import Welcome from "./Welcome";
import Aside from "./Aside/Aside";
import Navbar from "./Navbar/Navbar";
import Container from "./Container/Container";
import { InitMovieInfo } from "../data/LocalSource";
import {
  loadMovieData,
  fillYearList,
  makeYearBoxes,
  dynamicHeightPercentage,
} from "../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  setListAdd,
  setPercentValue,
  setMovieData,
  setListPrize,
} from "../globalState/actions";

function App() {
  const [welcomeOpen, setWelcome] = useState(true);
  const [isScroll, setScroll] = useState(true);
  const [prizeBoxState, setprizeBox] = useState(false);
  const [memberPage, setMemberPage] = useState(false);

  const [yearlist, setList] = useState([]);
  const [yearListRefs, setRefs] = useState("");

  const welcomeRef = useRef(null);
  const sliderRef = useRef(null);

  const listState = useSelector((state) => state.setList);
  const yearRange = useSelector((state) => state.setPercentYear).yearRange;
  const dispatch = useDispatch();

  useEffect(() => {
    const allSelectYearList = makeYearBoxes(listState.listCase);
    const yearRefs = allSelectYearList.reduce((yearRef, yearBox) => {
      yearRef[yearBox.year] = React.createRef();
      return yearRef;
    }, {});

    setRefs(yearRefs);

    listState.list.map((list) =>
      fillYearList(allSelectYearList, list.film_list, list.prize, list.order)
    );

    setList(allSelectYearList);
    setSilderValue();
    setScroll(false);

    for (let i = 0; i < listState.list.length; i++) {
      if (listState.list[i].film_list) {
        setScroll(true);
        return;
      }
    }
  }, [listState]);

  useEffect(() => {
    const setMovieDataReducer = (arr) => dispatch(setMovieData(arr));
    loadMovieData(496243, "tt6751668", InitMovieInfo, setMovieDataReducer);
  }, []);

  function setSilderValue() {
    if (yearListRefs && yearListRefs[yearRange.min]?.current) {
      const percentage = dynamicHeightPercentage(
        yearRange.max,
        yearRange.min,
        yearListRefs
      );
      dispatch(setPercentValue(percentage));
    }
  }

  function setPrizeArr() {
    const prizeIdArr = [];
    for (let i = 0; i < listState.list.length; i++) {
      if (listState.list[i].film_list?.length > 0) {
        prizeIdArr.push(listState.list[i].prizeId);
      } else {
        prizeIdArr.push(null);
      }
    }

    dispatch(setListPrize(prizeIdArr));
  }

  function preventDoubleSelect(prizeId) {
    for (let i = 0; i < listState.prize.length; i++) {
      if (listState.prize[i] === prizeId) {
        alert("選過囉");
        return false;
      }
    }
    return true;
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

    if (preventDoubleSelect(prizeData.dataId)) {
      dispatch(setListAdd(index, btnSelect));
      setPrizeArr();
    }
  }

  return (
    <div className={styles.outter}>
      <Welcome
        welcomeOpen={welcomeOpen}
        setWelcome={setWelcome}
        welcomeRef={welcomeRef}
      />
      <Aside
        setMemberPage={setMemberPage}
        memberPage={memberPage}
        yearListRefs={yearListRefs}
        setScroll={setScroll}
        sliderRef={sliderRef}
      />
      <main>
        <div className={styles.container}>
          <Navbar
            setMemberPage={setMemberPage}
            memberPage={memberPage}
            selectPrize={selectPrize}
            setPrizeArr={setPrizeArr}
            setprizeBox={setprizeBox}
          />
          <Container
            selectPrize={selectPrize}
            prizeBoxState={prizeBoxState}
            setprizeBox={setprizeBox}
            memberPage={memberPage}
            yearlist={yearlist}
            yearListRefs={yearListRefs}
            isScroll={isScroll}
            sliderRef={sliderRef}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
