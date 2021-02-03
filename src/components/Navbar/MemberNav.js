import React, { useState, useEffect } from "react";
import styles from "../../style/MemberBtn.module.scss";
import Login from "./Login";
import { useAuth } from "../../contexts/AuthContexts";

import { ReactComponent as Arrow } from "../../image/icon/arrow.svg";
import { ReactComponent as LoginIcon } from "../../image/icon/login.svg";
import { ReactComponent as LogoutIcon } from "../../image/icon/logout.svg";
import { ReactComponent as MenuIcon } from "../../image/menu.svg";
import { useSelector, useDispatch } from "react-redux";

export function MemberNav(props) {
  return (
    <div className={styles.navBox}>
      <div
        className={styles.backBtn}
        onClick={() => {
          props.setMemberPage(false);
        }}
      >
        <Arrow className={styles.arrow} />
      </div>
      <div className={styles.navBtn}>我的收藏夾</div>
    </div>
  );
}

export function MemberBtn(props) {
  const { logout, currentUser } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [error, setError] = useState("");
  const listState = useSelector((state) => state.setList);

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
      {listState.listCase < 2 ? (
        <MenuIcon />
      ) : (
        <>
          {isLogin ? logedIn : loginIcon}
          {isOpen && loginDiv}
        </>
      )}
    </div>
  );
}
