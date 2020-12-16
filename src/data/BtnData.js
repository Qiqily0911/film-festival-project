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
    prize_name: "Best Film",
    film_list: oscar,
    prize: "best_film",
    logo: OscarLogo,
    order: 0,
  },
  {
    title: "坎城影展",
    prize_name: "Palme d'Or",
    film_list: cannes,
    prize: "palme_d_or",
    logo: CannesLogo,
    order: 1,
  },
  {
    title: "金馬影展",
    prize_name: "Best Film",
    film_list: goldenHorse,
    prize: "best_film",
    logo: GoldenHorseLogo,
    order: 2,
  },
];

export const BtnData = [
  {
    btnText: "坎城影展",
    value: cannes,
    logo: CannesLogo,
    arr: [
      { subBtnValue: "palme_d_or", subBtnText: "Palme d'Or" },
      {
        subBtnValue: "un_certain_regard",
        subBtnText: "Un Certain Regard",
      },
    ],
  },
  {
    btnText: "奧斯卡金像獎",
    value: oscar,
    logo: OscarLogo,
    arr: [{ subBtnValue: "best_film", subBtnText: "Best Film" }],
  },
  {
    btnText: "金馬影展",
    value: goldenHorse,
    logo: GoldenHorseLogo,
    arr: [
      { subBtnValue: "best_film", subBtnText: "Best Film" },
      { subBtnValue: "best_actress", subBtnText: "Best Actress" },
    ],
  },
  {
    btnText: "柏林影展",
    value: berlin,
    logo: BerlinLogo,
    arr: [{ subBtnValue: "golden_bear", subBtnText: "Golden Bear" }],
  },
  {
    btnText: "威尼斯影展",
    value: venice,
    logo: "",
    arr: [{ subBtnValue: "golden_lion", subBtnText: "Golden Lion" }],
  },
];
