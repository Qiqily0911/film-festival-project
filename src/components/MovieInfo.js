import React, { useState, useEffect } from "react";
import styles from "../style/MovieInfo.module.scss";

function MovieInfo(props) {
  const [videoSrc, setvideoSrc] = useState("");
  const [imageSrc, setimageSrc] = useState("");

  // FIXME: fix imdb rating function
  (function (d, s, id) {
    var js,
      stags = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src =
      "https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";
    stags.parentNode.insertBefore(js, stags);
  })(document, "script", "imdb-rating-api");

  let movieId = props.localData.movie_id;
  let imdbLink = `https://www.imdb.com/title/${movieId}/?ref_=plg_rt_1`;

  useEffect(() => {
    let videoPath = props.tmdbVideo.results;
    let images = props.tmdbImages.backdrops;
    if (videoPath !== undefined && images !== undefined) {
      let youtubeUrl = `https://www.youtube.com/watch?v=${videoPath[0].key}`;
      setvideoSrc(youtubeUrl);
      console.log(images);
      let imageUrl = `http://image.tmdb.org/t/p/w342${images[0].file_path}`;
      setimageSrc(imageUrl);
      console.log(imageUrl);
    }
  }, [props.tmdbVideo, props.tmdbImages]);

  const content = (
    <div>
      <span>
        {props.localData.th}th {props.localData.prize}({props.localData.year})
      </span>
      <h3>{props.tmdbData.title}</h3>
      <h3>{props.localData.film_name_zh}</h3>

      <a href={videoSrc} target="_blank" rel="noreferrer">
        Trailer
      </a>

      <div className={styles.imageBox}>
        <img alt="pic" src={imageSrc}></img>
      </div>

      {/* imdb rating plugin */}
      <span
        className="imdbRatingPlugin"
        data-user="ur88737754"
        data-title={movieId}
        data-style="p3"
      >
        <a href={imdbLink}>
          <img
            src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_37x18.png"
            alt="IMDb-logo"
          />
        </a>
      </span>
      <a href={props.localData.imdb_link} target="_blank" rel="noreferrer">
        IMDb
      </a>
      <a href={props.localData.atmovie_link} target="_blank" rel="noreferrer">
        開眼電影
      </a>

      <div>{props.tmdbData.runtime} min</div>
      <div>
        Overview: <br /> {props.tmdbData.overview}{" "}
      </div>
    </div>
  );

  return <div className={styles.movieInfo}>{movieId ? content : ""}</div>;
}

export default MovieInfo;
