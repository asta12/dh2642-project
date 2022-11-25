import firebaseConfig from "./firebaseConfig.js";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

// Initialise firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service

const REF = "music-quiz";

function registerUser(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function signInUser(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      //var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      //var errorCode = error.code;
      //var errorMessage = error.message;*
    });
}

function onAuthStateChanged() {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}

function signOutUser() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

export { registerUser, signInUser, onAuthStateChanged, signOutUser };
