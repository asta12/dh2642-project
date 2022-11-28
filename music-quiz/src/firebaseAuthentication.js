import { firebase } from "./models/firebaseModel.js";
import "firebase/compat/auth";

function register(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function login(email, password) { // TODO: add additional user information (username)
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function onAuthStateChanged() {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
    } else {
      // User is signed out
      // ...
    }
  });
}

function logOut() {
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      // An error happened.
    });
}

export { register, login, onAuthStateChanged, logOut };
