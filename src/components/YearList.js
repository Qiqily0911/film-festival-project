import React, { useState, useEffect } from "react";
import styles from "../style/YearList.module.scss";
import MovieCard from "./MovieCard";
import { nanoid } from "nanoid";

function YearList(props) {
  const [showList, setShowList] = useState("");

  useEffect(() => {
    const showYearList = props.yearlist.map((yearbox) => {
      const moviePrize = yearbox.list.map((data) => data[0].prize);

      if (moviePrize.find((data) => data !== null) === undefined) {
        return null;
      } else {
        return (
          <div
            key={nanoid()}
            ref={props.yearListRefs[yearbox.year]}
            className={styles.yearBox}
            data-index={yearbox.year}
            // onScroll={()=>}
          >
            {yearbox.list.map((data) => {
              return (
                <MovieCard
                  renewData={props.renewData}
                  tmdbApi={props.tmdbApi}
                  omdbApi={props.omdbApi}
                  //  imdbRating={props.imdbRating}
                  key={nanoid()}
                  th={data[0].th}
                  year={data[0].year}
                  prize={data[0].prize}
                  atmovie_link={data[0].atmovie_link}
                  imdb_link={data[0].imdb_link}
                  movie_id={data[0].movie_id}
                  film_name_zh={data[0].film_name_zh}
                  film_name_en={data[0].film_name_en}
                  poster_path={data[0].poster_path}
                />
              );
            })}
          </div>
        );
      }
    });

    // find the min year of yearList
    if (props.listState.length !== 0) {
      for (let i = showYearList.length; i > 0; i--) {
        if (showYearList[i] !== undefined) {
          if (showYearList[i] !== null) {
            // console.log(i);
            let min = showYearList[i].props["data-index"];

            props.setMin(min);
            break;
          }
        }
      }
    }

    setShowList(showYearList);
  }, [props.yearlist]);

  //  console.log(showList);

  return (
    <div className={styles.yearListBox}>
      <div className={styles.yearList}>{showList}</div>
    </div>
  );
}

// onScroll={() => console.log(document.documentElement.scrollHeight)}
// class MyComponent extends React.Component{
//   constructor(props){
//     super(props);
//     this.myRef=React.createRef();
//   }

//   render(){
//     return  <div className={styles.yearListBox}>
//          <div ref={this.myRef} className={styles.yearList}>{showList}</div>
//       </div>
//   }
// }

export default YearList;
