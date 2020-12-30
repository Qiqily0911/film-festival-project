import React, { useState, useEffect } from "react";
import { BtnData } from "../data/LocalSource";
import { ReactComponent as Arrow } from "../image/icon/arrow.svg";
import styles from "../style/PrizeInfo.module.scss";
import { loadMovieData, ordinalSuffix } from "../utils";

function PrizeInfo(props) {
  const year = Math.floor(
    props.percentValue * ((props.year.max - props.year.min) / 100) +
      props.year.min
  );
  const [prizeArr, setPrizeArr] = useState([]);

  // 取出prize的id作為檢查依據
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      if (props.listState[i].film_list !== undefined) {
        arr.push(props.listState[i].prizeId);
      } else {
        arr.push(null);
      }
    }
    setPrizeArr(arr);
  }, [props.listState]);

  const content = (list, index) => {
    let templist = list.film_list || [];

    // 設定影展和獎項
    function selectPrize(fes, prize) {
      let btnSelect = {
        title: fes.btnText,
        prize_zh: prize.subBtnName,
        prize_name: prize.subBtnText,
        list_name: fes.list_name,
        film_list: fes.value,
        prize: prize.subBtnValue,
        prizeId: prize.subBtnId,
        logo: fes.logo,
        order: index,
      };

      for (let i = 0; i < props.listState.length; i++) {
        if (props.listState[i].film_list !== undefined) {
          if (
            btnSelect.title === props.listState[i].title &&
            btnSelect.prize === props.listState[i].prize
          ) {
            alert("選過囉");
            return;
          }
        }
      }

      let arr = [...props.listState];
      arr[index] = btnSelect;

      props.setlistState(arr);
      props.setPercentValue(100);
    }

    function loadData(tmdbId, imdbId, data) {
      props.resetInfoPosition();
      loadMovieData(tmdbId, imdbId, data, props.setMovieData);
    }

    // 依據每筆資料的 data_id 找對應名稱
    let prizeId = (dataId) => dataId.substring(dataId.length - 1) - 1;
    let prizeName = (i, data) => BtnData[i].arr[prizeId(data.data_id)];

    if (list.film_list !== undefined) {
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
                                <div>{prizeName(i, data).subBtnText}</div>
                              </div>
                              <div
                                className={styles.filmName}
                                onClick={() => {
                                  let movieId = data.tmdb_id;
                                  loadData(movieId, data.movie_id, data);
                                }}
                              >
                                <span>
                                  {data.film_name_zh} {data.film_name_en}
                                </span>
                                {data.director ? (
                                  <>
                                    <br />
                                    <span>
                                      {data.director_zh ? data.director_zh : ""}
                                    </span>
                                    <span>
                                      {data.director ? data.director : ""}
                                    </span>
                                  </>
                                ) : (
                                  ""
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
            {BtnData.map((fes) => {
              return (
                <div className={styles.upper2}>
                  <div className={styles.title}> {fes.btnText}</div>
                  <div>
                    {fes.arr.map((prize) => {
                      return (
                        <div
                          className={styles.prizeName}
                          onClick={() => selectPrize(fes, prize)}
                          style={{
                            color: prizeArr.includes(prize.subBtnId)
                              ? "#ad9654"
                              : "",
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

  return (
    <div
      className={styles.prizeInfo}
      style={{ right: props.prizeBoxState ? "27.6%" : "calc(-36.8% + 40px)" }}
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
