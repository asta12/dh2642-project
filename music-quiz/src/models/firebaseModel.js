import firebaseConfig from "../firebaseConfig.js";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import Model from "./Model.js";

// Initialise firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service

const REF = "music-quiz";

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
    if (payload.hasOwnProperty("addUser")) {

      firebase
        .database()
        .ref(REF + "/users/" + payload.addUser.id)
        .set({username: payload.addUser.username, email: payload.addUser.email});
    } else if (payload.hasOwnProperty("setCurrentUser")) {
      firebase
        .database()
        .ref(REF + "/currentUser/")
        .set(payload.setCurrentUser);
    }
  }
  model.addObserver(updateDatabase);
  return;
}

function updateModelFromFirebase(model) {
  firebase
    .database()
    .ref(REF + "/users")
    .on("child_added", (firebaseData) => {
      if (!model.users.find((user) => user.id === firebaseData.key))
        model.registerInModel(firebaseData.key, firebaseData.val().username, firebaseData.val().email);
    });
  firebase
    .database()
    .ref(REF + "/currentUser")
    .on("value", (firebaseData) => {
      model.setCurrentUser(firebaseData.val());
    });
  return;
}

export {
  firebase,
  updateFirebaseFromModel,
  updateModelFromFirebase,
  firebaseModelPromise,
};
