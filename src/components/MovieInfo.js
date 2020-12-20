import React, { useState, useEffect } from "react";
import styles from "../style/MovieInfo.module.scss";
import { nanoid } from "nanoid";
import clock from "../image/clock.png";
import { ReactComponent as Taipeilibrary } from "../image/TaipeiCity_library.svg";
import { ReactComponent as NewTaipeilibrary } from "../image/newTaipeiCity_library.svg";
import Crew from "./Crew";
import { BtnData } from "../data/BtnData";
// import countryName from "../data/countries.json";

function MovieInfo(props) {
  const [videoSrc, setvideoSrc] = useState("");
  const [creditsList, setCreditsList] = useState("");

  const [imageList, setImageList] = useState("");
  const [isVideoOpen, setVideoOpen] = useState(false);
  const [isCrewOpen, setCrewOpen] = useState(false);

  let movieId = props.localData.movie_id;
  //  console.log(movieId);
  // console.log(props.localData.data_id);
  let tmdbId = props.localData.tmdb_id;
  let videoPath = props.tmdbVideo.results;
  let images = props.tmdbImages;
  let credits = props.tmdbCredits;

  //  reset infoBox position
  useEffect(() => {
    if (props.movieInfoEl.current && props.crewsEl.current !== null) {
      props.crewsEl.current.scrollLeft = 0;
      props.movieInfoEl.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [tmdbId]);

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
    tmdbId,
    credits,
    images,
    videoPath,
  ]);

  const isLiked = Boolean(
    props.likedList && props.likedList.find((item) => item.tmdb_id === tmdbId)
  );
  //  console.log(isLiked);
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
                  // console.log(person);
                  // console.log(person.id);
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
  let obj = {
    user: props.userId,
    movie_id: movieId,
    tmdb_id: tmdbId,
    data_id: props.localData.data_id,
    poster_path: props.tmdbData.poster_path,
    film_name_en: props.tmdbData.title,
    film_name_zh: props.localData.film_name_zh,
  };

  const prizeTitle = () => {
    let dataId = props.localData.data_id;
    if (dataId !== undefined) {
      let filmFes = dataId.slice(0, dataId.lastIndexOf("_"));
      let prizeId = dataId.substring(dataId.length - 1);

      // console.log(prizeId);
      for (let i = 0; i < BtnData.length; i++) {
        if (BtnData[i].list_name === filmFes) {
          return (
            <>
              <div>
                {BtnData[i].official_name}{" "}
                {BtnData[i].arr[prizeId - 1].subBtnText}
              </div>
              <div>
                {BtnData[i].btnText} {BtnData[i].arr[prizeId - 1].subBtnName}
              </div>
            </>
          );
        }
      }
    }
  };

  const content = (
    <div className={styles.innerBox}>
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
            {props.localData.th !== undefined ? (
              <span className={styles.subtitle}>
                {props.ordinalSuffix(props.localData.th)} (
                {props.localData.year})
              </span>
            ) : (
              ""
            )}
            {prizeTitle()}

            {/* --------------- rating -------------- */}
            <div className={styles.rating}>
              {/* <span>{props.imdbSpan[0]} /10</span>
                      <span>{props.imdbSpan[1]} votes</span> */}

              {props.omdbData.Response !== "False" ? (
                <div>
                  <span>{props.omdbData.imdbRating} /10</span>
                  <span>{props.omdbData.imdbVotes} votes</span>
                  <div>{props.omdbData.Awards}</div>
                </div>
              ) : (
                ""
              )}

              {/* {console.log(props.omdbData)} */}

              <div>
                <img src={clock} alt="clock" />
                {props.tmdbData.runtime} min
              </div>
            </div>
            {/* --------------- rating -------------- */}
          </div>

          {isLiked ? (
            <div
              className={styles.cancelBtn}
              onClick={(e) => props.cancelLiked(e, tmdbId)}
            >
              取消收藏
            </div>
          ) : (
            <div
              className={styles.addBtn}
              onClick={(e) => props.addLiked(e, obj)}
            >
              加入收藏
            </div>
          )}
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
          {props.localData.atmovie_link ? (
            <a
              className={styles.videoBtn}
              href={props.localData.atmovie_link}
              target="_blank"
              rel="noreferrer"
            >
              開眼電影
            </a>
          ) : (
            ""
          )}
        </div>
        {/* --------- flags -------------- */}
        <div className={styles.flag}>
          {props.tmdbData && props.tmdbData.production_countries !== undefined
            ? props.tmdbData.production_countries.slice(0, 5).map((country) => (
                <div className={styles.tooltip} key={nanoid()}>
                  <span className={styles.tooltiptext}>{country.name}</span>
                  {/* {console.log(
                             typeof require(`../data/png100px/${country.iso_3166_1.toLowerCase()}.png`).default
                          )} */}
                  <img
                    alt="flag"
                    src={
                      require(`../data/png100px/${country.iso_3166_1.toLowerCase()}.png`)
                        .default || ""
                    }
                  />
                </div>
              ))
            : ""}
          {/* <div>{props.tmdbData ? props.tmdbData.production_countries[0].name : ""}</div> */}
        </div>
        {/* --------- flags -------------- */}
        {/* ---------- media source ---------- */}
        <div className={styles.mediaSource}>
          <a
            href={`https://book.tpml.edu.tw/webpac/bookSearchList.do?searchtype=simplesearch&search_field=TI&search_input=${
              props.localData.film_name_zh
                ? props.localData.film_name_zh
                : props.localData.film_name_en
            }&execodehidden=true&execode=webpac.dataType.media&ebook=#searchtype=simplesearch&search_field=TI&search_input=${
              props.localData.film_name_zh
                ? props.localData.film_name_zh
                : props.localData.film_name_en
            }`}
            target="_blank"
            rel="noreferrer"
          >
            <Taipeilibrary />
            <div>
              台北市立圖書館
              <br />
              影視資料
            </div>
          </a>
          <a
            href={`https://webpac.tphcc.gov.tw/webpac/search.cfm?m=as&k0=${
              props.localData.film_name_zh
                ? props.localData.film_name_zh
                : props.localData.film_name_en
            }&t0=t&c0=and&y10=&y20=&cat0=&dt0=%E8%A6%96%E8%81%BD%E8%B3%87%E6%96%99&l0=&lv0=&lc0=`}
            target="_blank"
            rel="noreferrer"
          >
            <NewTaipeilibrary />
            <div>
              新北市立圖書館
              <br />
              影視資料
            </div>
          </a>
          <a
            href={`https://www.catchplay.com/tw/search?keyword=${
              props.localData.film_name_zh
                ? props.localData.film_name_zh
                : props.localData.film_name_en
            }`}
            target="_blank"
            rel="noreferrer"
          >
            CatchPlay+
          </a>
        </div>
        {/* ---------- media source ---------- */}
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
              userId={props.userId}
              setCrewOpen={setCrewOpen}
              tmdbCrew={props.tmdbCrew}
              tmdbPerson={props.tmdbPerson}
              //  isLiked={props.isLiked}
              likedList={props.likedList}
              addLiked={props.addLiked}
              cancelLiked={props.cancelLiked}
              tmdbApi={props.tmdbApi}
              tmdbData2={props.tmdbData2}
              //  renewData={props.renewData}
              addPerson={props.addPerson}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={styles.movieInfo}
      style={{ right: props.infoBoxState ? "0" : "-420px" }}
    >
      <div
        className={styles.handleBar}
        onClick={() => {
          if (props.memberPage === true) {
            props.infoBoxState
              ? props.setInfoBox(false)
              : props.setInfoBox(true);
          } else {
            if (props.prizeBoxState === false && props.infoBoxState === false) {
              props.setInfoBox(true);
              props.setprizeBox(true);
            }

            if (props.prizeBoxState === true && props.infoBoxState === true) {
              props.setInfoBox(false);
              props.setprizeBox(false);
            }

            // if (props.prizeBoxState === false) {
            //    props.infoBoxState ? props.setInfoBox(false) : props.setInfoBox(true);
            // }
          }
        }}
      >
        About this Movie
      </div>
      <div className={styles.outterBox}>{tmdbId ? content : ""}</div>
    </div>
  );
}

export default MovieInfo;
