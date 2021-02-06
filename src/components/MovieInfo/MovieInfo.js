import React, { useState, useEffect } from "react";
import styles from "../../style/MovieInfo.module.scss";
import Loading from "../Loading";
import ImageBox from "./ImageBox";
import UpperTitle from "./UpperTitle";
import FeatureBox from "./FeatureBox";
import FlagBox from "./FlagBox";
import OverviewBox from "./OverviewBox";
import CrewBox from "./CrewBox";
import { useSelector } from "react-redux";

function MovieInfo(props) {
  const [imageList, setImageList] = useState();
  const listState = useSelector((state) => state.setList);
  const movieData = useSelector((state) => state.setMovieData);

  useEffect(() => {
    if (movieData.images.backdrops) {
      const arr = [];
      movieData.images.backdrops.forEach((pic) => arr.push(pic.file_path));
      setImageList(arr);
    }

    setTimeout(() => {
      props.setLoadingOpen(false);
      props.infoBoxRef.movieInfoBox.current.style.overflow = "scroll";
    }, 1000);
  }, [movieData]);

  return (
    <div
      className={styles.movieInfo}
      style={
        listState.listCase < 2
          ? { right: props.movieInfoOpen ? "0" : " -100%" }
          : {}
      }
    >
      {listState.listCase < 2 && (
        <div
          className={styles.closeBtn}
          onClick={() => {
            props.setMovieInfoOpen(false);
          }}
        >
          ×
        </div>
      )}

      <div className={styles.outterBox} ref={props.infoBoxRef.movieInfoBox}>
        {props.loadingOpen && (
          <div className={styles.loadingAnimate}>
            <Loading />
          </div>
        )}

        <div className={styles.innerBox}>
          {props.loadingOpen && (
            <div className={styles.loadingBackground}></div>
          )}

          <div>
            <ImageBox imageList={imageList} infoBoxRef={props.infoBoxRef} />
            <div className={styles.infoBox}>
              <UpperTitle />
              <FeatureBox />
              <FlagBox />
              <OverviewBox />
            </div>
          </div>

          <CrewBox infoBoxRef={props.infoBoxRef} />
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
