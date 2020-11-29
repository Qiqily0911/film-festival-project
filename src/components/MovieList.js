import React from "react";
import styles from "../style/MovieList.module.scss";
import MovieCard from "./MovieCard";
import CannesFilm from "../CannesFilm.json";
// import CannesFilm from "./CannesFilm.json";

function MovieList(props) {
  //    const [prize, setPrize] = useState("palme_d_or");

  //    function selectPrize(e) {
  //       let btnValue = e.target.value;
  //       setPrize(btnValue);
  //       console.log(btnValue);
  //    }

  const MovieCards = (
    <div>
      {CannesFilm
        //  choose certian prize
        .filter((obj) => obj.prize === props.prize)
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

  return (
    <div>
      <button type="button" value="palme_d_or" onClick={props.selectPrize}>
        Palme d'Or 金棕櫚獎
      </button>
      <button
        type="button"
        value="un_certain_regard"
        onClick={props.selectPrize}
      >
        Un Certain Regard 一種注目
      </button>
      <div className={styles.movieList}>{MovieCards}</div>
    </div>
  );
}

export default MovieList;
