import React, { useEffect } from "react";
import styles from "../../style/YearList.module.scss";
import MovieCard from "./MovieCard";
import NotFoundCard from "./NotFoundCard";
import { dynamicHeightPercentage } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { setPercentValue, setYear } from "../../globalState/actions";

function YearList(props) {
  const listState = useSelector((state) => state.setList);
  const userLike = useSelector((state) => state.userLike);
  const yearRange = useSelector((state) => state.setYear);
  const dispatch = useDispatch();

  useEffect(() => {
    const sliderStyle = props.sliderRef.current.style;
    if (listState.list.every((item) => !item.film_list)) {
      sliderStyle.visibility = "hidden";
    } else {
      sliderStyle.visibility = "visible";
      const arr = listState.list.map(
        (item) => item.film_list && item.film_list.map((film) => film.year)
      );

      const max = [];
      const min = [];

      arr.forEach((list) => {
        if (list) {
          max.push(Math.max(...list));
          min.push(Math.min(...list));
        }
      });

      dispatch(setYear(Math.max(...max), Math.min(...min)));
    }
  }, [props.yearlist]);

  function detectScroll() {
    if (props.isScroll) {
      const percentage = dynamicHeightPercentage(
        yearRange.max,
        yearRange.min,
        props.yearListRefs
      );
      dispatch(setPercentValue(percentage));
    }
  }

  const isLiked = (data) =>
    userLike.movieList &&
    userLike.movieList.find((item) => item.movie_id === data[0].movie_id);

  return (
    <div className={styles.yearListBox} onWheel={detectScroll}>
      <div className={styles.yearList}>
        {props.yearlist.map((yearbox, i) =>
          yearbox.list
            .map((filmData) => filmData[0].prize)
            .every((data) => data === null) ? null : (
            <div
              key={i}
              ref={props.yearListRefs[yearbox.year]}
              className={styles.yearBox}
            >
              <div className={styles.yearTitle}>
                <div className={styles.line}></div>
                <span>{yearbox.year}</span>
                <div className={styles.line}></div>
              </div>
              <div className={styles.cardWrap}>
                {yearbox.list.map((data, j) =>
                  data[0].prize === null ? (
                    <NotFoundCard key={j} />
                  ) : (
                    <MovieCard
                      setMovieInfoOpen={props.setMovieInfoOpen}
                      key={j}
                      data={data[0]}
                      isLiked={Boolean(isLiked(data))}
                      setLoadingOpen={props.setLoadingOpen}
                      resetInfoPosition={props.resetInfoPosition}
                    />
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default YearList;
