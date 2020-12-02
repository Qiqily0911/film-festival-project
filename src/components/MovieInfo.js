import React, { useState, useEffect } from "react";
import styles from "../style/MovieInfo.module.scss";
import { nanoid } from "nanoid";

function MovieInfo(props) {
  const [videoSrc, setvideoSrc] = useState("");

  const [castList, setCastList] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [imageList, setImageList] = useState("");

  let movieId = props.localData.movie_id;
  let videoPath = props.tmdbVideo.results;
  let images = props.tmdbImages.backdrops;
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

      if (images[0] !== undefined) {
        const b = images.map((path) => (
          <img
            key={nanoid()}
            alt="backdrops"
            src={`http://image.tmdb.org/t/p/w780${path.file_path}`}
          />
        ));
        // console.log(images[0]);
        setImageList(b);
      } else {
        const c = (
          <div className={styles.notFound}>
            <p>poster not found</p>
          </div>
        );

        setImageList(c);
      }
    }
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
                  <img
                    alt="profile"
                    src={`http://image.tmdb.org/t/p/w154${person.profile_path}`}
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
      <div className={styles.imageBox}>{imageList}</div>

      <div className={styles.infoBox}>
        <span>
          {props.localData.th}th {props.localData.prize}({props.localData.year})
        </span>
        <h3>{props.tmdbData.title}</h3>
        <h3>{props.localData.film_name_zh}</h3>

        {/* --------------- rating -------------- */}
        <div className={styles.rating}>
          <span>{props.imdbSpan[0]} /10</span>
          <span>{props.imdbSpan[1]} votes</span>
        </div>

        {/* --------------- trailer -------------- */}
        <div
          className={styles.videoBtn}
          onClick={() => {
            if (props.tmdbVideo.results[0] !== undefined) {
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
        <a href={props.localData.imdb_link} target="_blank" rel="noreferrer">
          IMDb
        </a>
        <a href={props.localData.atmovie_link} target="_blank" rel="noreferrer">
          開眼電影
        </a>

        <div>{props.tmdbData.runtime} min</div>
        <div>{props.tmdbData.overview} </div>

        {/* --------------- casts -------------- */}
        <div>
          <span>Cast:</span>
          {castBox}
        </div>
      </div>
    </div>
  );

  return <div className={styles.movieInfo}>{movieId ? content : ""}</div>;
}

export default MovieInfo;
