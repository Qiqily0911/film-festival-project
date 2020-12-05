import "./App.scss";
import styles from "./style/App.module.scss";
import oscar from "./oscar_best_film.json";
import cannes from "./CannesFilm.json";
import goldenHorse from "./golden_horse_best_film.json";
import YearList from "./components/YearList";
import MovieInfo from "./components/MovieInfo";
import React, { useState, useEffect } from "react";
import MovirFilter from "./components/MovieFilter";
import ControlSilder from "./components/ControlSlider";
import firebase from "firebase";
import { config, apiKey, omdbKey } from "./config";
import "firebase/firestore";

firebase.initializeApp(config);

function App() {
  //  const db = firebase.firestore();
  const initListState = [
    {
      title: "奧斯卡金像獎",
      prize_name: "最佳影片獎 Best Film",
      film_list: oscar,
      prize: "best_film",
      order: 0,
    },
    {
      title: "坎城影展",
      prize_name: "金棕櫚獎",
      film_list: cannes,
      prize: "palme_d_or",
      order: 1,
    },
    {
      title: "金馬獎",
      prize_name: "最佳影片獎",
      film_list: goldenHorse,
      prize: "best_film",
      order: 2,
    },
  ];
  const [tmdbData, setData] = useState("");
  const [tmdbVideo, setVideo] = useState("");
  const [tmdbImages, setImages] = useState("");
  const [tmdbCredits, setCredits] = useState("");
  const [localData, renewData] = useState("");
  const [omdbData, setomdbData] = useState("");
  const [imdbSpan, setRating] = useState("");

  const [list, setList] = useState([]);
  const [yearListRefs, setRefs] = useState("");
  const [listState, setlistState] = useState(initListState);
  const [filmList, setFilmList] = useState("");
  const [prize, setPrize] = useState("");

  const [vertical, setVertical] = useState(100);
  const [minYear, setMin] = useState(1928);

  useEffect(() => {
    const yearList = [];
    //  根據 listStae 去把 yearList 給做出來
    for (let i = 2020; i >= 1928; i--) {
      let item = { year: i, list: [] };
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

    // console.log(yearList);
    setList(yearList);
  }, [listState]);

  // put movies to the correspondense year box
  function fillYearList(yearList, fes, prize, order) {
    let data = fes.filter((obj) => obj.prize === prize);

    if (order === 0) {
      yearList.forEach((yearbox) => {
        data.forEach((item) => {
          if (item.year === yearbox.year) {
            let filmPrize = [];

            // if one more movies won prize at the same year
            if (yearbox.list.length !== 0) {
              yearbox.list[0].push(item);
            } else {
              filmPrize.push(item);
              yearbox.list.push(filmPrize);
            }
          }
        });

        // if the year don't have movie, set prize:null
        if (yearbox.list.length === 0) {
          let filmPrize = [{ prize: null }];
          yearbox.list.push(filmPrize);
        }
      });
    } else {
      yearList.forEach((yearbox) => {
        data.forEach((item) => {
          if (item.year === yearbox.year) {
            let filmPrize = [];

            // if one more movies won prize at the same year
            if (yearbox.list.length > order) {
              yearbox.list[order].push(item);
            } else {
              filmPrize.push(item);
              yearbox.list.push(filmPrize);
            }
          }
        });

        // if the year don't have movie, set prize:null
        if (yearbox.list.length === order) {
          let filmPrize = [{ prize: null }];
          yearbox.list.push(filmPrize);
        }
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

  //  get movie id & data
  //  function readData() {
  //     console.log(value);
  //     let ref = db.collection("cannes_film").doc("palme_d_or");

  //     ref.get().then((doc) => {
  //        setData(doc.data()[value]);
  //        let movieId = posterData["movie_id"];
  //        console.log(movieId);
  //        tmdbApi(movieId);
  //        console.log("OK");
  //        setTitleZh(posterData["film_name_zh"]);
  //        setTitleEn(posterData["film_name_en"]);
  //     });
  //  }
  // console.log(listState);

  return (
    <div className={styles.outter}>
      <aside>
        <div className={styles.logo}>LOGO</div>

        <ControlSilder
          vertical={vertical}
          setVertical={setVertical}
          yearListRefs={yearListRefs}
          minYear={minYear}
        />
      </aside>
      <main>
        <MovirFilter
          filmList={filmList}
          setFilmList={setFilmList}
          prize={prize}
          setPrize={setPrize}
          yearlist={list}
          yearListRefs={yearListRefs}
          listState={listState}
          setlistState={setlistState}
        />

        <div className={styles.container}>
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
          />
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
      </main>
    </div>
  );
}

export default App;
