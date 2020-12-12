// style
import styles from "./style/App.module.scss";
// data json
import { InitListState } from "./data/BtnData";

// components
import YearList from "./components/YearList";
import MovieInfo from "./components/MovieInfo";
import MovieFilter from "./components/MovieFilter";
import MemberBtn from "./components/MemberBtn";
import ControlSilder from "./components/ControlSlider";
import React, { useState, useEffect } from "react";
//config and firebase
import { apiKey, omdbKey, firestore } from "./config";
import { AuthProvider } from "./contexts/AuthContexts";

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import * as firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";

function App() {
  const [tmdbData, setData] = useState("");
  const [tmdbVideo, setVideo] = useState("");
  const [tmdbImages, setImages] = useState("");
  const [tmdbCredits, setCredits] = useState("");
  const [localData, renewData] = useState("");
  const [omdbData, setomdbData] = useState("");
  const [imdbSpan, setRating] = useState("");

  const [list, setList] = useState([]);
  const [yearListRefs, setRefs] = useState("");
  const [listState, setlistState] = useState(InitListState);
  const [filmList, setFilmList] = useState("");
  const [prize, setPrize] = useState("");

  // init control-slider
  const [vertical, setVertical] = useState(100);
  const [minYear, setMin] = useState(1928);
  const [isScroll, setScroll] = useState(true);

  // get uid
  const [userId, setUserId] = useState();

  useEffect(() => {
    const yearList = [];
    //  根據 listState 去把 yearList 給做出來
    for (let i = 2020; i >= 1928; i--) {
      let item = { year: i, list: [[], [], []] };
      yearList.push(item);
    }

    // 設定年份欄位的參考
    const refs = yearList.reduce((acc, value) => {
      acc[value.year] = React.createRef();
      return acc;
    }, {});

    setRefs(refs);
    listState.map((list) =>
      fillYearList(yearList, list.film_list, list.prize, list.order)
    );
    setList(yearList);

    console.log(listState);
  }, [listState]);

  // put movies to the correspondense year box
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

  //  get tmdb movie detail & video
  function tmdbApi(type, movie_id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://api.themoviedb.org/3/movie/${movie_id}${type}?api_key=${apiKey}`
      );

      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    })
      .then((response) => JSON.parse(response))
      .then((data) => {
        if (type === "") {
          setData(data);
        } else if (type === "/videos") {
          setVideo(data);
        } else if (type === "/images") {
          setImages(data);
        } else if (type === "/credits") {
          setCredits(data);
        }
      });
  }

  //  get get imdb rating from omdb APi
  function omdbApi(movie_id) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://www.omdbApi.com/?apikey=${omdbKey}&i=${movie_id}`,
      true
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        let a = JSON.parse(xhr.responseText);
        setomdbData(a);
      }
    };
    xhr.send();
  }

  //  get get imdb rating from imdb page
  function imdbRating(movie_id) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://cors-anywhere.herokuapp.com/https://www.imdb.com/title/${movie_id}/?ref_=tt_sims_tt`,
      true
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        let doc = new DOMParser().parseFromString(
          xhr.responseText,
          "text/html"
        );
        let elements = [...doc.getElementsByTagName("span")];
        let a = elements.filter((x) => !!x.getAttribute("itemprop"));
        setRating([a[0].innerText, a[2].innerText]);
      }
    };
    xhr.send();
  }

  return (
    <div className={styles.outter}>
      <aside>
        <div className={styles.logo}>LOGO</div>

        <ControlSilder
          vertical={vertical}
          setVertical={setVertical}
          yearListRefs={yearListRefs}
          minYear={minYear}
          setScroll={setScroll}
          isScroll={isScroll}
        />
        {/* {console.log("=========== [01] control slider")} */}
      </aside>
      <main>
        <div className={styles.container}>
          <div className={styles.navbar}>
            <MovieFilter
              filmList={filmList}
              setFilmList={setFilmList}
              prize={prize}
              setPrize={setPrize}
              yearlist={list}
              yearListRefs={yearListRefs}
              listState={listState}
              setlistState={setlistState}
              setVertical={setVertical}
            />

            {/* <Router> */}
            <AuthProvider>
              <MemberBtn setUserId={setUserId} />
            </AuthProvider>
            {/* <Switch>
                  <Route path="./signup" component={MemberBtn} />
                     </Switch> */}

            {/* </Router> */}
          </div>
          <div className={styles.subContainer}>
            {/* {console.log("------- [03] year list start------")} */}
            <YearList
              prize={prize}
              tmdbApi={tmdbApi}
              omdbApi={omdbApi}
              imdbRating={imdbRating}
              renewData={renewData}
              yearlist={list}
              yearListRefs={yearListRefs}
              listState={listState}
              setlistState={setlistState}
              setMin={setMin}
              minYear={minYear}
              setVertical={setVertical}
              vertical={vertical}
              isScroll={isScroll}
              userId={userId}
            />
            {/* {console.log("------- [03] year list end------")} */}
            <MovieInfo
              tmdbData={tmdbData}
              tmdbVideo={tmdbVideo}
              tmdbImages={tmdbImages}
              tmdbCredits={tmdbCredits}
              localData={localData}
              omdbData={omdbData}
              imdbSpan={imdbSpan}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
