import React from "react";
import styles from "../../style/App.module.scss";
import { AuthProvider } from "../../contexts/AuthContexts";
import MovieFilter from "./MovieFilter";
import { MemberNav, MemberBtn } from "./MemberNav";

export default function Navbar(props) {
  return (
    <div className={styles.navbar}>
      {props.memberPage ? (
        <MemberNav setMemberPage={props.setMemberPage} />
      ) : (
        <MovieFilter
          setPrizeArr={props.setPrizeArr}
          selectPrize={props.selectPrize}
        />
      )}

      <AuthProvider>
        <MemberBtn
          memberPage={props.memberPage}
          setMemberPage={props.setMemberPage}
          setprizeBox={props.setprizeBox}
        />
      </AuthProvider>
    </div>
  );
}
