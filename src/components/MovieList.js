import React from "react";
import styles from "../style/MovieList.module.scss";
import MovieCard from "./MovieCard";
import CannesFilm from "../CannesFilm.json";
// import CannesFilm from "./CannesFilm.json";

// TODO: change different film-list by json
function MovieList(props) {
  const MovieCards = (
    <div>
      {CannesFilm
        // choose certian prize
        .filter((obj) => obj.prize === props.prize)
        // sort the data by year
        .sort((a, b) => (a.year > b.year ? 1 : -1))
        // render each
        .map((data) => (
          <MovieCard
            renewData={props.renewData}
            tmdbApi={props.tmdbApi}
            key={data.movie_id}
            th={data.th}
            year={data.year}
            prize={data.prize}
            atmovie_link={data.atmovie_link}
            imdb_link={data.imdb_link}
            movie_id={data.movie_id}
            film_name_zh={data.film_name_zh}
            film_name_en={data.film_name_en}
            poster_path={data.poster_path}
          />
        ))}
    </div>
  );

  return (
    <div>
      <div className={styles.movieList}>{MovieCards}</div>
    </div>
  );
}

export default MovieList;
