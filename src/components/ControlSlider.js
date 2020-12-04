import React, { Component } from "react";
// Using an ES6 transpiler like Babel
import Slider from "react-rangeslider";

// To include the default styles
import "react-rangeslider/lib/index.css";
// import styles from "../style/App.module.scss";

class ControlSilder extends Component {
  handleChangeVertical = (value) => {
    if (value !== this.props.vertical) {
      this.props.setVertical(value);
      console.log(value);
    }

    console.log(this.props.yearListRefs);
    const refs = this.props.yearListRefs;
    refs?.[1900].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  render() {
    const { vertical } = this.props;
    const a = 2020;
    const b = 1928;
    const verticalLabels = {
      0: b,
      100: a,
    };

    const formatPc = (p) => Math.floor(p * ((a - b) / 100) + b);

    return (
      <div className="slider">
        <Slider
          value={vertical}
          orientation="vertical"
          labels={verticalLabels}
          handleLabel={formatPc(vertical)}
          format={formatPc}
          onChange={this.handleChangeVertical}
        />
      </div>
    );
  }
}

export default ControlSilder;

// class ControlSilder extends React.Component {
//    constructor(props) {
//       super(props);
//       this.state = {};
//    }

//    // sliderContainerHeight() {
//    //    sliderContainer.offsetHeight;
//    //    console.log(sliderContainerHeight);
//    // }

//    // setPercentage() {
//    //    thumb.style.transform = "translateY(" + (percentage / 100 + sliderContainerHeight) + "px)";
//    // }

//    // setPercentage();
//    render() {
//       return (
//          <div className={styles.sliderContainer}>
//             <div className={styles.track}></div>
//             <div className={styles.thumb}></div>
//          </div>
//       );
//    }
// }

// export default ControlSilder;
