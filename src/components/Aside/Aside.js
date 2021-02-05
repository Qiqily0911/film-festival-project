import React from "react";
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
          yearListRefs={props.yearListRefs}
          setScroll={props.setScroll}
          sliderRef={props.sliderRef}
        />
      )}
    </aside>
  );
}
