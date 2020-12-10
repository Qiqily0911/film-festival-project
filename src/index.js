import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// const LISTSTATE = [
//    { film_list: "cannes", prize: "palme_d_or", order: 0 },
//    { film_list: "goldenHorse", prize: "best_film", order: 1 },
//    { film_list: "cannes", prize: "un_certain_regard", order: 2 },
// ];

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
