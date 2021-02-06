import styles from "../../style/MovieInfo.module.scss";
import { useSelector } from "react-redux";
import { overviewChinese } from "../../utils";

export default function OverviewBox(props) {
  const movieData = useSelector((state) => state.setMovieData);

  return (
    <div className={styles.overview}>
      <div>
        <span>Overview</span>
      </div>

      {movieData.localData.tmdb_id && overviewChinese(movieData) && (
        <div> {overviewChinese(movieData).overview}</div>
      )}

      <div>{movieData.detail.overview}</div>
    </div>
  );
}
