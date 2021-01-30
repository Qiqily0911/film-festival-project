import React, { useState, useEffect, useRef } from "react";
import styles from "../../style/App.module.scss";
import ControlSilder from "../Aside/ControlSlider";
import { ReactComponent as Logo } from "../../image/logo-2.svg";

export default function Aside(props) {
  return (
    <aside>
      <div
        className={styles.logo}
        onClick={() => {
          props.setMemberPage(false);
        }}
      >
        <Logo />
      </div>
      {props.memberPage ? (
        <div className={styles.slider}></div>
      ) : (
        <ControlSilder
          percentValue={props.percentValue}
          setPercentValue={props.setPercentValue}
          yearListRefs={props.yearListRefs}
          year={props.year}
          setYear={props.setYear}
          setScroll={props.setScroll}
          isScroll={props.isScroll}
          slider={props.slider}
        />
      )}
    </aside>
  );
}
