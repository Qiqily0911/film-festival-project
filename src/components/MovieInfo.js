import React, { useState, useEffect } from "react";
import styles from "../style/MovieInfo.module.scss";
import { nanoid } from "nanoid";
import { ReactComponent as Taipeilibrary } from "../image/TaipeiCity_library.svg";
import { ReactComponent as NewTaipeilibrary } from "../image/newTaipeiCity_library.svg";
import { ReactComponent as Bookmark } from "../image/icon/add.svg";
import { ReactComponent as Imdb } from "../image/IMDB_Logo.svg";
import { ReactComponent as Clock } from "../image/icon/clock.svg";
import { ReactComponent as Video } from "../image/icon/video.svg";
import catchplay from "../image/catchplay_logo.png";
import Loading from "./Loading";
import Crew from "./Crew";
import { BtnData } from "../data/BtnData";

function MovieInfo(props) {
  const [videoSrc, setvideoSrc] = useState("");
  const [creditsList, setCreditsList] = useState("");

  const [imageList, setImageList] = useState("");
  const [isVideoOpen, setVideoOpen] = useState(false);
  const [isCrewOpen, setCrewOpen] = useState(false);
  const [crewLoading, setCrewLoading] = useState(false);

  let movieId = props.movieData.localData.movie_id;
  let tmdbId = props.movieData.localData.tmdb_id;
  let videoPath = props.movieData.video.results;
  let images = props.movieData.images;
  let credits = props.movieData.credits;

  useEffect(() => {
    if (
      videoPath !== undefined &&
      images !== undefined &&
      credits !== undefined
    ) {
      if (videoPath[0] !== undefined) {
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
      setTimeout(() => {
        props.setLoadingOpen(false);
        console.log("4-loading close");
        props.infoWrap.current.style.overflow = "scroll";
      }, 1000);
    }
  }, [props.movieData]);

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
            Promise.all([
              props.tmdbCrewApi("/movie_credits", id),
              props.tmdbCrewApi("", id),
            ]).then((arr) => {
              props.setPersonData({
                ...props.personData,
                crew: arr[0],
                person: arr[1],
              });
            });

            setCrewOpen(true);
            setCrewLoading(true);
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

          <div className={styles.personName}>
            <p>{person.name}</p>
          </div>
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
                  Promise.all([
                    props.tmdbCrewApi("/movie_credits", person.id),
                    props.tmdbCrewApi("", person.id),
                  ]).then((arr) => {
                    props.setPersonData({
                      ...props.personData,
                      crew: arr[0],
                      person: arr[1],
                    });
                  });

                  setCrewOpen(true);
                  setCrewLoading(true);
                }}
              >
                {person.profile_path ? (
                  // <a href={`https://api.themoviedb.org/3/person/${person.id}/movie_credits?api_key=5c27dca1cd4fca2cefc5c8945cfb1974`} >
                  <img
                    alt="profile"
                    src={`https://image.tmdb.org/t/p/w154${person.profile_path}`}
                  />
                ) : (
                  <div className={styles.noPic}>
                    <span> not found</span>
                  </div>
                )}

                <div className={styles.personName}>
                  <p>{person.name}</p>
                </div>
              </div>
            ))
        : ""}
    </div>
  );

  let obj = {
    user: props.userId,
    movie_id: movieId,
    tmdb_id: tmdbId,
    data_id: props.movieData.localData.data_id,
    poster_path: props.movieData.localData.poster_path,
    film_name_en: props.movieData.localData.film_name_en,
    film_name_zh: props.movieData.localData.film_name_zh,
    time: new Date(),
    year: props.movieData.localData.year,
  };

  // 獎項名稱
  const prizeTitle = () => {
    let dataId = props.movieData.localData.data_id;
    if (dataId !== undefined) {
      let filmFes = dataId.slice(0, dataId.lastIndexOf("_"));
      let prizeId = dataId.substring(dataId.length - 1);

      // console.log(prizeId);
      for (let i = 0; i < BtnData.length; i++) {
        if (BtnData[i].list_name === filmFes) {
          return (
            <>
              {/* <div> */}
              {BtnData[i].official_name}{" "}
              {BtnData[i].arr[prizeId - 1].subBtnText}
              {/* </div> */}
            </>
          );
        }
      }
    }
  };

  //  中文簡介
  const overviewChinese = () => {
    let dataId = props.movieData.localData.data_id;

    if (dataId !== undefined) {
      let version = props.movieData.overview_translate.translations;
      // console.log(version);
      let overview = "";
      version.forEach((item) => {
        if (item.iso_3166_1 === "CN") {
          overview = item.data.overview;
        } else if (item.iso_3166_1 === "TW") {
          overview = item.data.overview;
        }
      });
      // console.log(overview);
      return overview;
    }
  };

  //內容
  const content = (
    <div className={styles.innerBox}>
      {props.loadingOpen ? (
        <div className={styles.loadingBackground}></div>
      ) : (
        ""
      )}

      <div>
        <div className={styles.imageBox} ref={props.movieInfoEl}>
          {/* ----- 圖片 ----- */}
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
              {/* ----- 年份 ----- */}
              {props.movieData.localData.th !== "" ? (
                <span className={styles.subtitle}>
                  {/* {console.log(props.movieData.localData)} */}
                  {props.ordinalSuffix(props.movieData.localData.th)} (
                  {props.movieData.localData.year}){prizeTitle()}
                </span>
              ) : (
                <span className={styles.subtitle}>
                  {props.movieData.localData.year}
                  {prizeTitle()}
                </span>
              )}
            </div>

            <div className={styles.row}>
              <div className={styles.title}>
                <p>{props.movieData.detail.title}</p>
                <p>{props.movieData.localData.film_name_zh}</p>
              </div>

              {/* 書籤 */}
              <div
                className={isLiked ? styles.addBtn : styles.cancelBtn}
                onClick={(e) => {
                  if (props.userId) {
                    isLiked
                      ? props.cancelLiked(e, tmdbId)
                      : props.addLiked(e, obj);
                  } else {
                    alert("登入會員才能加入收藏喔！");
                  }
                }}
              >
                <Bookmark />
              </div>
            </div>
          </div>

          <div className={styles.linkBox}>
            <div className={styles.box1}>
              {/* --------------- rating -------------- */}
              <div className={styles.rating}>
                {/* <span>{props.imdbSpan[0]} /10</span>
                      <span>{props.imdbSpan[1]} votes</span> */}

                {/* <div> */}

                {props.movieData.omdbData.Response !== "False" ? (
                  <>
                    <a
                      className={styles.imbdBtn}
                      href={`https://www.imdb.com/title/${props.movieData.localData.movie_id}/`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Imdb />
                    </a>
                    <span>{props.movieData.omdbData.imdbRating}</span>
                    {/* <span>{props.omdbData.imdbVotes} votes</span> */}
                    {/* <div>{props.omdbData.Awards}</div> */}
                  </>
                ) : (
                  ""
                )}
                {/* </div> */}
              </div>
              {/* --------------- rating -------------- */}

              {/* ------ 影片時間 ------ */}
              <div className={styles.clock}>
                <Clock />
                <div>{props.movieData.detail.runtime} min</div>
              </div>

              {/* --------------- trailer -------------- */}
              <div
                className={styles.videoBtn}
                onClick={() => {
                  if (props.movieData.video.results !== undefined) {
                    setVideoOpen(true);
                  }
                }}
              >
                <Video />
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
              {/* --------------- trailer iframe -------------- */}
            </div>

            {/* ---------- media source ---------- */}
            <div className={styles.mediaSource}>
              {props.movieData.localData.atmovie_link ? (
                <a
                  className={styles.atmovieLink}
                  href={props.movieData.localData.atmovie_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  開眼電影
                </a>
              ) : (
                ""
              )}
              <a
                href={`https://book.tpml.edu.tw/webpac/bookSearchList.do?searchtype=simplesearch&search_field=TI&search_input=${
                  props.movieData.localData.film_name_zh
                    ? props.movieData.localData.film_name_zh
                    : props.movieData.localData.film_name_en
                }&execodehidden=true&execode=webpac.dataType.media&ebook=#searchtype=simplesearch&search_field=TI&search_input=${
                  props.movieData.localData.film_name_zh
                    ? props.movieData.localData.film_name_zh
                    : props.movieData.localData.film_name_en
                }`}
                target="_blank"
                rel="noreferrer"
              >
                <Taipeilibrary />
              </a>
              <a
                href={`https://webpac.tphcc.gov.tw/webpac/search.cfm?m=as&k0=${
                  props.movieData.localData.film_name_zh
                    ? props.movieData.localData.film_name_zh
                    : props.movieData.localData.film_name_en
                }&t0=t&c0=and&y10=&y20=&cat0=&dt0=%E8%A6%96%E8%81%BD%E8%B3%87%E6%96%99&l0=&lv0=&lc0=`}
                target="_blank"
                rel="noreferrer"
              >
                <NewTaipeilibrary />
              </a>
              <div className={styles.tooltip}>
                <span className={styles.tooltiptext}>Catch Play</span>
                <a
                  href={`https://www.catchplay.com/tw/search?keyword=${
                    props.movieData.localData.film_name_zh
                      ? props.movieData.localData.film_name_zh
                      : props.movieData.localData.film_name_en
                  }`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={catchplay} alt="catchplay" />
                </a>
              </div>
            </div>

            {/* ---------- media source ---------- */}
          </div>
          {/* --------- flags -------------- */}
          <div className={styles.flag}>
            {props.movieData.detail &&
            props.movieData.detail.production_countries !== undefined
              ? props.movieData.detail.production_countries
                  .slice(0, 5)
                  .map((country) => (
                    <div className={styles.tooltip} key={nanoid()}>
                      <span className={styles.tooltiptext}>{country.name}</span>

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
          </div>
          {/* --------- flags -------------- */}

          <div className={styles.overview}>
            <span>Overview</span>
            <div>{overviewChinese()}</div>
            <div>{props.movieData.detail.overview}</div>
          </div>
        </div>
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
              tmdbApi={props.tmdbApi}
              personData={props.personData}
              likedList={props.likedList}
              addLiked={props.addLiked}
              cancelLiked={props.cancelLiked}
              crewLoading={crewLoading}
              setCrewLoading={setCrewLoading}
              personList={props.personList}
              addPerson={props.addPerson}
              cancelPerson={props.cancelPerson}
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
      <div className={styles.outterBox} ref={props.infoWrap}>
        {props.loadingOpen ? (
          <div className={styles.loadingAnimate}>
            <Loading />
          </div>
        ) : (
          ""
        )}

        {content}
      </div>
    </div>
  );
}

export default MovieInfo;
