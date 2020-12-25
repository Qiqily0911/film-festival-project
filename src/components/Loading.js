import React, { useState, useEffect } from "react";
import styles from "../style/Loading.module.scss";

export default function Loading() {
  return (
    // <div className={styles.box}>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    //   <div className={styles.brick}></div>
    // </div>
    // <div className={styles.loading}>
    <div className={styles.loadingText}>
      <span className={styles.loadingTextWords}>f</span>
      <span className={styles.loadingTextWords}>i</span>
      <span className={styles.loadingTextWords}>l</span>
      <span className={styles.loadingTextWords}>m</span>
      <span className={styles.loadingTextWords}>l</span>
      <span className={styles.loadingTextWords}>i</span>
      <span className={styles.loadingTextWords}>n</span>
      <span className={styles.loadingTextWords}>e</span>
    </div>
    // </div>
  );
}
