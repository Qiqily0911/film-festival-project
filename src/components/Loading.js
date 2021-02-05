import React from "react";
import styles from "../style/Loading.module.scss";

const Text = (props) => (
  <span className={styles.loadingTextWords}>{props.name}</span>
);

export default function Loading() {
  return (
    <div className={styles.loadingText}>
      <Text name="f" />
      <Text name="i" />
      <Text name="l" />
      <Text name="m" />
      <Text name="-" />
      <Text name="l" />
      <Text name="i" />
      <Text name="n" />
      <Text name="e" />
    </div>
  );
}
