import React, { useState, useRef } from "react";
import styles from "../style/MemberBtn.module.scss";
import googleIcon from "../image/Google__G__Logo.svg";
import facebookIcon from "../image/f_logo_RGB-Blue_114.png";
import { useAuth } from "../contexts/AuthContexts";
import { googleSignIn, faceBookSignIn } from "../config";
import { ReactComponent as Logo } from "../image/logo.svg";

function Login() {
  const nameRef = useRef();
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
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      console.log(nameRef.current.value);
    } catch {
      return setError("Failed to create an account");
    }
    setLoading(false);
  }

  const loginDiv = (
    <div className={styles.container}>
      <div className={styles.side}>
        <span>會員登入</span>
        <div className={styles.logo}>
          <Logo />
        </div>
      </div>

      <div className={styles.main}>
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
        <div className={styles.nativeSignIn}>
          <div className={styles.abc}>
            {error && <div>{error}</div>}
            <p>{currentUser && currentUser.email}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div id="email">
              <label>Email</label>
              <br />
              <input
                type="email"
                ref={emailRef}
                required
                value="test@gmail.com"
              />
            </div>
            <div id="password">
              <label>Password</label>
              <br />
              <input
                type="password"
                ref={passwordRef}
                required
                value="123456"
              />
            </div>

            <button
              className={styles.mainBtn}
              disabled={loading}
              type={"submit"}
            >
              Log In
            </button>
          </form>
        </div>
        <button className={styles.switchBtn} onClick={() => setSignup(false)}>
          沒有帳號？註冊會員
        </button>
      </div>
    </div>
  );

  const nativeSignUp = (
    <div className={styles.container}>
      <div className={styles.side}>
        <span>註冊會員</span>
        <div className={styles.logo}>
          <Logo />
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.nativeSignIn}>
          <form onSubmit={handleSignUp}>
            <div id="name">
              <label>Name</label>
              <br />
              <input type="text" ref={nameRef} required />
            </div>
            <div id="email">
              <label>Email</label>
              <br />
              <input type="email" ref={emailRef} required />
            </div>

            <div id="password">
              <label>Password</label>
              <br />
              <input
                type="password"
                ref={passwordRef}
                placeholder="請輸入6個以上字符"
                required
              />
            </div>
            <div id="password-confirm">
              <label>Password Confirmatiom:</label>
              <br />
              <input type="password" ref={passwordConfirmRef} required />
            </div>
            <button
              className={styles.mainBtn}
              disabled={loading}
              type={"submit"}
            >
              Sign up
            </button>
          </form>
        </div>

        <button className={styles.switchBtn} onClick={() => setSignup(true)}>
          已經有帳號了嗎？登入會員
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.inner}>
      {!currentUser && isSignup ? loginDiv : nativeSignUp}
    </div>
  );
}

export default Login;
