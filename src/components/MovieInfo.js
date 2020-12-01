import React, { useState, useEffect } from "react";
import styles from "../style/MovieInfo.module.scss";

function MovieInfo(props) {
  const [videoSrc, setvideoSrc] = useState("");
  const [imageSrc, setimageSrc] = useState("");

  let movieId = props.localData.movie_id;

  useEffect(() => {
    let videoPath = props.tmdbVideo.results;
    let images = props.tmdbImages.backdrops;

    if (videoPath !== undefined && images !== undefined) {
      if (videoPath[0] !== undefined) {
        let youtubeUrl = `https://www.youtube.com/watch?v=${videoPath[0].key}`;
        setvideoSrc(youtubeUrl);
      } else {
        setvideoSrc(" ");
      }
      // let people = props.tmdbCredits.cast;
      // console.log(people);
      // console.log(images);
      //  const casts=(
      //        {people.map((people) => (
      //       <p> {people.name}</p>
      //    ))}
      //    )

      if (images[0] !== undefined) {
        let imageUrl = `http://image.tmdb.org/t/p/w342${images[0].file_path}`;
        setimageSrc(imageUrl);
        // console.log(imageUrl);
        return;
      }
      // else if (images.posters[0] !== undefined) {
      //    // let imageUrl = `http://image.tmdb.org/t/p/w342${images.posters[0].file_path}`;
      //    // setimageSrc(imageUrl);
      //    console.log(images.posters[0]);
      //    return;
      // }
      else {
        setimageSrc(" ");
      }
    }
  }, [props.tmdbVideo, props.tmdbImages, props.tmdbCredits, movieId]);

  // const casts = (
  //    <div>
  //       {props.tmdbCredits.cast.map((people) => (
  //          <p> {people.name}</p>
  //       ))}
  //    </div>
  // );

  const content = (
    <div>
      <div className={styles.imageBox}>
        {imageSrc === " " ? (
          // if poster_path was null
          <div className={styles.notFound}>
            <p>poster not found</p>
          </div>
        ) : (
          // if data has poster_path, then render the picture
          <img alt="pic" src={imageSrc}></img>
        )}
      </div>
      <span>
        {props.localData.th}th {props.localData.prize}({props.localData.year})
      </span>
      <h3>{props.tmdbData.title}</h3>
      <h3>{props.localData.film_name_zh}</h3>
      <div className="rating">
        <p>{props.omdbData.imdbRating} /10</p>
        <p>{props.omdbData.imdbVotes} votes</p>
      </div>
      <a href={videoSrc} target="_blank" rel="noreferrer">
        Trailer
      </a>

      <br />
      <a href={props.localData.imdb_link} target="_blank" rel="noreferrer">
        IMDb
      </a>
      <a href={props.localData.atmovie_link} target="_blank" rel="noreferrer">
        開眼電影
      </a>
      <div>{props.tmdbData.runtime} min</div>
      <div>{props.tmdbData.overview} </div>
      {/* <div>{casts}</div> */}
    </div>
  );

  return <div className={styles.movieInfo}>{movieId ? content : ""}</div>;
}

export default MovieInfo;
