import React, { useEffect, useState } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import styles from "../style/App.module.scss";

function ControlSilder(props) {
  const [refs, setRefs] = useState("");

  useEffect(() => {
    setRefs(props.yearListRefs);
  }, [props.yearListRefs]);

  function handleChangeStart() {
    props.setScroll(false);
  }
  function handleChangeVertical(value) {
    if (value !== props.percentValue) {
      props.setPercentValue(value);
    }
    let num = formatPc(props.percentValue);
    if (refs[num] !== null) {
      refs[num].current.scrollIntoView({
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

  const formatPc = (p) =>
    Math.floor(
      p * ((props.year.max - props.year.min) / 100) + props.year.min
    ).toString();

  return (
    <div className={styles.slider}>
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
