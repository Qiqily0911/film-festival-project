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
    console.log(props.yearListRefs);
    setRefs(props.yearListRefs);
  }, [props.yearListRefs]);

  function handleChangeVertical(value) {
    if (value !== props.vertical) {
      props.setVertical(value);
      console.log(value);
    }
  }

  function handleScroll() {
    let num = formatPc(props.vertical);
    console.log(refs[num]);
    refs[num].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

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
