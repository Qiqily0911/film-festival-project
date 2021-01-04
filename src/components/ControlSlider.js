import React from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import styles from "../style/App.module.scss";
import { yearConvert } from "../utils";

function ControlSilder(props) {
  function handleChangeStart() {
    props.setScroll(false);
  }

  function handleChangeVertical(value) {
    if (value !== props.percentValue) {
      props.setPercentValue(value);
    }
    const num = formatPc(props.percentValue);
    if (props.yearListRefs[num] !== null) {
      props.yearListRefs[num].current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  function handleScroll() {
    props.setScroll(true);
  }

  const verticalLabels = {
    25: "•",
    50: "•",
    75: "•",
  };

  const formatPc = (p) => `${yearConvert(p, props.year.max, props.year.min)}`;

  return (
    <div className={styles.slider} ref={props.slider}>
      <div className={styles.inner}>
        <div className={styles.yearText}>{props.year.max}</div>
        <Slider
          value={props.percentValue}
          orientation="vertical"
          labels={verticalLabels}
          handleLabel={formatPc(props.percentValue)}
          format={formatPc}
          onChangeStart={handleChangeStart}
          onChange={handleChangeVertical}
          onChangeComplete={handleScroll}
        />
        <div className={styles.yearText}>{props.year.min}</div>
      </div>
    </div>
  );
}

export default ControlSilder;
