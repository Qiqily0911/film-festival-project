import React, { useState, useEffect } from "react";
import styles from "../style/MovieInfo.module.scss";
import { nanoid } from "nanoid";
import clock from "../image/clock.png";
import Crew from "./Crew";
// import countryName from "../data/countries.json";

function MovieInfo(props) {
  const [videoSrc, setvideoSrc] = useState("");
  const [creditsList, setCreditsList] = useState("");

  const [imageList, setImageList] = useState("");
  const [isVideoOpen, setVideoOpen] = useState(false);
  const [isCrewOpen, setCrewOpen] = useState(false);

  let movieId = props.localData.movie_id;
  let videoPath = props.tmdbVideo.results;
  let images = props.tmdbImages;
  let credits = props.tmdbCredits;

  useEffect(() => {
    if (props.movieInfoEl.current && props.crewsEl.current !== null) {
      // console.log(props.movieInfoEl);

      props.crewsEl.current.scrollLeft = 0;

      props.movieInfoEl.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        // inline: "start",
      });
    }
  }, [movieId]);

  useEffect(() => {
    if (
      videoPath !== undefined &&
      images !== undefined &&
      credits !== undefined
    ) {
      if (videoPath[0] !== undefined) {
        // FIXME: content_security_policy setting
        let youtubeUrl = `https://www.youtube.com/embed/${videoPath[0].key}?enablejsapi=1`;
        setvideoSrc(youtubeUrl);
      } else {
        setvideoSrc(" ");
      }

      if (credits.id !== undefined) {
        setCreditsList(credits);
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
    credits,
    images,
    videoPath,
  ]);

  const director = () => {
    let arr = creditsList["crew"].filter((person) => person.job === "Director");
    let person = arr[0];
    let id = person.id;

    return (
      <div className={styles.castBox}>
        <div
          className={styles.castPic}
          key={person.credit_id}
          data-creditid={id}
          onClick={() => {
            //  console.log(person.credit_id);
            console.log(id);
            props.tmdbCrewApi("/movie_credits", id);
            props.tmdbCrewApi("", id);
            setCrewOpen(true);
          }}
        >
          {person.profile_path ? (
            <img
              alt="profile"
              src={`https://image.tmdb.org/t/p/w154${person.profile_path}`}
            />
          ) : (
            <div className={styles.noPic}>not found</div>
          )}

          <p> {person.name}</p>
        </div>
      </div>
    );
  };

  // show casts
  const castBox = (
    <div className={styles.castBox}>
      {/* {creditsList ? director() : ""} */}
      {creditsList
        ? creditsList["cast"]
            .filter((person) => person.order <= 5)
            .map((person) => (
              <div
                className={styles.castPic}
                key={person.credit_id}
                data-creditid={person.id}
                onClick={() => {
                  console.log(person);
                  console.log(person.id);
                  props.tmdbCrewApi("/movie_credits", person.id);
                  props.tmdbCrewApi("", person.id);
                  setCrewOpen(true);
                }}
              >
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
  //     setVideoOpen(true);
  //     if (btn.className.includes(`${styles.noVideo}`)) {
  //        btn.classList.toggle(`${styles.noVideo}`);
  //     }
  //  } else {
  //     btn.classList.add(`${styles.noVideo}`);
  //  }

  function ordinalSuffix(i) {
    var j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }
  const content = (
    <div>
      {/* {console.log("[04] movie info")} */}
      <div className={styles.imageBox} ref={props.movieInfoEl}>
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
            <p>Poster not found</p>
          </div>
        )}
      </div>

      <div className={styles.infoBox}>
        <div className={styles.upper}>
          <div>
            <span className={styles.subtitle}>
              {ordinalSuffix(props.localData.th)} {props.localData.prize} (
              {props.localData.year})
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
            {/* --------------- rating -------------- */}
          </div>

          <div className={styles.keep}>加入清單</div>
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
                setVideoOpen(true);
              }
            }}
          >
            Trailer
          </div>

          {/* --------------- trailer iframe -------------- */}
          {isVideoOpen ? (
            <div className={styles.videoDiv}>
              <div>
                <div
                  className={styles.closeBtn}
                  onClick={() => setVideoOpen(false)}
                >
                  ×
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
        {/* --------- flags -------------- */}
        <div className={styles.flag}>
          {props.tmdbData && props.tmdbData.production_countries !== undefined
            ? props.tmdbData.production_countries.slice(0, 5).map((country) => (
                <div className={styles.tooltip} key={nanoid()}>
                  <span className={styles.tooltiptext}>{country.name}</span>
                  <img
                    alt="flag"
                    src={
                      require(`../data/png100px/${country.iso_3166_1.toLowerCase()}.png`)
                        .default
                    }
                  />
                </div>
              ))
            : ""}
          {/* <div>{props.tmdbData ? props.tmdbData.production_countries[0].name : ""}</div> */}
        </div>{" "}
        {/* --------- flags -------------- */}
        <div className={styles.overview}>{props.tmdbData.overview} </div>
      </div>
      {/* --------------- casts -------------- */}
      <div className={styles.crew}>
        <div className={styles.outter} ref={props.crewsEl}>
          <div>
            <span className={styles.title}>Director</span>
            {creditsList ? director() : ""}
          </div>
          <div>
            <span className={styles.title}>Cast</span>
            {castBox}
          </div>
          {isCrewOpen ? (
            <Crew
              setCrewOpen={setCrewOpen}
              tmdbCrew={props.tmdbCrew}
              tmdbPerson={props.tmdbPerson}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.movieInfo}>
      {/* {console.log(props.movieInfoEl)} */}
      {movieId ? content : ""}
    </div>
  );
}

export default MovieInfo;
