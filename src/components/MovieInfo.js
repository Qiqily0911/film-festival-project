import React, { useState, useEffect } from "react";
import styles from "../style/MovieInfo.module.scss";

function MovieInfo(props) {
  const [videoSrc, setvideoSrc] = useState("");
  const [imageSrc, setimageSrc] = useState("");
  const [castList, setCastList] = useState("");

  let movieId = props.localData.movie_id;

  useEffect(() => {
    let videoPath = props.tmdbVideo.results;
    let images = props.tmdbImages.backdrops;
    let casts = props.tmdbCredits.cast;

    if (
      videoPath !== undefined &&
      images !== undefined &&
      casts !== undefined
    ) {
      if (videoPath[0] !== undefined) {
        let youtubeUrl = `https://www.youtube.com/embed/${videoPath[0].key}`;
        setvideoSrc(youtubeUrl);
      } else {
        setvideoSrc(" ");
      }

      if (casts[0] !== undefined) {
        setCastList(casts);
        console.log(castList[0]);
      }

      // if (casts[0] !== undefined) {
      //    console.log(casts[0].name);
      // }
      //  const casts=(
      //        {people.map((person) => (
      //       <p> {person.name}</p>
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
  }, [props.tmdbVideo, props.tmdbImages, props.tmdbCredits, movieId, castList]);

  // );

  // show casts
  const casts = (
    <div className={styles.castBox}>
      {castList
        ? castList
            .filter((person) => person.order <= 4)
            .map((person) => (
              <div key={person.credit_id}>
                {person.profile_path ? (
                  <img
                    alt="profile"
                    src={`http://image.tmdb.org/t/p/w92${person.profile_path}`}
                  />
                ) : (
                  <div className={styles.noPic}>not found</div>
                )}

                <p> {person.name}</p>
              </div>
            ))
        : ""}
    </div>
  );

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

      <div className={styles.infoBox}>
        <span>
          {props.localData.th}th {props.localData.prize}({props.localData.year})
        </span>
        <h3>{props.tmdbData.title}</h3>
        <h3>{props.localData.film_name_zh}</h3>
        <div className={styles.rating}>
          <p>{props.omdbData.imdbRating} /10</p>
          <p>{props.omdbData.imdbVotes} votes</p>
        </div>

        <iframe title="trailer" src={videoSrc}></iframe>

        <br />
        <a href={props.localData.imdb_link} target="_blank" rel="noreferrer">
          IMDb
        </a>
        <a href={props.localData.atmovie_link} target="_blank" rel="noreferrer">
          開眼電影
        </a>
        <div>{props.tmdbData.runtime} min</div>
        <div>{props.tmdbData.overview} </div>
        <div>
          <span>Cast:</span>
          {casts}
        </div>
      </div>
    </div>
  );

  return <div className={styles.movieInfo}>{movieId ? content : ""}</div>;
}

export default MovieInfo;
