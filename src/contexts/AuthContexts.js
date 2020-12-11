import React, { useState, useContext, useEffect } from "react";
import { firebaseAuth, firestore } from "../config";

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore
          .collection("users")
          .doc(firebaseAuth.currentUser.uid)
          .set(
            {
              name: "",
              email: firebaseAuth.currentUser.email,
              uid: firebaseAuth.currentUser.uid,
              list: "",
            },
            { merge: true }
          )
          .then(() => {
            console.log("set data successful");
          });
      });
  }

  function login(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return firebaseAuth.signOut();
  }

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      console.log("-- [06] set current user--");
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
