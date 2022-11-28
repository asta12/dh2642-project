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
        .set({
          username: payload.addUser.username,
          email: payload.addUser.email,
        });
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
    .ref(REF + "/currentUser")
    .on("value", (firebaseData) => {
      model.setCurrentUser(firebaseData.val());
    });
  return;
}

async function isEmailAlreadyRegistered(email) {
  return new Promise((resolve) => {
    firebase
      .database()
      .ref(REF + "/users")
      .on("value", (firebaseData) => {
        const users = firebaseData.val();
        for (const [_, user] of Object.entries(users)) {
          if (user.email.trim() === email.trim()) {
            resolve(true)
          }
        }
        resolve(false)
      });
  });
}

export {
  firebase,
  updateFirebaseFromModel,
  updateModelFromFirebase,
  firebaseModelPromise,
  isEmailAlreadyRegistered,
};
