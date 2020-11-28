// import logo from "./logo.svg";
import "./App.css";
import FilmData from "./FilmData.json";
import React, { useState } from "react";
// import app from "firebase/app";
import firebase from "firebase";
// import fs from "fs";
import config from "./config";
import "firebase/firestore";

firebase.initializeApp(config);

function App(props) {
  //  const apiKey = "5c27dca1cd4fca2cefc5c8945cfb1974";
  //  const fs = require("fs");
  //  const db = firebase.firestore();
  //  const [value, setValue] = useState("");
  //  const [posterData, setData] = useState("");
  //  const [posterSrc, setSrc] = useState("");
  //  const [titleZh, setTitleZh] = useState("");
  //  const [titleEn, setTitleEn] = useState("");
  const [value, setValue] = useState("");

  //  get input value
  function handleChange(e) {
    setValue(e.target.value);
  }

  // get movie poster from json

  function readData() {
    console.log(value);

    // console.log(FilmData[0]);
    // let fileData = data.palme_d_or;

    // for (let i = 0; i < fileData.length; i++) {
    //    if (value === fileData[i].year) {
    //       console.log(fileData[i]);
    //    }
    // }

    // fs.readFile("../json_file/cannes_film.json", "UTF-8", (error, data) => {
    //    if (error) {
    //       return console.error(error);
    //    }

    //    let fileData = JSON.parse(data);
    //    for (let i = 0; i < fileData.length; i++) {
    //       if (value === fileData[i].year) {
    //          console.log(fileData[i]);
    //       }
    //    }
    // });
  }

  const Card = (
    <div>
      {FilmData.map((data) => {
        return (
          <div key={data.movie_id}>
            {data.film_name_zh}
            <img
              alt="poster"
              src={`http://image.tmdb.org/t/p/w200${data.poster_path}`}
            />
          </div>
        );
      })}
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

  //  const movieCard = (
  //     <div>
  //        <h3>{titleZh}</h3>
  //        <h3>{titleEn}</h3>
  //        <img alt="movie_poster" src={posterSrc} />
  //     </div>
  //  );

  return (
    <div>
      <div>
        <input type="text" value={props.value} onChange={handleChange} />
        <button type="button" onClick={readData}>
          submit
        </button>
        <div>{Card}</div>
      </div>
    </div>
  );
}

export default App;
