import React, { useState, useRef } from "react";
import styles from "../style/MemberBtn.module.scss";
import googleIcon from "../image/Google__G__Logo.svg";
import facebookIcon from "../image/f_logo_RGB-Blue_114.png";
import { useAuth } from "../contexts/AuthContexts";
import { googleSignIn, faceBookSignIn } from "../config";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { login, signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setSignup] = useState(true);

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

  async function handleSignUp(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      return setError("Failed to create an account");
    }
    setLoading(false);
  }

  const loginDiv = (
    <div>
      <span>想收藏喜歡的電影嗎？ 登入會員</span>
      <div className={styles.loginBtn} onClick={googleSignIn}>
        <div className={styles.loginLogo}>
          <img alt="Google-log-in" src={googleIcon} />
        </div>
        <p>Log in with Google</p>
      </div>
      <div className={styles.loginBtn} onClick={faceBookSignIn}>
        <div className={styles.loginLogo}>
          <img alt="Facebook-log-in" src={facebookIcon} />
        </div>
        <p>Log in with FaceBook</p>
      </div>
      <div>
        {/* ======== native sign-in ========*/}
        <div className={styles.abc}>
          {error && <div>{error}</div>}
          <p>{currentUser && currentUser.email}</p>
        </div>
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

        {/* ======== native sign-in ========*/}
      </div>
      <button onClick={() => setSignup(false)}> 沒有帳號？註冊會員</button>
    </div>
  );

  const nativeSignUp = (
    <div>
      <span>註冊會員</span>
      {/* ======== native sign-up ========*/}
      {error && <div>{error}</div>}
      <form onSubmit={handleSignUp}>
        <div id="email">
          <label>Email</label>
          <input type="email" ref={emailRef} required />
        </div>
        {/* TODO set remind: passwords must over 6 charactors */}
        <div id="password">
          <label>Password</label>
          <input type="password" ref={passwordRef} required />
        </div>
        <div id="password-confirm">
          <label>Password Confirmatiom:</label>
          <input type="password" ref={passwordConfirmRef} required />
        </div>
        <button disabled={loading} type={"submit"}>
          Sign up
        </button>
      </form>
      {/* ======== native sign-up ========*/}

      <button onClick={() => setSignup(true)}> 已經有帳號了嗎？登入會員</button>
    </div>
  );

  return <div>{!currentUser && isSignup ? loginDiv : nativeSignUp}</div>;
}

export default Login;
