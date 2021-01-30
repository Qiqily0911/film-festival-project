import React from "react";
import { BtnData } from "../../data/LocalSource";
import { ReactComponent as Arrow } from "../../image/icon/arrow.svg";
import styles from "../../style/PrizeInfo.module.scss";
import { loadMovieData, yearConvert, ordinalSuffix } from "../../utils";

function PrizeInfo(props) {
  const year = yearConvert(props.percentValue, props.year.max, props.year.min);

  const content = (list, index) => {
    const templist = list.film_list || [];

    function loadData(tmdbId, imdbId, data) {
      props.setMovieInfoOpen(true);
      props.resetInfoPosition();
      loadMovieData(tmdbId, imdbId, data, props.setMovieData);
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
                      .filter((film) => film.year === year)
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
                              props.prizeArr.includes(prize.dataId) &&
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
  if (props.listCase === 3) {
    openState = "27.6%";
    closeState = "calc(-36.8% + 40px)";
  } else if (props.listCase === 2) {
    openState = "36%";
    closeState = "-18%";
  } else if (props.listCase < 2) {
    openState = "0";
    closeState = "-90%";
  }

  return (
    <div
      className={styles.prizeInfo}
      style={{ right: props.prizeBoxState ? openState : closeState }}
    >
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
              transform: props.prizeBoxState
                ? "rotate(0deg)"
                : "rotate(180deg)",
            }}
          />
          <span>{year}</span> FESTIVAL
        </div>
      </div>
      <div className={styles.outterBox}>
        <div className={styles.innerBox}>
          {props.listState.map((list, i) => content(list, i))}
        </div>
      </div>
    </div>
  );
}

export default PrizeInfo;
