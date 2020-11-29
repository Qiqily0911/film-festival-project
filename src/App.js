import "./App.scss";
import CannesFilm from "./CannesFilm.json";
import MovieCard from "./components/MovieCard";
import React, { useState } from "react";
// import app from "firebase/app";
import firebase from "firebase";
import { config } from "./config";
import "firebase/firestore";

firebase.initializeApp(config);

function App(props) {
  //  const fs = require("fs");
  //  const db = firebase.firestore();
  const [prize, setPrize] = useState("palme_d_or");

  function selectPrize(e) {
    let btnValue = e.target.value;
    setPrize(btnValue);
    console.log(btnValue);
  }

  const MovieCards = (
    <div>
      {CannesFilm
        //  choose certian prize
        .filter((obj) => obj.prize === prize)
        // sort the data by year
        .sort((a, b) => (a.year > b.year ? 1 : -1))
        // render each
        .map((data) => (
          <MovieCard
            key={data.movie_id}
            year={data.year}
            movie_id={data.movie_id}
            film_name_zh={data.film_name_zh}
            film_name_en={data.film_name_en}
            poster_path={data.poster_path}
          />
        ))}
    </div>
  );

  //  get tmdb movie detail
  //  function tmdbMovieDetail(movie_id) {
  //     return new Promise((resolve, reject) => {
  //        let xhr = new XMLHttpRequest();
  //        xhr.open("GET", `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`);
  //        xhr.onload = () => resolve(xhr.responseText);
  //        xhr.onerror = () => reject(xhr.statusText);
  //        xhr.send();
  //     });
  //  }

  //  get movie id & data
  //  function readData() {
  //     console.log(value);
  //     let ref = db.collection("cannes_film").doc("palme_d_or");

  //     ref.get().then((doc) => {
  //        setData(doc.data()[value]);
  //        let movieId = posterData["movie_id"];
  //        console.log(movieId);
  //        tmdbMovieDetail(movieId);
  //        console.log("OK");
  //        setTitleZh(posterData["film_name_zh"]);
  //        setTitleEn(posterData["film_name_en"]);
  //     });
  //  }

  return (
    <div>
      <div>
        {/* <input type="text" value={props.value} onChange={handleChange} /> */}
        <button type="button" value="un_certain_regard" onClick={selectPrize}>
          Un Certain Regard 一種注目
        </button>
        <button type="button" value="palme_d_or" onClick={selectPrize}>
          Palme d'Or 金棕櫚獎
        </button>
        <div>{MovieCards}</div>
      </div>
    </div>
  );
}

export default App;
