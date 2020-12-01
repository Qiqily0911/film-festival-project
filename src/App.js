import "./App.scss";
import styles from "./style/App.module.scss";
// import CannesFilm from "./CannesFilm.json";
// import MovieCard from "./components/MovieCard";
import MovieList from "./components/MovieList";
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
  const [omdbData, setomdbData] = useState("");
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
      `http://www.omdbApi.com/?apikey=${omdbKey}&i=${movie_id}`,
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
          <MovieList
            prize={prize}
            selectPrize={selectPrize}
            tmdbApi={tmdbApi}
            omdbApi={omdbApi}
            renewData={renewData}
          />
          <MovieInfo
            tmdbData={tmdbData}
            tmdbVideo={tmdbVideo}
            tmdbImages={tmdbImages}
            tmdbCredits={tmdbCredits}
            localData={localData}
            omdbData={omdbData}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
