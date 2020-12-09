import React, { useState, useRef } from "react";
import styles from "../style/MemberBtn.module.scss";
import googleIcon from "../image/Google__G__Logo.svg";
import facebookIcon from "../image/f_logo_RGB-Blue_114.png";
import { useAuth } from "../contexts/AuthContexts";

function Login(props) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  async function handleLogout() {
    setError("");
    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <div>
      <div className={styles.loginBtn} onClick={props.googleSignIn}>
        <div className={styles.loginLogo}>
          <img alt="Google-log-in" src={googleIcon} />
        </div>
        <p>Log in with Google</p>
      </div>

      <div className={styles.loginBtn} onClick={props.faceBookSignIn}>
        <div className={styles.loginLogo}>
          <img alt="Facebook-log-in" src={facebookIcon} />
        </div>
        <p>Log in with FaceBook</p>
      </div>

      <div>
        {/* ======== native sign-up ========*/}
        <div className={styles.abc}>
          {/* {JSON.stringify(currentUser)} */}
          {/* show user's email if sign in */}
          {error && <div>{error}</div>}
          <p>{currentUser && currentUser.email}</p>
        </div>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div id="email">
            <label>Email</label>
            <input type="email" ref={emailRef} required />
          </div>
          <div id="password">
            <label>Password</label>
            <input type="password" ref={passwordRef} required />
          </div>

          <button disabled={loading} type={"submit"}>
            Log In
          </button>
        </form>
        <button onClick={handleLogout}>Log Out</button>
        {/* ======== native sign-up ========*/}
      </div>
      <button onClick={() => props.setLogin(false)}> 沒有帳號？註冊會員</button>
    </div>
  );
}

export default Login;
