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
        .ref(
          `${REF}/users/${model.currentUser}/playlists/${payload.addPlaylist.id}`
        )
        .set(payload.addPlaylist);
    }

    if (payload.hasOwnProperty("newPending")) {
      firebase
        .database()
        .ref(
          `${REF}/users/${payload.addressId}/pending/${payload.newPending.id}`
        )
        .set(payload.newPending);
    }

    if (payload.hasOwnProperty("addFriend")) {
      firebase
        .database()
        .ref(
          `${REF}/users/${model.currentUser}/friends/${payload.addFriend.id}`
        )
        .set(payload.addFriend);
    }
  }

  model.addObserver(updateDatabase);
  return;
}

function updateModelFromFirebase(model) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // We are logged in (we probably want to save username/email in the model as well).
      model.setCurrentUser(user.uid);

      // Get playlist updates.
      firebase
        .database()
        .ref(`${REF}/users/${model.currentUser}/playlists/`)
        .on("child_added", (firebaseData) => {
          model.addPlaylist(firebaseData.val());
        });

      // Get pending updates.
      firebase
        .database()
        .ref(`${REF}/users/${model.currentUser}/pending`)
        .on("child_added", (firebaseData) => {
          const requestId = firebaseData.exportVal().id;
          const keys = Object.keys(firebaseData.exportVal());
          const direction = keys.filter((k) => k === "to" || k === "from");
          const userId = firebaseData.exportVal()[direction];

          model.addPendingRequest(
            requestId,
            model.currentUser,
            firebaseData.val().type,
            direction,
            userId,
            firebaseData.val().username
          );
        });

      // Get friends updates.
      firebase
        .database()
        .ref(`${REF}/users/${model.currentUser}/friends`)
        .on("child_added", (firebaseData) => {
          model.addFriend(
            firebaseData.exportVal().id,
            firebaseData.val().username
          );
        });
    } else {
      // We are not logged in.
      model.setCurrentUser(null);
      model.clearRequests();
    }
  });
  return;
}

function searchForUserByEmail(model, email) {
  return firebase
    .database()
    .ref(`${REF}/users/`)
    .orderByChild("email")
    .equalTo(email)
    .once("value")
    .then((firebaseData) => {
      const id = Object.keys(firebaseData.exportVal())[0];
      const username = Object.values(firebaseData.val())[0].username;
      return { id: id, username: username };
    });
}

export {
  firebase,
  updateFirebaseFromModel,
  updateModelFromFirebase,
  firebaseModelPromise,
  searchForUserByEmail,
};
