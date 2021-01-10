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
import CrewPopup from "./CrewPopup";
import MovieInfoCrew from "./MovieInfoCrew";
import { BtnData } from "../data/LocalSource";
import {
  ordinalSuffix,
  addLiked,
  cancelLiked,
  overviewChinese,
} from "../utils";

function MovieInfo(props) {
  const [imageList, setImageList] = useState("");
  const [isVideoOpen, setVideoOpen] = useState(false);
  const [isCrewOpen, setCrewOpen] = useState(false);
  const [crewLoading, setCrewLoading] = useState(false);
  const [personData, setPersonData] = useState({});

  const movieInfo = {
    movieId: props.movieData.localData.movie_id,
    tmdbId: props.movieData.localData.tmdb_id,
    videoPath: props.movieData.video.results,
    images: props.movieData.images,
    credits: props.movieData.credits,
  };

  const obj = {
    user: props.userId,
    movie_id: movieInfo.movieId,
    tmdb_id: movieInfo.tmdbId,
    data_id: props.movieData.localData.data_id,
    poster_path: props.movieData.localData.poster_path,
    film_name_en: props.movieData.localData.film_name_en,
    film_name_zh: props.movieData.localData.film_name_zh,
    time: new Date(),
    year: props.movieData.localData.year,
  };

  useEffect(() => {
    if (movieInfo.images.backdrops !== undefined) {
      const arr = [];
      movieInfo.images.backdrops.forEach((pic) => arr.push(pic.file_path));
      setImageList(arr);
    }

    setTimeout(() => {
      props.setLoadingOpen(false);
      props.movieInfoEl.current.style.overflow = "scroll";
    }, 1000);
  }, [props.movieData]);

  const isLiked = Boolean(
    props.likedList &&
      props.likedList.find((item) => item.tmdb_id === movieInfo.tmdbId)
  );

  const director =
    movieInfo.credits &&
    movieInfo.credits["crew"].filter((person) => person.job === "Director")[0];
  const casts =
    movieInfo.credits &&
    movieInfo.credits["cast"].filter((person) => person.order <= 5);

  const prizeTitle = () => {
    const dataId = props.movieData.localData.data_id;
    if (dataId !== undefined) {
      const filmFes = dataId.slice(0, dataId.lastIndexOf("_"));
      const prizeId = dataId.substring(dataId.length - 1);

      for (let i = 0; i < BtnData.length; i++) {
        if (BtnData[i].list_name === filmFes) {
          return (
            <>
              {BtnData[i].official_name}
              {BtnData[i].arr[prizeId - 1].subBtnText}
            </>
          );
        }
      }
    }
  };

  const searchName = props.movieData.localData.film_name_zh
    ? props.movieData.localData.film_name_zh
    : props.movieData.localData.film_name_en;

  const mediaLink = (title, link, icon) => {
    return (
      <div className={styles.tooltip}>
        <span className={styles.tooltiptext}>{title}</span>
        <a href={link} target="_blank" rel="noreferrer">
          {icon}
        </a>
      </div>
    );
  };

  return (
    <div className={styles.movieInfo}>
      <div className={styles.outterBox} ref={props.movieInfoEl}>
        {props.loadingOpen && (
          <div className={styles.loadingAnimate}>
            <Loading />
          </div>
        )}

        <div className={styles.innerBox}>
          {props.loadingOpen && (
            <div className={styles.loadingBackground}></div>
          )}

          <div>
            <div className={styles.imageBox}>
              <div className={styles.imageWrap} ref={props.imageBoxEl}>
                {imageList ? (
                  imageList.map((path, i) => (
                    <img
                      key={i}
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
            </div>

            <div className={styles.infoBox}>
              <div className={styles.upper}>
                <div>
                  <span className={styles.subtitle}>
                    {props.movieData.localData.th &&
                      ordinalSuffix(props.movieData.localData.th)}
                    {props.movieData.localData.year}
                    {prizeTitle()}
                  </span>
                </div>
                <div className={styles.row}>
                  <div className={styles.title}>
                    <p>{props.movieData.detail.title}</p>
                    <p>{props.movieData.localData.film_name_zh}</p>
                  </div>

                  <div className={isLiked ? styles.addBtn : styles.cancelBtn}>
                    <Bookmark
                      onClick={(e) => {
                        if (props.userId) {
                          isLiked
                            ? cancelLiked(
                                e,
                                props.likedList,
                                "movie_liked",
                                movieInfo.tmdbId
                              )
                            : addLiked(e, "movie_liked", obj);
                        } else {
                          alert("登入會員才能加入收藏喔！");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.linkBox}>
                <div className={styles.box1}>
                  <div className={styles.rating}>
                    {props.movieData.omdbData.Response !== "False" && (
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
                      </>
                    )}
                  </div>

                  <div className={styles.clock}>
                    <Clock />
                    <div>{props.movieData.detail.runtime} min</div>
                  </div>

                  <div
                    className={styles.videoBtn}
                    onClick={() => {
                      if (movieInfo.videoPath.length > 0) {
                        setVideoOpen(true);
                      }
                    }}
                  >
                    <Video />
                    Trailer
                  </div>

                  {isVideoOpen && (
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
                          src={
                            movieInfo.videoPath[0] &&
                            `https://www.youtube.com/embed/${movieInfo.videoPath[0].key}?enablejsapi=1`
                          }
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.mediaSource}>
                  {mediaLink(
                    "台北市立圖書館",
                    `https://book.tpml.edu.tw/webpac/bookSearchList.do?searchtype=simplesearch&search_field=TI&search_input=${searchName}&execodehidden=true&execode=webpac.dataType.media&ebook=#searchtype=simplesearch&search_field=TI&search_input=${searchName}`,
                    <Taipeilibrary />
                  )}
                  {mediaLink(
                    "新北市立圖書館",
                    `https://webpac.tphcc.gov.tw/webpac/search.cfm?m=as&k0=${searchName}&t0=t&c0=and&y10=&y20=&cat0=&dt0=%E8%A6%96%E8%81%BD%E8%B3%87%E6%96%99&l0=&lv0=&lc0=`,
                    <NewTaipeilibrary />
                  )}
                  {mediaLink(
                    "Catch Play",
                    `https://www.catchplay.com/tw/search?keyword=${searchName}`,
                    <img src={catchplay} alt="catchplay" />
                  )}
                </div>
              </div>

              <div className={styles.flag}>
                {props.movieData.detail &&
                  props.movieData.detail.production_countries &&
                  props.movieData.detail.production_countries
                    .slice(0, 5)
                    .map((country, j) => (
                      <div className={styles.tooltip} key={j}>
                        <span className={styles.tooltiptext}>
                          {country.name}
                        </span>

                        <img
                          alt="flag"
                          src={
                            require(`../data/png100px/${country.iso_3166_1.toLowerCase()}.png`)
                              .default || ""
                          }
                        />
                      </div>
                    ))}
              </div>

              <div className={styles.overview}>
                <div>
                  <span>Overview</span>
                </div>

                {movieInfo.tmdbId && overviewChinese(props.movieData) && (
                  <div> {overviewChinese(props.movieData).overview}</div>
                )}

                <div>{props.movieData.detail.overview}</div>
              </div>
            </div>
          </div>

          <div className={styles.crew}>
            <div className={styles.outter} ref={props.crewsEl}>
              <div>
                <span className={styles.title}>Director</span>
                <div className={styles.castBox}>
                  <MovieInfoCrew
                    person={director}
                    setPersonData={setPersonData}
                    setCrewOpen={setCrewOpen}
                    setCrewLoading={setCrewLoading}
                  />
                </div>
              </div>
              <div>
                <span className={styles.title}>Cast</span>
                <div className={styles.castBox}>
                  {casts &&
                    casts.map((person, k) => (
                      <MovieInfoCrew
                        key={k}
                        person={person}
                        setPersonData={setPersonData}
                        setCrewOpen={setCrewOpen}
                        setCrewLoading={setCrewLoading}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
          {isCrewOpen && (
            <CrewPopup
              userId={props.userId}
              setCrewOpen={setCrewOpen}
              personData={personData}
              likedList={props.likedList}
              crewLoading={crewLoading}
              setCrewLoading={setCrewLoading}
              personList={props.personList}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
