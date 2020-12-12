import oscar from "./oscar_best_film.json";
import cannes from "./CannesFilm.json";
import goldenHorse from "./golden_horse_best_film.json";

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
