import React, { useState, useRef } from "react";
import styles from "../style/MemberBtn.module.scss";
import googleIcon from "../image/Google__G__Logo.svg";
import facebookIcon from "../image/f_logo_RGB-Blue_114.png";
import { useAuth } from "../contexts/AuthContexts";

function Signup(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
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

  return (
    <div>
      <div className={styles.loginBtn} onClick={props.googleSignIn}>
        <div className={styles.loginLogo}>
          <img alt="Google-log-in" src={googleIcon} />
        </div>
        <p>Sign in with Google</p>
      </div>

      <div className={styles.loginBtn} onClick={props.faceBookSignIn}>
        <div className={styles.loginLogo}>
          <img alt="Facebook-log-in" src={facebookIcon} />
        </div>
        <p>Sign in with FaceBook</p>
      </div>

      <div>
        {/* ======== native sign-up ========*/}
        <div className={styles.abc}>
          {/* {JSON.stringify(currentUser)} */}
          {/* show user's email if sign in */}
          {/* {currentUser.email} */}
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
          <div id="password-confirm">
            <label>Password Confirmatiom:</label>
            <input type="password" ref={passwordConfirmRef} required />
          </div>
          <button disabled={loading} type={"submit"}>
            Sign up
          </button>
        </form>
        {/* ======== native sign-up ========*/}
      </div>

      <button onClick={() => props.setLogin(true)}>
        {" "}
        已經有帳號了嗎？登入會員
      </button>
    </div>
  );
}

export default Signup;
