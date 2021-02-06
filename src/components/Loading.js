import React from "react";
import styles from "../style/Loading.module.scss";

const Text = (props) => (
  <span className={styles.loadingTextWords}>{props.word}</span>
);

export default function Loading() {
  return (
    <div className={styles.loadingText}>
      <Text word="f" />
      <Text word="i" />
      <Text word="l" />
      <Text word="m" />
      <Text word="-" />
      <Text word="l" />
      <Text word="i" />
      <Text word="n" />
      <Text word="e" />
    </div>
  );
}
