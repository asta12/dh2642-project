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

    if (payload.hasOwnProperty("removePending")) {
      // Remove pending request on one user
      firebase
        .database()
        .ref(
          `${REF}/users/${model.currentUser}/pending/${payload.removePending}`
        )
        .set(null);

      // Remove pending request on the other user
      firebase
        .database()
        .ref(`${REF}/users/${payload.userId}/pending/${payload.removePending}`)
        .set(null);
    }

    if (payload.hasOwnProperty("addFriend")) {
      // Add friend on one user
      firebase
        .database()
        .ref(
          `${REF}/users/${model.currentUser}/friends/${payload.addFriend.id}`
        )
        .set(payload.addFriend);

      // Add friend on the other user
      firebase
        .database()
        .ref(
          `${REF}/users/${payload.addFriend.id}/friends/${model.currentUser}`
        )
        .set({ id: model.currentUser, username: model.email });
    }
  }

  model.addObserver(updateDatabase);
  return;
}

function updateModelFromFirebase(model) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // We are logged in.
      model.setCurrentUser(user.uid);
      model.setEmail(user.email);

      // Load the username into the model.
      firebase
        .database()
        .ref(`${REF}/users/${model.currentUser}/username`)
        .on("value", (firebaseData) => {
          model.setUsername(firebaseData.val());
        });

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
        .ref(`${REF}/users/${model.currentUser}/pending/`)
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

      firebase
        .database()
        .ref(`${REF}/users/${model.currentUser}/pending/`)
        .on("child_removed", (firebaseData) => {
          model.removeRequest(firebaseData.exportVal().id, null, null);
        });

      // Get friends updates.
      firebase
        .database()
        .ref(`${REF}/users/${model.currentUser}/friends`)
        .on("child_added", (firebaseData) => {
          model.addFriend(
            firebaseData.exportVal().id,
            firebaseData.exportVal().username
          );
        });

    } else {
      // We are not logged in.
      model.setCurrentUser(null);
      model.setEmail(null);
      model.setUsername(null);
      model.clearRequests();
      model.clearPlaylist();

      model.setInitialLoginAttemptComplete(false);
    }

    // The initial login attempt should be complete now!
    model.setInitialLoginAttemptComplete(true);
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
