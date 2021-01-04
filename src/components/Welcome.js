import React from "react";
import styles from "../style/App.module.scss";
import { ReactComponent as MainLogo } from "../image/logo.svg";

export default function WelcomePage(props) {
  const closeClass = props.welcomeOpen ? "" : styles.welcomeClose;
  return (
    <div className={`${styles.welcome} ${closeClass}`} ref={props.welcomeRef}>
      <div className={styles.mainLogo}>
        <MainLogo />
      </div>
      <div className={styles.text}>
        <div>
          結合電影＋時間軸 <br />
          探索影展獲獎好片
        </div>
        <div
          className={styles.enterBtn}
          onClick={() => {
            props.setWelcome(false);
            setTimeout(
              () => (props.welcomeRef.current.style.display = "none"),
              1000
            );
          }}
        >
          開始探索
        </div>
      </div>
    </div>
  );
}
