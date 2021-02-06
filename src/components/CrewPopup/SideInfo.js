import styles from "../../style/Crew.module.scss";
import { ReactComponent as Arrow } from "../../image/icon/arrow.svg";
import { ReactComponent as Imdb } from "../../image/IMDB_Logo.svg";
import { overviewChinese } from "../../utils";

export default function SideInfo(props) {
  return (
    // style={{ right: infoOpen ? "0" : "-30%" }}
    // className={`${styles.infoBox} ${infoOpen ? styles.move : styles.back}`
    <div
      className={styles.infoBox}
      style={{ right: props.infoOpen ? "0" : "-30%" }}
    >
      <div className={styles.arrow} onClick={() => props.setInfoOpen(false)}>
        <Arrow />
      </div>

      <div>
        {props.crewMovieData.detail.poster_path ? (
          <img
            alt="poster"
            src={`https://image.tmdb.org/t/p/w154${props.crewMovieData.detail.poster_path}`}
          />
        ) : (
          <div className={styles.noPoster}>no poster</div>
        )}
      </div>

      <div className={styles.filmTitle}>
        {props.crewMovieData.overview_translate &&
          overviewChinese(props.crewMovieData)?.title}
      </div>
      <div className={styles.filmTitle}>
        {props.crewMovieData.detail.title}
        <a
          href={`https://www.imdb.com/title/${props.crewMovieData.detail.imdb_id}`}
          target="_blank"
          rel="noreferrer"
        >
          <Imdb />
        </a>
      </div>
      <div className={styles.filmTitle2}>
        {props.crewMovieData.detail.original_title}
      </div>
      <div className={styles.overview}>
        <p ref={props.overviewEl}>
          {props.crewMovieData.overview_translate &&
            overviewChinese(props.crewMovieData)?.overview}
        </p>
        <p>{props.crewMovieData.detail.overview}</p>
      </div>
    </div>
  );
}
