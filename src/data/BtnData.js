// import React, { Component } from "react";
import oscar from "./Oscar_best_film.json";
import cannes from "./CannesFilm.json";
import berlin from "./BerlinFilm.json";
import venice from "./VeniceFilm.json";
import goldenHorse from "./Golden_horse.json";

import { ReactComponent as OscarLogo } from "../image/fes/oscar.svg";
import { ReactComponent as CannesLogo } from "../image/fes/cannes-festival.svg";
import { ReactComponent as BerlinLogo } from "../image/fes/berlin-festival.svg";
import { ReactComponent as GoldenHorseLogo } from "../image/fes/golden-horse.svg";
import { ReactComponent as VeniceLogo } from "../image/fes/venice-festival.svg";

// import  OscarLogo  from "../image/fes/oscar.svg";
// import  CannesLogo  from "../image/fes/cannes-festival.svg";
// import  BerlinLogo  from "../image/fes/berlin-festival.svg";
// import  GoldenHorseLogo  from "../image/fes/golden-horse.svg";
// import  VeniceLogo  from "../image/fes/venice-festival.svg";

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
  // {
  //    title: "柏林影展",
  //    prize_zh: "金熊獎",
  //    prize_name: "Golden Bear",
  //    list_name: "berlin",
  //    film_list: berlin,
  //    prize: "golden_bear",
  //    logo: BerlinLogo,
  //    order: 2,
  // },
  {
    title: "金馬影展",
    prize_zh: "最佳劇情片",
    list_name: "goldenHorse",
    prize_name: "Best Film",
    prize: "best_film",
    film_list: goldenHorse,
    logo: GoldenHorseLogo,
    order: 2,
  },
];

export const BtnData = [
  {
    btnText: "坎城影展",
    list_name: "cannes",
    official_name: "Cannes Film Festival",
    value: cannes,
    logo: CannesLogo,
    web_link: "https://www.festival-cannes.com/en/",
    description:
      "The Cannes Festival  (Festival de Cannes) , until 2003 called the International Film Festival and known in English as the Cannes Film Festival, is an annual film festival held in Cannes, France, which previews new films of all genres, including documentaries, from all around the world. Founded in 1946, the invitation-only festival is held annually (usually in May) at the Palais des Festivals et des Congrès. ",
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
    web_link: "https://oscar.go.com/",
    description:
      'The Academy Awards, popularly known as the Oscars, are awards for artistic and technical merit in the film industry. It is regarded as the most famous and prestigious awards in the entertainment industry. Given annually by the Academy of Motion Picture Arts and Sciences (AMPAS), the awards are an international recognition of excellence in cinematic achievements, as assessed by the Academy\'s voting membership. The various category winners are awarded a copy of a golden statuette as a trophy, officially called the "Academy Award of Merit", although more commonly referred to by its nickname, the "Oscar". ',
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
    web_link: "https://www.goldenhorse.org.tw/?r=en",
    description:
      "The Taipei Golden Horse Film Festival and Awards  (台北金馬影展)  is a film festival and awards ceremony held annually in Taiwan. It was founded in 1962 by the Government Information Office of the Republic of China (ROC) in Taiwan. The awards ceremony is usually held in November or December in Taipei, although the event has also been held in other locations in Taiwan in recent times.",
    arr: [
      {
        subBtnValue: "best_film",
        subBtnText: "Best Film",
        subBtnName: "最佳劇情片",
      },
      {
        subBtnValue: "best_director",
        subBtnText: "Best Director",
        subBtnName: "最佳導演獎",
      },
    ],
  },
  {
    btnText: "柏林影展",
    list_name: "berlin",
    official_name: "Berlin International Film Festival",
    value: berlin,
    logo: BerlinLogo,
    web_link: "https://www.berlinale.de/en/home.html",
    description:
      'The Berlin International Film Festival  (Internationale Filmfestspiele Berlin) , usually called the Berlinale, is a film festival held annually in Berlin, Germany. Founded in West Berlin in 1951, the festival has been held every February since 1978 and is one of the "Big Three" alongside the Venice Film Festival in Italy and the Cannes Film Festival in France.',
    arr: [
      {
        subBtnValue: "golden_bear",
        subBtnText: "Golden Bear",
        subBtnName: "金熊獎",
      },
      {
        subBtnValue: "jury_grand_prix",
        subBtnText: "Silver Bear Grand Jury Prix",
        subBtnName: "銀熊獎評審團大獎",
      },
    ],
  },
  {
    btnText: "威尼斯影展",
    list_name: "venice",
    official_name: "Venice Film Festival",
    value: venice,
    logo: VeniceLogo,
    web_link: "https://www.labiennale.org/en",
    description:
      "The Venice Film Festival or Venice International Film Festival  (Mostra Internazionale d'Arte Cinematografica della Biennale di Venezia)  is the world's oldest film festival and one of the \"Big Three\" film festivals, alongside the Cannes Film Festival in France and the Berlin International Film Festival in Germany. The Big Three are internationally acclaimed for giving creators the artistic freedom to express themselves through film. In 1951, FIAPF formally accredited the festival.",
    arr: [
      {
        subBtnValue: "golden_lion",
        subBtnText: "Golden Lion",
        subBtnName: "金獅獎",
      },
    ],
  },
];
