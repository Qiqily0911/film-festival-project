import "./App.scss";
import styles from "./style/App.module.scss";
// import CannesFilm from "./CannesFilm.json";
// import MovieCard from "./components/MovieCard";
import YearList from "./components/YearList";
import MovieInfo from "./components/MovieInfo";
import React, { useState } from "react";
// import app from "firebase/app";
import firebase from "firebase";
import { config, apiKey, omdbKey } from "./config";
import "firebase/firestore";

firebase.initializeApp(config);

function App() {
  //  const db = firebase.firestore();
  const [prize, setPrize] = useState("palme_d_or");
  const [tmdbData, setData] = useState("");
  const [tmdbVideo, setVideo] = useState("");
  const [tmdbImages, setImages] = useState("");
  const [tmdbCredits, setCredits] = useState("");
  const [localData, renewData] = useState("");
  //  const [omdbData, setomdbData] = useState("");
  const [imdbSpan, setRating] = useState("");
  const [yearlist, setYearlist] = useState([]);
  //  const [filmList, setFilmList] = useState({ CannesFilm });
  //  const cannesFilm = { CannesFilm };

  //  TODO: change different film list by JSON
  function selectFilmList(e) {
    let btnValue = e.target.value;
    // setFilmList(btnValue);
    console.log(btnValue);
  }

  function selectPrize(e) {
    let btnValue = e.target.value;
    setPrize(btnValue);
    console.log(btnValue);
  }

  // create an empty year box (1920-2020)

  for (let i = 1920; i <= 2020; i++) {
    let item = { year: i, list: [] };
    yearlist.push(item);
  }
  //  console.log(yearlist);

  // put movies to the correspondense year box
  function fillYearList(fes, prize, order) {
    let data = fes
      .filter((obj) => obj.prize === prize)
      .sort((a, b) => (a.year > b.year ? 1 : -1));

    if (order === 0) {
      yearlist.forEach((yearbox) => {
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
            // more than one prize
          }
        });

        // if the year don't have movie, set prize:null
        if (yearbox.list.length === 0) {
          let filmPrize = [{ prize: null }];
          yearbox.list.push(filmPrize);
        }
      });
    } else {
      yearlist.forEach((yearbox) => {
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
            // more than one prize
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
  //  function omdbApi(movie_id) {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open("GET", `http://www.omdbApi.com/?apikey=${omdbKey}&i=${movie_id}`, true);
  //     xhr.onreadystatechange = function () {
  //        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
  //           let a = JSON.parse(xhr.responseText);
  //           setomdbData(a);
  //        }
  //     };
  //     xhr.send();
  //  }

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

  return (
    <div className={styles.outter}>
      <aside>
        <div>LOGO</div>
        <div className={styles.timeLine}></div>
      </aside>
      <main>
        <div className={styles.movieFilter}>
          <div>
            <button type="button" value="cannesFilm" onClick={selectFilmList}>
              坎城影展
            </button>
            <button type="button" value="berlinFilm" onClick={selectFilmList}>
              柏林影展
            </button>
            <button type="button" value="veniceFilm" onClick={selectFilmList}>
              威尼斯影展
            </button>
            <button type="button" value="oscarFilm" onClick={selectFilmList}>
              奧斯卡金像獎
            </button>
            <button
              type="button"
              value="goldenHorseFilm"
              onClick={selectFilmList}
            >
              金馬影展
            </button>
          </div>

          <div>
            <button type="button" value="palme_d_or" onClick={selectPrize}>
              Palme d'Or 金棕櫚獎
            </button>
            <button
              type="button"
              value="un_certain_regard"
              onClick={selectPrize}
            >
              Un Certain Regard 一種注目
            </button>
          </div>
        </div>

        <div className={styles.container}>
          <YearList
            prize={prize}
            selectPrize={selectPrize}
            tmdbApi={tmdbApi}
            // omdbApi={omdbApi}
            imdbRating={imdbRating}
            renewData={renewData}
            fillYearList={fillYearList}
          />
          <MovieInfo
            tmdbData={tmdbData}
            tmdbVideo={tmdbVideo}
            tmdbImages={tmdbImages}
            tmdbCredits={tmdbCredits}
            localData={localData}
            // omdbData={omdbData}
            imdbSpan={imdbSpan}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
