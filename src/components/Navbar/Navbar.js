import React, { useState, useEffect, useRef } from "react";
import styles from "../../style/App.module.scss";
import { AuthProvider } from "../../contexts/AuthContexts";

import MovieFilter from "./MovieFilter";
import { MemberNav, MemberBtn } from "./MemberNav";
import {
  setListAdd,
  setPercentValue,
  setListWidth,
  setListCase,
} from "../../globalState/actions";

export default function Navbar(props) {
  return (
    <div className={styles.navbar}>
      {props.memberPage ? (
        <MemberNav setMemberPage={props.setMemberPage} />
      ) : (
        <MovieFilter
          yearListRefs={props.yearListRefs}
          selectPrize={props.selectPrize}
          prizeArr={props.prizeArr}
        />
      )}

      <AuthProvider>
        <MemberBtn
          setUserId={props.setUserId}
          memberPage={props.memberPage}
          setMemberPage={props.setMemberPage}
          setprizeBox={props.setprizeBox}
        />
      </AuthProvider>
    </div>
  );
}
