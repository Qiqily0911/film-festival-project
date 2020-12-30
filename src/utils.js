import { tmdbKey, omdbKey, firestore } from "./config";

export function dataApi(source, category, type, id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (source === "tmdb") {
      xhr.open(
        "GET",
        `https://api.themoviedb.org/3/${category}/${id}${type}?api_key=${tmdbKey}`
      );
    } else if (source === "omdb") {
      xhr.open(
        "GET",
        `https://www.omdbApi.com/?apikey=${omdbKey}&i=${id}`,
        true
      );
    }
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

export function loadMovieData(tmdbId, imdbId, localData, setMovieDataHook) {
  const tmdbApiData = ["", "/videos", "/images", "/credits", "/translations"];
  const dataArr = tmdbApiData.map((item) =>
    dataApi("tmdb", "movie", item, tmdbId)
  );
  dataArr.push(imdbId !== "" ? dataApi("omdb", "", "", imdbId) : "");

  Promise.all(dataArr).then((arr) => {
    let obj = {
      detail: arr[0],
      video: arr[1],
      images: arr[2],
      credits: arr[3],
      localData: localData,
      overview_translate: arr[4],
      omdbData: arr[5],
    };
    setMovieDataHook(obj);
  });
}

export function addLiked(e, collectionName, obj) {
  const db = firestore.collection(collectionName);
  db.add(obj).then((res) => {
    db.doc(res.id).set({ id: res.id }, { merge: true });
    console.log("success");
  });

  e.stopPropagation();
}

export function cancelLiked(e, userLikedList, collectionName, id) {
  const db = firestore.collection(collectionName);
  for (let i = 0; i < userLikedList.length; i++) {
    if (id === userLikedList[i].tmdb_id || id === userLikedList[i].person_id) {
      db.doc(userLikedList[i].id)
        .delete()
        .then(() => {
          console.log("delete");
          e.stopPropagation();
        });
    }
  }

  e.stopPropagation();
}

export function overviewChinese(source) {
  let version = source.overview_translate.translations;
  let data = "";

  version.forEach((item) => {
    if (item && item.iso_3166_1 === "CN") {
      data = item.data;
    } else if (item && item.iso_3166_1 === "TW") {
      data = item.data;
    }
  });
  return data;
}

export function ordinalSuffix(num) {
  const digit = num % 10,
    tens = num % 100;

  let numTh;
  switch (num) {
    case digit === 1 && tens !== 11:
      numTh = num + "st";
      break;
    case digit === 2 && tens !== 12:
      numTh = num + "nd";
      break;
    case digit === 3 && tens !== 13:
      numTh = num + "rd";
      break;
    default:
      numTh = num + "th";
      break;
  }

  return numTh;
}
