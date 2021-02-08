import { tmdbKey, omdbKey, firestore } from "./config";
import { useState, useEffect } from "react";

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
  dataArr.push(imdbId !== null && dataApi("omdb", "", "", imdbId));

  Promise.all(dataArr).then((arr) => {
    arr.push(localData);
    setMovieDataHook(arr);
  });
}

export function loadUserLikedList(userId, firebaseCollection, listHook) {
  firestore
    .collection(firebaseCollection)
    .where("user", "==", userId)
    .onSnapshot((onSnapshot) => {
      const arr = [];
      onSnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      listHook(arr);
    });
}

export function addLiked(e, collectionName, obj) {
  const db = firestore.collection(collectionName);
  db.add(obj).then((res) => {
    db.doc(res.id).set({ id: res.id }, { merge: true });
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
          e.stopPropagation();
        });
    }
  }

  e.stopPropagation();
}

export function fillYearList(emptyYearList, fes, prize, order) {
  if (fes) {
    const data = fes.filter((obj) => obj.prize === prize);

    emptyYearList.forEach((yearbox) => {
      const box = yearbox.list[order];
      data.forEach((item) => {
        if (item.year === yearbox.year) {
          box.push(item);
        }
      });
      if (box.length === 0) {
        box.push({ prize: null });
      }
    });
  } else {
    emptyYearList.forEach((yearbox) => {
      yearbox.list[order].push({ prize: null });
    });
  }
}

export function makeYearBoxes(listCase) {
  const emptyYearBoxes = [];

  for (let i = 2020; i >= 1928; i--) {
    const emptyYearBox = { year: i, list: [] };
    switch (listCase) {
      case 3:
        emptyYearBox.list = [[], [], []];

        break;
      case 2:
      case 1:
        emptyYearBox.list = [[], []];

        break;
      case 0:
        emptyYearBox.list = [[]];

        break;
      default:
        emptyYearBox.list = [[], [], []];
    }

    emptyYearBoxes.push(emptyYearBox);
  }

  return emptyYearBoxes;
}

export function yearConvert(percentage, max, min) {
  return Math.floor(percentage * ((max - min) / 100) + min);
}

export function dynamicHeightPercentage(max, min, ref) {
  const interval = max - min + 1;
  const minYearBox = ref[min].current.getBoundingClientRect();
  //  console.log((window.innerHeight - 100 - minYearBox.height) / 2);
  const totalHeight = interval * minYearBox.height;
  return Math.round(((minYearBox.bottom - 100) / totalHeight) * 100);
}

export function overviewChinese(source) {
  const version = source.overview_translate.translations;
  let data;

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

  if (digit === 1 && tens !== 11) {
    numTh = num + "st";
  } else if (digit === 2 && tens !== 12) {
    numTh = num + "nd";
  } else if (digit === 3 && tens !== 13) {
    numTh = num + "rd";
  } else {
    numTh = num + "th";
  }

  return numTh;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
