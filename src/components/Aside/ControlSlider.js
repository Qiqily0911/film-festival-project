import React from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import styles from "../../style/App.module.scss";
import { yearConvert } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import {
  setListWidth,
  setListAdd,
  setPercentValue,
} from "../../globalState/actions";

function ControlSilder(props) {
  const percentValue = useSelector((state) => state.setPercentValue);
  const dispatch = useDispatch();

  function handleChangeStart() {
    props.setScroll(false);
  }

  function handleChangeVertical(value) {
    if (value !== percentValue) {
      dispatch(setPercentValue(value));
    }
    const num = formatPc(percentValue);
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
          value={percentValue}
          orientation="vertical"
          labels={verticalLabels}
          handleLabel={formatPc(percentValue)}
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
