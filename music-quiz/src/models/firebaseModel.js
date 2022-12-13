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
    if (payload.hasOwnProperty("deletePlaylist")) {
      firebase
        .database()
        .ref(
          `${REF}/users/${model.currentUser}/playlists/${payload.deletePlaylist}`
        )
        .set(null);
    }
    if (payload.hasOwnProperty("editPlaylist")) {
      firebase
        .database()
        .ref(
          `${REF}/users/${model.currentUser}/playlists/${payload.editPlaylist.id}`
        )
        .set(payload.editPlaylist);
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
        .set({ id: model.currentUser, username: model.username });
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

      // A playlist has been added.
      firebase
        .database()
        .ref(`${REF}/users/${model.currentUser}/playlists/`)
        .on("child_added", (firebaseData) => {
          model.addPlaylist(firebaseData.val());
        });

      // A playlist has been removed.
      firebase
        .database()
        .ref(`${REF}/users/${model.currentUser}/playlists/`)
        .on("child_removed", (firebaseData) => {
          model.deletePlaylist(firebaseData.key);
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
          const playlist = firebaseData.exportVal().playlist;

          model.addPendingRequest(
            requestId,
            model.currentUser,
            firebaseData.val().type,
            direction,
            userId,
            firebaseData.val().username,
            playlist
          );
        });

      firebase
        .database()
        .ref(`${REF}/users/${model.currentUser}/pending/`)
        .on("child_removed", (firebaseData) => {
          let friendId = "";
          if (firebaseData.exportVal().from) {
            friendId = firebaseData.exportVal().from;
          } else {
            friendId = firebaseData.exportVal().to;
          }
          model.removeRequest(firebaseData.exportVal().id, "", friendId);
        });

      // Get friends updates.
      firebase
        .database()
        .ref(`${REF}/users/${model.currentUser}/friends`)
        .on("child_added", (firebaseData) => {
          model.addFriendFromFirebase(
            firebaseData.exportVal().id,
            firebaseData.exportVal().username
          );
        });
    } else {
      // We are not logged in.
      if (model.currentUser) {
        // Ensure that we unsubscribe to all events.
        firebase
          .database()
          .ref(`${REF}/users/${model.currentUser}/username`)
          .off();

        firebase
          .database()
          .ref(`${REF}/users/${model.currentUser}/playlists/`)
          .off();

        firebase
          .database()
          .ref(`${REF}/users/${model.currentUser}/pending/`)
          .off();

        firebase
          .database()
          .ref(`${REF}/users/${model.currentUser}/friends`)
          .off();
      }

      model.setCurrentUser(null);
      model.setEmail(null);
      model.setUsername(null);
      model.clearModelData();

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

// Fetches a user with a specific ID from firebase.
function searchForUserByID(userID) {
  return firebase.database().ref(`${REF}/users/${userID}/`).get();
}

// Fetches a playlist from a user.
function searchForPlaylist(userID, playlistID) {
  return firebase
    .database()
    .ref(`${REF}/users/${userID}/playlists/${playlistID}`)
    .get();
}

export default firebase;
export {
  updateFirebaseFromModel,
  updateModelFromFirebase,
  firebaseModelPromise,
  searchForUserByEmail,
  searchForUserByID,
  searchForPlaylist
};
