// firebase SDK
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

export const tmdbKey = "5c27dca1cd4fca2cefc5c8945cfb1974";
export const omdbKey = "1bd03df3";

const firebaseSet = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth();
export const firestore = firebaseSet.firestore();

// Google login
const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.setCustomParameters({
  prompt: "select_account",
});
export const googleSignIn = () =>
  firebaseAuth
    .signInWithPopup(providerGoogle)
    // .then(function (result) {
    //    console.log(result);
    //  var token = result.credential.accessToken; //  Google Access Token
    // var user = result.user; // The signed-in user info.
    // createUser(user);
    // })
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

// FaceBook login
var providerFb = new firebase.auth.FacebookAuthProvider();
export const faceBookSignIn = () =>
  firebaseAuth
    .signInWithPopup(providerFb)
    // .then(function (result) {

    // })
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
