import React, { useState, useEffect } from "react";
import styles from "../style/MemberPage.module.scss";
import { firestore } from "../config";
import MovieCard from "./MovieCard";

// import { nanoid } from "nanoid";

export function MemberNav() {
  return (
    <div className={styles.navBox}>
      <div className={styles.navBtn}>基本資訊</div>
      <div className={styles.navBtn}>收藏夾</div>
    </div>
  );
}
export function MemberPage(props) {
  //    const [showList, setShowList] = useState("");
  //    const [likedList, setLikedList] = useState();
  //    const movieLiked = firestore.collection("movie_liked");
  //    const users = firestore.collection("users");

  //    console.log(props.userData);
  // 取得使用者收藏清單，並設訂變數 likedList

  //    useEffect(() => {
  //       if (props.userId && props.memberPage) {
  //          movieLiked.where("user", "==", props.userId).onSnapshot((onSnapshot) => {
  //             let arr = [];
  //             onSnapshot.forEach((doc) => {
  //                arr.push(doc.data());
  //             });
  //             setLikedList(arr);
  //             console.log(arr);
  //          });
  //       }
  //    }, [props.userId]);

  //    console.log(likedList);
  //    if (likedList !== undefined) {
  //       console.log(likedList[0].film_name_zh);
  //    }

  return (
    <>
      <div className={styles.movieCardBox}>
        <div className={styles.innerBox}>
          {props.likedList &&
            props.likedList.map((data, i) => (
              <MovieCard
                key={i}
                movie_id={data.movie_id}
                tmdb_id={data.tmdb_id}
                film_name_zh={data.film_name_zh}
                film_name_en={data.film_name_en}
                poster_path={data.poster_path}
                userId={props.userId}
                isLiked={true}
                memberPage={props.memberPage}
                likedList={props.likedList}
                cancelLiked={props.cancelLiked}
              />
            ))}
        </div>
      </div>
    </>
  );
}
