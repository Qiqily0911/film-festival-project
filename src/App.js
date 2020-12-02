import "./App.scss";
import styles from "./style/App.module.scss";
import oscar from "./oscar_best_film.json";
import cannes from "./CannesFilm.json";
import goldenHorse from "./golden_horse_best_film.json";
// import MovieCard from "./components/MovieCard";
import YearList from "./components/YearList";
import MovieInfo from "./components/MovieInfo";
import React, { useEffect, useState } from "react";
// import app from "firebase/app";
import firebase from "firebase";
import { config, apiKey, omdbKey } from "./config";
import "firebase/firestore";

firebase.initializeApp(config);

function App() {
  //  const db = firebase.firestore();
  const initListState = [
    { film_list: oscar, prize: "best_film", order: 0 },
    { film_list: cannes, prize: "palme_d_or", order: 1 },
    { film_list: goldenHorse, prize: "best_film", order: 2 },
  ];
  const [tmdbData, setData] = useState("");
  const [tmdbVideo, setVideo] = useState("");
  const [tmdbImages, setImages] = useState("");
  const [tmdbCredits, setCredits] = useState("");
  const [localData, renewData] = useState("");
  const [omdbData, setomdbData] = useState("");
  const [imdbSpan, setRating] = useState("");

  const [listState, setlistState] = useState("");
  const [yearlist, setYearlist] = useState([]); //預設為空的[]

  const [subBtn, setSubBtn] = useState("");
  const [filmList, setFilmList] = useState("");
  const [prize, setPrize] = useState("");

  //  TODO: change different film list by JSON

  // create an empty year box (1920-2020)
  useEffect(() => {
    let initList = [];
    for (let i = 1928; i <= 2020; i++) {
      let item = { year: i, list: [] };
      initList.push(item);
    }
    setYearlist(initList);
    console.log(initList);
  }, []);

  useEffect(() => {
    console.log(filmList);
    console.log(prize);
  }, [filmList, prize]);

  // 主要按鈕
  const mainBtnData = [
    {
      value: "cannes",
      btnText: "坎城影展",
    },
    {
      value: "oscar",
      btnText: "奧斯卡金像獎",
    },
    {
      value: "goldenHorse",
      btnText: "金馬影展",
    },
  ];
  const mainBtn = mainBtnData.map((data) => (
    <button type="button" value={data.value} onClick={selectFilmList}>
      {data.btnText}
    </button>
  ));

  // 選擇影展，並設定影展值（filmList）
  function selectFilmList(e) {
    let btnValue = e.target.value;

    const subBtnData = {
      cannes: {
        source: cannes,
        arr: [
          { subBtnValue: "palme_d_or", subBtnText: "Palme d'Or 金棕櫚獎" },
          {
            subBtnValue: "un_certain_regard",
            subBtnText: "Un Certain Regard 一種注目",
          },
        ],
      },
      oscar: {
        source: oscar,
        arr: [{ subBtnValue: "best_film", subBtnText: "Best Film 最佳影片" }],
      },
      goldenHorse: {
        source: goldenHorse,
        arr: [
          { subBtnValue: "best_film", subBtnText: "Best Film 最佳影片" },
          {
            subBtnValue: "best_actress",
            subBtnText: "Best actress 最佳女主角",
          },
        ],
      },
    };

    // 開啟獎項按鈕
    // TODO: 使用function component 簡化
    let subBtn;
    // function subBtn() {
    //    subBtnData.cannes.map((data) => (
    //       <button type="button" onClick={selectPrize} value={data.subBtnValue}>
    //          {data.subBtnText}
    //       </button>
    //    ));
    // }

    // 按鈕切換
    switch (btnValue) {
      case "cannes":
        subBtn = subBtnData.cannes.arr.map((data) => (
          <button type="button" onClick={selectPrize} value={data.subBtnValue}>
            {data.subBtnText}
          </button>
        ));
        setSubBtn(subBtn);
        break;

      case "oscar":
        subBtn = subBtnData.oscar.arr.map((data) => (
          <button type="button" onClick={selectPrize} value={data.subBtnValue}>
            {data.subBtnText}
          </button>
        ));
        setSubBtn(subBtn);
        break;

      case "goldenHorse":
        subBtn = subBtnData.goldenHorse.arr.map((data) => (
          <button type="button" onClick={selectPrize} value={data.subBtnValue}>
            {data.subBtnText}
          </button>
        ));
        setSubBtn(subBtn);
        break;

      default:
        setSubBtn("");
    }

    setFilmList(subBtnData[btnValue].source);
  }

  // 選擇獎項，並設定獎項值（prize）
  function selectPrize(e) {
    let btnValue = e.target.value;
    setPrize(btnValue);

    // console.log(listState);
    // 若filmList、prize不為空值，將當前值傳入obj，並push進listState 裡
    if (filmList !== "") {
      let btnSelect = {
        film_list: filmList,
        prize: prize,
        order: yearlist[0].list.length,
      };
      //若 listState 中超過三個清單，則不加入 listState
      if (listState.length < 3) {
        setlistState([...listState, btnSelect]);
        console.log(listState);
        // renderListState();
      } else {
        alert("!!");
      }
      // reset btn value
      // setFilmList("");
      // setPrize("");
    }

    // 關掉獎項按鈕
    setSubBtn("");
  }

  function renderListState() {
    // console.log(listState);
    let a = listState.map((list) =>
      fillYearList(list.film_list, list.prize, list.order)
    );
    setYearlist(a);
    // console.log(yearlist);
  }
  // put movies to the correspondense year box
  function fillYearList(fes, prize, order) {
    console.log(listState);
    console.log(fes, prize, order);
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
  // console.log(yearlist);

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
        {listState.length}
        <div className={styles.timeLine}></div>
      </aside>
      <main>
        <div className={styles.movieFilter}>
          <div>{mainBtn}</div>
          <div className={styles.subBtn}>{subBtn}</div>
        </div>

        <div className={styles.container}>
          <YearList
            prize={prize}
            selectPrize={selectPrize}
            tmdbApi={tmdbApi}
            omdbApi={omdbApi}
            imdbRating={imdbRating}
            renewData={renewData}
            // fillYearList={fillYearList}
            yearlist={yearlist}
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
