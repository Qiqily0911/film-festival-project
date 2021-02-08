import React from "react";
import { BtnData } from "../../data/LocalSource";
import PrizeHandleBar from "./PrizeHandleBar";
import styles from "../../style/PrizeInfo.module.scss";
import { loadMovieData, ordinalSuffix } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { setMovieData } from "../../globalState/actions";

function PrizeInfo(props) {
  const dispatch = useDispatch();
  const percentValue = useSelector((state) => state.setPercentYear);
  const listState = useSelector((state) => state.setList);
  const currentYear = percentValue.percent.currentYear;

  const column = (list, index) => {
    const templist = list.film_list || [];

    function loadData(tmdbId, imdbId, data) {
      props.setMovieInfoOpen(true);
      props.resetInfoPosition();
      const setMovieDataReducer = (arr) => dispatch(setMovieData(arr));
      loadMovieData(tmdbId, imdbId, data, setMovieDataReducer);
    }

    const prizeId = (dataId) => dataId.substring(dataId.length - 1) - 1;
    const prizeName = (i, data) => BtnData[i].arr[prizeId(data.data_id)];

    if (list.film_list) {
      for (let i = 0; i < BtnData.length; i++) {
        if (list.list_name === BtnData[i].list_name) {
          return (
            <div className={styles.prizeData} key={index}>
              <div className={styles.inner}>
                <div className={styles.upper}>
                  <div className={styles.logo}>
                    <list.logo />
                  </div>
                  <div className={styles.title}>
                    <div>{BtnData[i].btnText}</div>
                    <div>{BtnData[i].official_name}</div>
                  </div>
                </div>

                <div className={styles.lower}>
                  <div>
                    {templist
                      .filter((film) => film.year === currentYear)
                      .map((data, j) => {
                        return (
                          <div
                            data-id={data.movie_id}
                            className={styles.winner}
                            key={j}
                          >
                            <div>
                              <div className={styles.prizeName}>
                                <div>{ordinalSuffix(data.th)}</div>
                                <div>{prizeName(i, data).subBtnName}</div>
                              </div>
                              <div
                                className={styles.filmName}
                                onClick={() => {
                                  const movieId = data.tmdb_id;
                                  loadData(movieId, data.movie_id, data);
                                }}
                              >
                                <span>
                                  {data.film_name_zh} {data.film_name_en}
                                </span>
                                {data.director && (
                                  <>
                                    <br />
                                    <span>
                                      {data.director_zh && data.director_zh}
                                    </span>
                                    <span>
                                      {data.director && data.director}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className={styles.description}>
                    <div>
                      <span>Introduction</span>
                    </div>
                    <div>
                      <div> {BtnData[i].description}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
    } else {
      return (
        <div className={styles.prizeData} key={index}>
          <div className={styles.inner}>
            {BtnData.map((fes, k) => {
              return (
                <div className={styles.upper2} key={k}>
                  <div className={styles.title}> {fes.btnText}</div>
                  <div>
                    {fes.arr.map((prize, l) => {
                      return (
                        <div
                          key={l}
                          className={styles.prizeName}
                          onClick={() => props.selectPrize(fes, prize, index)}
                          style={{
                            color:
                              listState.prize.includes(prize.dataId) &&
                              "#ad9654",
                          }}
                        >
                          {prize.subBtnName}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  let openState;
  let closeState;
  if (listState.listCase === 3) {
    openState = "27.6%";
    closeState = "calc(-36.8% + 40px)";
  } else if (listState.listCase === 2) {
    openState = "36%";
    closeState = "-18%";
  } else if (listState.listCase < 2) {
    openState = "0";
    closeState = "-90%";
  }

  return (
    <div
      className={styles.prizeInfo}
      style={{ right: props.prizeBoxState ? openState : closeState }}
    >
      <PrizeHandleBar
        prizeBoxState={props.prizeBoxState}
        setprizeBox={props.setprizeBox}
        currentYear={currentYear}
      />

      <div className={styles.outterBox}>
        {/* {console.log(listState.list)} */}
        <div className={styles.innerBox}>
          {listState.list.map((list, i) => column(list, i))}
        </div>
      </div>
    </div>
  );
}

export default PrizeInfo;
