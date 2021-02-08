import React, { useState } from "react";
import styles from "../../style/MovieInfo.module.scss";
import { ReactComponent as Taipeilibrary } from "../../image/TaipeiCity_library.svg";
import { ReactComponent as NewTaipeilibrary } from "../../image/newTaipeiCity_library.svg";
import { ReactComponent as Imdb } from "../../image/IMDB_Logo.svg";
import { ReactComponent as Clock } from "../../image/icon/clock.svg";
import { ReactComponent as Video } from "../../image/icon/video.svg";
import catchplay from "../../image/catchplay_logo.png";
import { useSelector } from "react-redux";

function mediaLink(title, link, icon) {
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltiptext}>{title}</span>
      <a href={link} target="_blank" rel="noreferrer">
        {icon}
      </a>
    </div>
  );
}

export default function FeatureBox(props) {
  const movieData = useSelector((state) => state.setMovieData);

  const [isVideoOpen, setVideoOpen] = useState(false);

  const searchName = movieData.localData.film_name_zh
    ? movieData.localData.film_name_zh
    : movieData.localData.film_name_en;

  return (
    <div className={styles.linkBox}>
      <div className={styles.box1}>
        <div className={styles.rating}>
          {movieData.omdbData.Response !== "False" && (
            <>
              <a
                className={styles.imbdBtn}
                href={`https://www.imdb.com/title/${movieData.localData.movie_id}/`}
                target="_blank"
                rel="noreferrer"
              >
                <Imdb />
              </a>
              <span>{movieData.omdbData.imdbRating}</span>
            </>
          )}
        </div>

        <div className={styles.clock}>
          <Clock />
          <div>{movieData.detail.runtime} min</div>
        </div>

        <div
          className={styles.videoBtn}
          onClick={() => {
            if (movieData.video.results.length > 0) {
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
                  movieData.video.results[0] &&
                  `https://www.youtube.com/embed/${movieData.video.results[0].key}?enablejsapi=1`
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
  );
}
