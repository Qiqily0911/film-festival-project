// import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
// import app from "firebase/app";
import firebase from "firebase";
import config from "./config";
import "firebase/firestore";

firebase.initializeApp(config);

function App(props) {
  const apiKey = "5c27dca1cd4fca2cefc5c8945cfb1974";
  const db = firebase.firestore();
  const [value, setValue] = useState("");
  const [posterData, setData] = useState("");
  const [posterSrc, setSrc] = useState("");
  const [titleZh, setTitleZh] = useState("");
  const [titleEn, setTitleEn] = useState("");

  //  get input value
  function handleChange(e) {
    setValue(e.target.value);
  }

  //  get poster url
  function tmdbMovieDetail(movie_id) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let xhrObj = JSON.parse(xhr.responseText);
        setSrc(`http://image.tmdb.org/t/p/w200${xhrObj.poster_path}`);
        console.log(xhrObj.poster_path);
        console.log(posterSrc);
      }
    };
    xhr.open(
      "GET",
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`
    );
    xhr.send();
  }

  //  get movie id & data
  function readData() {
    console.log(value);
    let ref = db.collection("cannes_film").doc("palme_d_or");

    ref.get().then((doc) => {
      setData(doc.data()[value]);
      let movieId = posterData["movie_id"];
      console.log(movieId);
      tmdbMovieDetail(movieId);
      console.log("OK");
      setTitleZh(posterData["film_name_zh"]);
      setTitleEn(posterData["film_name_en"]);
    });
  }

  const movieCard = (
    <div>
      <h3>{titleZh}</h3>
      <h3>{titleEn}</h3>
      <img alt="movie_poster" src={posterSrc} />
    </div>
  );

  return (
    <div>
      <div>
        <input type="text" value={props.value} onChange={handleChange} />
        <button type="button" onClick={readData}>
          submit
        </button>
        <div>
          <div>{posterSrc !== "" ? movieCard : ""}</div>
        </div>
      </div>
    </div>
  );
}

// /ajVEq3RFXyXmhEGAegY8iz8VkH2.jpg

export default App;
