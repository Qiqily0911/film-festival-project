import React, { useEffect, useState } from "react";
// Using an ES6 transpiler like Babel
import Slider from "react-rangeslider";

// To include the default styles
import "react-rangeslider/lib/index.css";
// import styles from "../style/App.module.scss";

function ControlSilder(props) {
  //  componentDidMount() {
  //     console.log(this.props.yearListRefs);
  //     console.log(this.myInput.current.offsetHeight);
  //     console.log(typeof this.myInput);
  //  }

  const [refs, setRefs] = useState("");

  useEffect(() => {
    // console.log(props.yearListRefs);
    setRefs(props.yearListRefs);
    console.log(props.minYear);
  }, [props.yearListRefs]);

  function handleChangeVertical(value) {
    if (value !== props.vertical) {
      props.setVertical(value);
      console.log(value);
    }
  }

  function handleScroll() {
    let num = formatPc(props.vertical);

    if (refs[num] !== null) {
      console.log(refs[num]);
      refs[num].current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      console.log(refs[num].current.offsetHeight);
    }
  }

  const max = 2020;
  const min = props.minYear;
  const verticalLabels = {
    0: min,
    100: max,
  };

  const formatPc = (p) => Math.floor(p * ((max - min) / 100) + min);

  return (
    <div className="slider">
      <Slider
        value={props.vertical}
        orientation="vertical"
        labels={verticalLabels}
        handleLabel={formatPc(props.vertical)}
        format={formatPc}
        onChange={handleChangeVertical}
        onChangeComplete={handleScroll}
      />
    </div>
  );
}

export default ControlSilder;
