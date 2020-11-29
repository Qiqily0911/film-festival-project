import "./App.css";
import CannesFilm from "./CannesFilm.json";
import MovieCard from "./components/MovieCard";
import React from "react";
// import app from "firebase/app";
import firebase from "firebase";
// import fs from "fs";
import { config } from "./config";
import "firebase/firestore";

firebase.initializeApp(config);

function App(props) {
  //  const fs = require("fs");
  //  const db = firebase.firestore();
  //  const [value, setValue] = useState("");
  //  const [value, setValue] = useState("");

  //  get input value
  //  function handleChange(e) {
  //     setValue(e.target.value);
  //  }

  // get movie poster from json

  //  function readData() {
  //     console.log(value);
  //  }

  const MovieCards = (
    <div>
      {CannesFilm
        //  choose certian prize
        .filter((obj) => obj.prize === "un_certain_regard")
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
        {/* <input type="text" value={props.value} onChange={handleChange} />
            <button type="button" onClick={readData}>
               submit
            </button> */}
        <div>{MovieCards}</div>
      </div>
    </div>
  );
}

export default App;
