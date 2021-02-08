import styles from "../../style/PrizeInfo.module.scss";
import { ReactComponent as Arrow } from "../../image/icon/arrow.svg";

export default function PrizeHandleBar(props) {
  return (
    <div
      className={styles.handleBar}
      onClick={() => {
        props.prizeBoxState
          ? props.setprizeBox(false)
          : props.setprizeBox(true);
      }}
    >
      <div>
        <Arrow
          className={styles.arrow}
          style={{
            transform: props.prizeBoxState ? "rotate(0deg)" : "rotate(180deg)",
          }}
        />
        <span>{props.currentYear}</span> FESTIVAL
      </div>
    </div>
  );
}
