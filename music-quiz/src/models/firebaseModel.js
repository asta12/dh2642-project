import firebaseConfig from "../firebaseConfig.js";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import Model from "./Model.js";

// Initialise firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service

export const REF = "music-quiz";

function firebaseModelPromise() {
  return firebase
    .database()
    .ref(REF)
    .once("value")
    .then(() => {
      return new Model();
    });
}

function updateFirebaseFromModel(model) {
  function updateDatabase(payload) {
    if (!payload) return;
    if (payload.hasOwnProperty("addPlaylist")) {
      firebase
        .database()
        .ref(`${REF}/users/${model.currentUser}/playlists/${payload.addPlaylist.id}`)
        .set(payload.addPlaylist);
    }
  }
  model.addObserver(updateDatabase);
  return;
}

function updateModelFromFirebase(model) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // We are logged in.
        model.setCurrentUser(user.uid)
        model.setEmail(user.email)

        // Load the username into the model.
        firebase.database().ref(`${REF}/users/${model.currentUser}/username`).on("value", (firebaseData) => {
            model.setUsername(firebaseData.val())
        })

        // Get playlist updates.
        firebase.database().ref(`${REF}/users/${model.currentUser}/playlists/`).on("child_added", (firebaseData) => {
            model.addPlaylist(firebaseData.val())
        })
    } else {
        // We are not logged in.
        model.setCurrentUser(null)
        model.setEmail(null)
        model.setUsername(null)
    }
  });
  return;
}

export {
  firebase,
  updateFirebaseFromModel,
  updateModelFromFirebase,
  firebaseModelPromise
};
