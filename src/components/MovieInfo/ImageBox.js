import styles from "../../style/MovieInfo.module.scss";

export default function ImageBox(props) {
  return (
    <div className={styles.imageBox}>
      <div className={styles.imageWrap} ref={props.infoBoxRef.imageBox}>
        {props.imageList ? (
          props.imageList.map((path, i) => (
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
  );
}
