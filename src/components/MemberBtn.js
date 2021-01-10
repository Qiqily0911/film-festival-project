import React, { useState, useEffect } from "react";
import styles from "../style/MemberBtn.module.scss";
import Login from "./Login";
import { useAuth } from "../contexts/AuthContexts";

import { ReactComponent as LoginIcon } from "../image/icon/login.svg";
import { ReactComponent as LogoutIcon } from "../image/icon/logout.svg";

function MemberBtn(props) {
  const { logout, currentUser } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logout();
      props.setMemberPage(false);
      props.setUserId("");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    if (currentUser) {
      setLogin(true);
      setOpen(false);
    } else {
      setLogin(false);
    }
  }, [currentUser, props]);

  useEffect(() => {
    if (currentUser) {
      currentUser && props.setUserId(currentUser.uid);
    }
  }, [currentUser]);

  const logedIn = (
    <div className={styles.signInDiv}>
      <div
        className={styles.userName}
        onClick={() => {
          props.setMemberPage(true);
        }}
      >
        <p>Hi, &nbsp;{currentUser && currentUser.displayName}</p>
      </div>
      {error && <div>{error}</div>}
      <div className={styles.loginWrap} onClick={handleLogout}>
        <div className={styles.loginIcon}>
          <LogoutIcon />
        </div>
        <p>Log out</p>
      </div>
    </div>
  );

  const loginDiv = (
    <div className={styles.loginDiv}>
      <div className={styles.loginBox}>
        <div className={styles.loginClose} onClick={() => setOpen(false)}>
          ×
        </div>

        <Login
          googleSignIn={props.googleSignIn}
          faceBookSignIn={props.faceBookSignIn}
        />
      </div>
    </div>
  );

  const loginIcon = (
    <div className={styles.loginWrap} onClick={() => setOpen(true)}>
      <div className={styles.loginIcon}>
        <LoginIcon />
      </div>
      <p>Log in</p>
    </div>
  );

  return (
    <div className={styles.loginOutter}>
      {isLogin ? logedIn : loginIcon}
      {isOpen ? loginDiv : ""}
    </div>
  );
}

export default MemberBtn;

// <div className={styles.switchBtn}>
//    <div
//       className={props.memberPage === true ? styles.pressed : ""}
//       onClick={() => {
//          props.setMemberPage(true);
//       }}
//    >
//       會員專區
//    </div>

//    <div
//       className={props.memberPage !== true ? styles.pressed : ""}
//       onClick={() => {
//          props.setMemberPage(false);
//
//          props.setprizeBox(false);
//       }}
//    >
//       找電影
//    </div>
// </div>;
// currentUser && <div>{currentUser.email}</div>;
