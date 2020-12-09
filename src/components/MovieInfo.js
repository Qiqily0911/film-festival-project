import React, { useState, useEffect } from "react";
import styles from "../style/MovieInfo.module.scss";
import { nanoid } from "nanoid";
import clock from "../image/clock.png";

function MovieInfo(props) {
  const [videoSrc, setvideoSrc] = useState("");

  const [castList, setCastList] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [imageList, setImageList] = useState("");

  let movieId = props.localData.movie_id;
  let videoPath = props.tmdbVideo.results;
  let images = props.tmdbImages;
  let casts = props.tmdbCredits.cast;

  useEffect(() => {
    if (
      videoPath !== undefined &&
      images !== undefined &&
      casts !== undefined
    ) {
      if (videoPath[0] !== undefined) {
        // FIXME: content_security_policy setting
        let youtubeUrl = `https://www.youtube.com/embed/${videoPath[0].key}?enablejsapi=1`;
        setvideoSrc(youtubeUrl);
      } else {
        setvideoSrc(" ");
      }

      if (casts[0] !== undefined) {
        setCastList(casts);
      }

      if (images.backdrops !== undefined) {
        const arr = [];
        images.backdrops.forEach((obj) => arr.push(obj.file_path));
        setImageList(arr);
      }
      //  if (images.posters[0] !== undefined) {
      //     images.posters.forEach((obj) => arr.push(obj.file_path));
      //     setImageList(arr);
      //  }
    }
    // FIXME run 4 times; it works but want to try a better way
  }, [
    props.tmdbVideo,
    props.tmdbImages,
    props.tmdbCredits,
    movieId,
    casts,
    images,
    videoPath,
  ]);

  // show casts
  const castBox = (
    <div className={styles.castBox}>
      {castList
        ? castList
            .filter((person) => person.order <= 4)
            .map((person) => (
              <div className={styles.castPic} key={person.credit_id}>
                {person.profile_path ? (
                  // <a href={`https://api.themoviedb.org/3/person/${person.id}/movie_credits?api_key=5c27dca1cd4fca2cefc5c8945cfb1974`} >
                  <img
                    alt="profile"
                    src={`https://image.tmdb.org/t/p/w154${person.profile_path}`}
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

  //  let btn = e.currentTarget;
  //  if (props.tmdbVideo.results[0] !== undefined) {
  //     setOpen(true);
  //     if (btn.className.includes(`${styles.noVideo}`)) {
  //        btn.classList.toggle(`${styles.noVideo}`);
  //     }
  //  } else {
  //     btn.classList.add(`${styles.noVideo}`);
  //  }

  const content = (
    <div>
      <div className={styles.imageBox}>
        {imageList !== "" ? (
          imageList.map((path) => (
            <img
              key={nanoid()}
              alt="images"
              src={`https://image.tmdb.org/t/p/w780${path}`}
            />
          ))
        ) : (
          <div className={styles.notFound}>
            <p>poster not found</p>
          </div>
        )}
      </div>

      <div className={styles.infoBox}>
        <span className={styles.subtitle}>
          {props.localData.th}th {props.localData.prize} ({props.localData.year}
          )
        </span>
        {/* --------------- rating -------------- */}
        <div className={styles.rating}>
          {/* <span>{props.imdbSpan[0]} /10</span>
               <span>{props.imdbSpan[1]} votes</span> */}

          <span>{props.omdbData.imdbRating} /10</span>
          <span>{props.omdbData.imdbVotes} votes</span>
          <div>
            <img src={clock} alt="clock" />
            {props.tmdbData.runtime} min
          </div>
        </div>

        <div className={styles.title}>
          <p>{props.tmdbData.title}</p>
          <p>{props.localData.film_name_zh}</p>
        </div>

        <div className={styles.linkBox}>
          {/* --------------- trailer -------------- */}
          <div
            className={styles.videoBtn}
            onClick={() => {
              if (props.tmdbVideo.results !== undefined) {
                setOpen(true);
              }
            }}
          >
            Trailer
          </div>

          {/* --------------- trailer iframe -------------- */}
          {isOpen ? (
            <div className={styles.videoDiv}>
              <div>
                <div className={styles.closeBtn} onClick={() => setOpen(false)}>
                  x
                </div>
                <iframe
                  title="trailer"
                  id="ytplayer"
                  type="text/html"
                  width="640"
                  height="360"
                  frameBorder="0"
                  src={videoSrc}
                ></iframe>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* --------------- movie link -------------- */}
          <a
            className={styles.videoBtn}
            href={props.localData.imdb_link}
            target="_blank"
            rel="noreferrer"
          >
            IMDb
          </a>
          <a
            className={styles.videoBtn}
            href={props.localData.atmovie_link}
            target="_blank"
            rel="noreferrer"
          >
            開眼電影
          </a>
        </div>
        {props.tmdbData
          ? props.tmdbData.production_countries[0].iso_3166_1
          : ""}
        <div>
          {props.tmdbData ? props.tmdbData.production_countries[0].name : ""}
        </div>
        <div className={styles.overview}>{props.tmdbData.overview} </div>
      </div>
      {/* --------------- casts -------------- */}
      <div className={styles.castOutter}>
        <span className={styles.title}>Cast</span>
        {castBox}
      </div>
    </div>
  );

  return <div className={styles.movieInfo}>{movieId ? content : ""}</div>;
}

export default MovieInfo;
