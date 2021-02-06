import styles from "../../style/MovieInfo.module.scss";
import { useSelector } from "react-redux";

export default function FlagBox() {
  const movieData = useSelector((state) => state.setMovieData);

  return (
    <div className={styles.flag}>
      {movieData.detail?.production_countries &&
        movieData.detail.production_countries.slice(0, 5).map((country, j) => (
          <div className={styles.tooltip} key={j}>
            <span className={styles.tooltiptext}>{country.name}</span>

            <img
              alt="flag"
              src={
                require(`../../data/png100px/${country.iso_3166_1.toLowerCase()}.png`)
                  .default || ""
              }
            />
          </div>
        ))}
    </div>
  );
}
