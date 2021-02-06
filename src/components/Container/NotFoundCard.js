import styles from "../../style/MovieCard.module.scss";

export default function NotFoundCard() {
  return (
    <div className={styles.movieCard} style={{ cursor: "default" }}>
      <div className={styles.notFound}></div>
      <div className={styles.basicInfo}>
        <div>
          <div className={styles.titleZh}>尚無資料</div>
        </div>
      </div>
    </div>
  );
}
