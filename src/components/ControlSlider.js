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
    if (value !== props.vertical) {
      props.setVertical(value);
    }
    let num = formatPc(props.vertical);
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
    0: props.minYear,
    100: props.maxYear,
  };

  const formatPc = (p) =>
    Math.floor(
      p * ((props.maxYear - props.minYear) / 100) + props.minYear
    ).toString();

  return (
    <div className={styles.slider}>
      <div className={styles.yearText}>{props.maxYear}</div>
      <Slider
        //   FIXME: fix when listState===undefined can't grab the slider
        value={props.vertical}
        orientation="vertical"
        labels={verticalLabels}
        handleLabel={formatPc(props.vertical)}
        format={formatPc}
        onChangeStart={handleChangeStart}
        onChange={handleChangeVertical}
        onChangeComplete={handleScroll}
      />
      <div className={styles.yearText}>{props.minYear}</div>
    </div>
  );
}

export default ControlSilder;
