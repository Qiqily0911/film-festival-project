// firebase SDK
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBmbHqONy7XHhbAJgi7XI8Zb6xrKcDQ9NM",
  authDomain: "film-db-9936d.firebaseapp.com",
  databaseURL: "https://film-db-9936d.firebaseio.com",
  projectId: "film-db-9936d",
  storageBucket: "film-db-9936d.appspot.com",
  messagingSenderId: "340728739287",
  appId: "1:340728739287:web:6a5a212fc24c2cd1b18792",
};

// Initialize Firebase
const firebaseSet = firebase.initializeApp(config);
export const firebaseAuth = firebase.auth();
export const firestore = firebaseSet.firestore();

// Google login
const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.setCustomParameters({
  prompt: "select_account",
});
export const googleSignIn = () => firebaseAuth.signInWithPopup(providerGoogle);

// FaceBook login
var providerFb = new firebase.auth.FacebookAuthProvider();
export const faceBookSignIn = () =>
  firebaseAuth
    .signInWithPopup(providerFb)
    .then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(token, user.displayName, user.email, user.photoURL);
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
    });

// TMDb api key
export const apiKey = "5c27dca1cd4fca2cefc5c8945cfb1974";

// OMDb api key
export const omdbKey = "1bd03df3";
