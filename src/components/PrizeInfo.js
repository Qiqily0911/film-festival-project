import React, { useState, useEffect } from "react";
import { BtnData } from "../data/BtnData";
import { ReactComponent as Arrow } from "../image/icon/arrow.svg";
import styles from "../style/PrizeInfo.module.scss";

function PrizeInfo(props) {
  const year = Math.floor(
    props.vertical * ((props.maxYear - props.minYear) / 100) + props.minYear
  );
  const [prizeArr, setPrizeArr] = useState([]);

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

      let arr = [...props.listState];

      // 選不同獎項
      for (let i = 0; i < props.listState.length; i++) {
        if (props.listState[i].film_list !== undefined) {
          if (btnSelect.title === props.listState[i].title) {
            if (btnSelect.prize === props.listState[i].prize) {
              alert("選過囉");
              return;
            }
          }
        }
      }

      arr[index] = btnSelect;

      props.setlistState(arr);
      props.setVertical(100);
    }

    // 依據每筆資料的 data_id 找對應名稱
    let prizeId = (dataId) => dataId.substring(dataId.length - 1) - 1;
    let prizeName = (i, data) => BtnData[i].arr[prizeId(data.data_id)];

    if (list.film_list !== undefined) {
      for (let i = 0; i < BtnData.length; i++) {
        if (list.list_name === BtnData[i].list_name) {
          //  console.log(list.list_name);
          return (
            <div className={styles.prizeData} key={index}>
              <div className={styles.inner}>
                <div className={styles.upper}>
                  <div className={styles.logo}>
                    <a
                      href={BtnData[i].web_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <list.logo />
                    </a>
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
                        //  console.log(data);
                        return (
                          <div
                            data-id={data.movie_id}
                            className={styles.winner}
                            key={j}
                          >
                            <div className={styles.th}>
                              {props.ordinalSuffix(data.th)}
                            </div>
                            <div>
                              <div className={styles.prizeName}>
                                <div>{prizeName(i, data).subBtnName}</div>
                                <div>{prizeName(i, data).subBtnText}</div>
                              </div>
                              <div
                                className={styles.filmName}
                                onClick={() => {
                                  let movieId = data.tmdb_id;
                                  props.infoWrap.current.style.overflow =
                                    "hidden";
                                  props.setLoadingOpen(true);

                                  if (
                                    props.movieInfoEl.current &&
                                    props.crewsEl.current !== null
                                  ) {
                                    props.crewsEl.current.scrollLeft = 0;
                                    props.movieInfoEl.current.scrollIntoView({
                                      behavior: "smooth",
                                      block: "start",
                                    });
                                    console.log("reset scroll");
                                  }

                                  Promise.all([
                                    props.tmdbApi("", movieId),
                                    props.tmdbApi("/videos", movieId),
                                    props.tmdbApi("/images", movieId),
                                    props.tmdbApi("/credits", movieId),
                                    data.movie_id !== ""
                                      ? props.omdbApi(data.movie_id)
                                      : "",
                                    props.tmdbApi("/translations", movieId),
                                  ]).then((arr) => {
                                    props.setMovieData({
                                      ...props.movieData,
                                      detail: arr[0],
                                      video: arr[1],
                                      images: arr[2],
                                      credits: arr[3],
                                      localData: data,
                                      omdbData: arr[4],
                                      overview_translate: arr[5],
                                    });
                                  });
                                }}
                              >
                                {data.film_name_zh} {data.film_name_en}
                                <br />
                                {data.director_zh ? data.director_zh : ""}
                                {data.director ? data.director : ""}
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
                      {/* {BtnData[i].description} */}
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
      {/* right: 27.6%; */}
      {/* "70.68% " */}

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
