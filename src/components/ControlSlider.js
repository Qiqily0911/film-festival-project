import React, { useEffect, useState } from "react";
// Using an ES6 transpiler like Babel
import Slider from "react-rangeslider";

// To include the default styles
import "react-rangeslider/lib/index.css";
// import styles from "../style/App.module.scss";

function ControlSilder(props) {
  const [refs, setRefs] = useState("");

  useEffect(() => {
    // console.log(props.yearListRefs);
    setRefs(props.yearListRefs);
    console.log(props.minYear);
  }, [props.yearListRefs]);

  function handleChangeVertical(value) {
    if (value !== props.vertical) {
      props.setVertical(value);
      //  console.log(value);
    }

    // let num = formatPc(props.vertical);

    // if (refs[num] !== null) {
    //    //  console.log(refs[num]);
    //    refs[num].current.scrollIntoView({
    //       behavior: "smooth",
    //       block: "center",
    //    });
    //    //  console.log(refs[num].current.offsetHeight);
    // }
  }

  function handleScroll() {
    let num = formatPc(props.vertical);

    if (refs[num] !== null) {
      //  console.log(refs[num]);
      refs[num].current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      //  console.log(refs[num].current.offsetHeight);
    }
  }

  const verticalLabels = {
    0: props.minYear,
    100: 2020,
  };

  const formatPc = (p) =>
    Math.floor(p * ((2020 - props.minYear) / 100) + props.minYear).toString();

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
