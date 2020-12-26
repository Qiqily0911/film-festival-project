// firebase SDK
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// TMDb api key
export const apiKey = "5c27dca1cd4fca2cefc5c8945cfb1974";

// OMDb api key
export const omdbKey = "1bd03df3";

// firebase config
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

// export function createUser(user) {
//   let users = firestore.collection("users");

//   users
//     .doc(user.uid)
//     .set(
//       {
//         name: user.displayName,
//         email: user.email,
//         uid: user.uid,
//         list: [],
//       },
//       { merge: true }
//     )
//     .then(() => {
//       console.log("set data successful");
//     });
// }
// let ref = firestore.collection("cannes_film").doc("palme_d_or");

// ref.get().then((doc) => {
//    console.log(doc.data()["1957"]);
// });

// Google login
const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.setCustomParameters({
  prompt: "select_account",
});
export const googleSignIn = () =>
  firebaseAuth
    .signInWithPopup(providerGoogle)
    .then(function (result) {
      console.log(result);
      //  var token = result.credential.accessToken; //  Google Access Token
      // var user = result.user; // The signed-in user info.
      // createUser(user);
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

// FaceBook login
var providerFb = new firebase.auth.FacebookAuthProvider();
export const faceBookSignIn = () =>
  firebaseAuth
    .signInWithPopup(providerFb)
    // .then(function (result) {
    //   // console.log(result);
    //   //  var token = result.credential.accessToken; // Facebook Access Token
    //   // var user = result.user; // The signed-in user info.
    //   // createUser(user);
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
