import oscar from "./oscar_best_film.json";
import cannes from "./CannesFilm.json";
import goldenHorse from "./golden_horse_best_film.json";

export const InitListState = [
  {
    title: "奧斯卡金像獎",
    prize_name: "Best Film",
    film_list: oscar,
    prize: "best_film",
    order: 0,
  },
  {
    title: "坎城影展",
    prize_name: "Palme d'Or",
    film_list: cannes,
    prize: "palme_d_or",
    order: 1,
  },
  {
    title: "金馬影展",
    prize_name: "Best Film",
    film_list: goldenHorse,
    prize: "best_film",
    order: 2,
  },
];

export const BtnData = [
  {
    btnText: "坎城影展",
    value: cannes,
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
    arr: [{ subBtnValue: "best_film", subBtnText: "Best Film" }],
  },
  {
    btnText: "金馬影展",
    value: goldenHorse,
    arr: [
      { subBtnValue: "best_film", subBtnText: "Best Film" },
      { subBtnValue: "best_actress", subBtnText: "Best Actress" },
    ],
  },
];
