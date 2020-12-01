import React from "react";
import styles from "../style/YearList.module.scss";
import MovieCard from "./MovieCard";
import CannesFilm from "../CannesFilm.json";
import { nanoid } from "nanoid";
import GodenHorseFilm from "../golden_horse_best_film.json";

// TODO: change different film-list by json
function YearList(props) {
  // const filmData = CannesFilm.filter((obj) => obj.prize === "palme_d_or").sort((a, b) => (a.year > b.year ? 1 : -1));

  // create empty year box (1920-2020)
  let yearlist = [];
  for (let i = 1920; i <= 2020; i++) {
    let item = { year: i, list: [] };
    yearlist.push(item);
  }

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

  fillYearList(CannesFilm, "palme_d_or", 0);
  fillYearList(CannesFilm, "un_certain_regard", 1);
  fillYearList(GodenHorseFilm, "best_film", 2);
  console.log(yearlist);

  yearlist.forEach((yearbox) => {
    yearbox.list.map((data) => {
      console.log(data[0]);
    });
  });

  const showYearList = (
    // yearlist.forEach((yearbox) => {
    <div>
      <div className={styles.yearBox}>
        {yearlist[70].list.map((data) => (
          // if (data[0].prize === null) {
          //    <div>not found</div>;
          // } else {
          <MovieCard
            renewData={props.renewData}
            tmdbApi={props.tmdbApi}
            omdbApi={props.omdbApi}
            imdbRating={props.imdbRating}
            key={nanoid()}
            th={data[0].th}
            year={data[0].year}
            prize={data[0].prize}
            atmovie_link={data[0].atmovie_link}
            imdb_link={data[0].imdb_link}
            movie_id={data[0].movie_id}
            film_name_zh={data[0].film_name_zh}
            film_name_en={data[0].film_name_en}
            poster_path={data[0].poster_path}
          />
        ))}
      </div>

      <div className={styles.yearBox}>
        {yearlist[80].list.map((data) => (
          // if (data[0].prize === null) {
          //    <div>not found</div>;
          // } else {
          <MovieCard
            renewData={props.renewData}
            tmdbApi={props.tmdbApi}
            omdbApi={props.omdbApi}
            imdbRating={props.imdbRating}
            key={nanoid()}
            th={data[0].th}
            year={data[0].year}
            prize={data[0].prize}
            atmovie_link={data[0].atmovie_link}
            imdb_link={data[0].imdb_link}
            movie_id={data[0].movie_id}
            film_name_zh={data[0].film_name_zh}
            film_name_en={data[0].film_name_en}
            poster_path={data[0].poster_path}
          />
        ))}
      </div>
    </div>

    // });
  );

  // <div className={styles.yearBox}>{a}</div>;
  // });

  // const YearBox = (
  //    <div className={styles.yearBox}>
  //       {CannesFilm
  //          // choose certian prize
  //          .filter((obj) => obj.prize === props.prize)
  //          // sort the data by year
  //          .sort((a, b) => (a.year > b.year ? 1 : -1))
  //          // render each
  //          .map((data) => (
  //             <MovieCard
  //                renewData={props.renewData}
  //                tmdbApi={props.tmdbApi}
  //                omdbApi={props.omdbApi}
  //                imdbRating={props.imdbRating}
  //                key={data.movie_id}
  //                th={data.th}
  //                year={data.year}
  //                prize={data.prize}
  //                atmovie_link={data.atmovie_link}
  //                imdb_link={data.imdb_link}
  //                movie_id={data.movie_id}
  //                film_name_zh={data.film_name_zh}
  //                film_name_en={data.film_name_en}
  //                poster_path={data.poster_path}
  //             />
  //          ))}
  //    </div>
  // );

  return (
    <div className={styles.YearListBox}>
      <div className={styles.YearList}>
        {/* <h3>坎城影展</h3> */}
        {showYearList}
        {/* {filmData.map((data) => (
               <div key={nanoid()}>{YearBox(data)}</div>
            ))} */}
      </div>
    </div>
  );
}

export default YearList;
