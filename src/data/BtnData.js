// import React, { Component } from "react";
import oscar from "./oscar_best_film.json";
import cannes from "./CannesFilm.json";
import berlin from "./BerlinFilm.json";
import venice from "./VeniceFilm.json";
import goldenHorse from "./golden_horse_best_film.json";

// import OscarLogo from "./logo/oscar_logo.svg";
// import CannesLogo from "./logo/Cannes_logo.svg";
// import BerlinLogo from "./logo/Berlin_logo.svg";
// import GoldenHorseLogo from "./logo/Golden_Horse.svg";

import OscarLogo from "./logo/oscar_logo.png";
import CannesLogo from "./logo/Cannes_logo.png";
import BerlinLogo from "./logo/Berlin_logo.png";
import GoldenHorseLogo from "./logo/Golden_Horse.png";

export const InitListState = [
  {
    title: "奧斯卡金像獎",
    prize_zh: "最佳影片",
    list_name: "oscar",
    prize_name: "Best Film",
    prize: "best_film",
    film_list: oscar,
    logo: OscarLogo,
    order: 0,
  },
  {
    title: "坎城影展",
    prize_zh: "金棕櫚獎",
    list_name: "cannes",
    prize_name: "Palme d'Or",
    prize: "palme_d_or",
    film_list: cannes,
    logo: CannesLogo,
    order: 1,
  },
  {
    title: "金馬影展",
    prize_zh: "最佳影片",
    list_name: "goldenHorse",
    prize_name: "Best Film",
    prize: "best_film",
    film_list: goldenHorse,
    logo: GoldenHorseLogo,
    order: 2,
  },
  // {
  //    title: "柏林影展",
  //    prize_name: "Golden Bear",
  //    film_list: berlin,
  //    prize: "golden_bear",
  //    logo: BerlinLogo,
  //    order: 3,
  // },
];

export const BtnData = [
  {
    btnText: "坎城影展",
    list_name: "cannes",
    official_name: "Cannes Film Festival",
    value: cannes,
    logo: CannesLogo,
    arr: [
      {
        subBtnValue: "palme_d_or",
        subBtnText: "Palme d'Or",
        subBtnName: "金棕櫚獎",
      },

      {
        subBtnValue: "grand_prix",
        subBtnText: "Grand Prix",
        subBtnName: "評審團大獎",
      },
      {
        subBtnValue: "prix_du_jury",
        subBtnText: "Prix du Jury",
        subBtnName: "評審團最佳影片",
      },
      {
        subBtnValue: "un_certain_regard",
        subBtnText: "Un Certain Regard",
        subBtnName: "一種注目",
      },
    ],
  },
  {
    btnText: "奧斯卡金像獎",
    list_name: "oscar",
    official_name: "Academy Awards",
    value: oscar,
    logo: OscarLogo,
    arr: [
      {
        subBtnValue: "best_film",
        subBtnText: "Best Film",
        subBtnName: "最佳影片",
      },
    ],
  },
  {
    btnText: "金馬影展",
    list_name: "goldenHorse",
    official_name: "Golden Horse Film Festival",
    value: goldenHorse,
    logo: GoldenHorseLogo,
    arr: [
      {
        subBtnValue: "best_film",
        subBtnText: "Best Film",
        subBtnName: "最佳影片",
      },
      {
        subBtnValue: "best_actress",
        subBtnText: "Best Actress",
        subBtnName: "最佳女主角",
      },
    ],
  },
  {
    btnText: "柏林影展",
    list_name: "berlin",
    official_name: "Berlin International Film Festival",
    value: berlin,
    logo: BerlinLogo,
    arr: [
      {
        subBtnValue: "golden_bear",
        subBtnText: "Golden Bear",
        subBtnName: "金熊獎",
      },
    ],
  },
  {
    btnText: "威尼斯影展",
    list_name: "venice",
    official_name: "Venice Film Festival",
    value: venice,
    logo: "",
    arr: [
      {
        subBtnValue: "golden_lion",
        subBtnText: "Golden Lion",
        subBtnName: "金獅獎",
      },
    ],
  },
];
