// import CannesFilm from "../CannesFilm.json";
import React from "react";

function MovieCard(props) {
  return (
    <div key={props.movie_id}>
      {props.poster_path === null ? (
        <div>poster not found</div>
      ) : (
        <img
          alt="poster"
          src={`http://image.tmdb.org/t/p/w342${props.poster_path}`}
        />
      )}

      <div>
        {props.year}
        {props.film_name_zh}
        {props.film_name_en}
      </div>
    </div>
  );
}

export default MovieCard;
