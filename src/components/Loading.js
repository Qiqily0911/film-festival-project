import React from "react";
import styles from "../style/Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loadingText}>
      <span className={styles.loadingTextWords}>f</span>
      <span className={styles.loadingTextWords}>i</span>
      <span className={styles.loadingTextWords}>l</span>
      <span className={styles.loadingTextWords}>m</span>
      <span className={styles.loadingTextWords}>-</span>
      <span className={styles.loadingTextWords}>l</span>
      <span className={styles.loadingTextWords}>i</span>
      <span className={styles.loadingTextWords}>n</span>
      <span className={styles.loadingTextWords}>e</span>
    </div>
  );
}
