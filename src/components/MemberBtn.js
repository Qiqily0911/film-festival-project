import React, { useState, useEffect } from "react";
import styles from "../style/MemberBtn.module.scss";
import Login from "./Login";
import { useAuth } from "../contexts/AuthContexts";
import { firestore } from "../config";

function MemberBtn(props) {
  const { logout, currentUser } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const users = firestore.collection("users");

  async function handleLogout() {
    setError("");
    try {
      await logout();
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

  //  show user name
  useEffect(() => {
    if (currentUser) {
      currentUser && props.setUserId(currentUser.uid);
      //  console.log(currentUser.uid);
      users
        .where("uid", "==", currentUser.uid)
        .get()
        .then((data) => {
          data.forEach((user) => {
            setUserName(user.data().name);
          });
        });
    }
  }, [currentUser]);

  const logedIn = (
    <div className={styles.signInDiv}>
      {/* {currentUser && <div>{currentUser.email}</div>} */}
      <div className={styles.userName}>Hi, {userName}</div>
      {error && <div>{error}</div>}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );

  const loginDiv = (
    <div className={styles.loginDiv}>
      <div className={styles.loginBox}>
        <div className={styles.loginClose} onClick={() => setOpen(false)}>
          ×
        </div>
        {/* index.js:1 Warning: Cannot update a component (`App`) while rendering a different component 
            (`MemberBtn`). To locate the bad setState() call inside `MemberBtn`, follow the stack trace 
            as described in https://reactjs.org/link/setstate-in-render */}

        <Login
          googleSignIn={props.googleSignIn}
          faceBookSignIn={props.faceBookSignIn}
        />
      </div>
    </div>
  );

  const loginIcon = (
    <div className={styles.loginIcon} onClick={() => setOpen(true)}>
      <svg
        id="login"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="40"
        height="40"
      >
        <path d="M0,50A49.91,49.91,0,0,1,50.35,0C77.4,0,99.93,22.48,99.94,49.52c0,28-22.16,50.42-49.8,50.42A49.92,49.92,0,0,1,0,50ZM85.11,78.25C99.39,61.11,99.26,33,79.43,15.71a45.05,45.05,0,0,0-65,6.35C-1,41.65,4.12,66.36,15,78.19l.37-1.38c3.28-11.83,10.62-20,22-24.55a3.66,3.66,0,0,1,2.58.15,22.38,22.38,0,0,0,19.88,0,3.17,3.17,0,0,1,2.78-.17A35.29,35.29,0,0,1,82.89,71.85C83.76,73.89,84.36,76.05,85.11,78.25Z" />
        <path d="M67.81,32.09A17.84,17.84,0,1,1,50.09,14.3,17.8,17.8,0,0,1,67.81,32.09Z" />
      </svg>
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
