import { v4 as uuidv4 } from "uuid";
import { logout } from "../firebaseAuthentication";

class Model {
  constructor() {
    this.observers = [];
    this.currentUser = null;
    this.email = null;
    this.username = null;
    this.playlists = [];
    this.settings = {
      volume: 0.5,
      pitch: 1,
      speed: 1.1,
    };
    this.pending = [];
    this.friends = [];
    this.initialLoginAttemptComplete = false;
  }

  addObserver(observer) {
    this.observers = [...this.observers, observer];
  }

  removeObserver(observer) {
    function removeCallback(cb) {
      return cb !== observer;
    }
    this.observers = this.observers.filter(removeCallback);
  }

  notifyObservers(payload) {
    function invokeObserverCB(obs) {
      try {
        obs(payload);
      } catch (err) {
        console.error(err);
      }
    }
    this.observers.forEach(invokeObserverCB);
  }

  setCurrentUser(uid) {
    if (this.currentUser === uid) return;
    this.currentUser = uid;
    this.notifyObservers({ currentUser: this.currentUser });
  }

  setUsername(username) {
    if (this.username === username) return;
    this.username = username;
    this.notifyObservers({ username: this.username });
  }

  setEmail(email) {
    if (this.email === email) return;
    this.email = email;
    this.notifyObservers({ email: this.email });
  }

  setInitialLoginAttemptComplete(isComplete) {
    if (this.initialLoginAttemptComplete === isComplete) return;
    this.initialLoginAttemptComplete = isComplete;
    this.notifyObservers({ loginAttempt: this.initialLoginAttemptComplete });
  }

  loggingout() {
    logout();
    this.notifyObservers({ logOut: true });
  }

  addPlaylist(playlist) {
    // Don't add the same playlist twice.
    if (this.playlists.find((pl) => pl.id === playlist.id)) {
      return;
    }

    this.playlists = [...this.playlists, playlist];
    this.notifyObservers({ addPlaylist: playlist });
  }

  deletePlaylist(playlistID) {
    // Check that the playlist we want to remove exists.
    if (!this.playlists.find((pl) => pl.id === playlistID)) {
      return;
    }

    this.playlists = this.playlists.filter(
      (playlist) => playlist.id !== playlistID
    );
    this.notifyObservers({ deletePlaylist: playlistID });
  }

  editPlaylist(playlist) {
    this.playlists = [
      ...this.playlists.filter((pl) => pl.id !== playlist.id),
      playlist,
    ];
    this.notifyObservers({ editPlaylist: playlist });
  }

  getUniquePlaylistID() {
    // Find the next largest ID that is unique.
    // Another solution: `this.playlists.length`, however, that will not work if we are allowed to remove playlists.
    return (
      this.playlists.reduce(
        (currentMax, playlist) => Math.max(currentMax, playlist.id),
        0
      ) + 1
    );
  }

  newPendingRequest(searchUserData, requestType, playlist = false) {
    // We do not want more than one friend request to/from a user respectively.
    if (
      this.pending.find(
        (p) =>
          p.type === "friendRequest" &&
          (p.to === searchUserData.id || p.from === searchUserData.id)
      )
    )
      return;

    const requestId = uuidv4();

    this.addPendingRequest(
      requestId,
      searchUserData.id,
      requestType,
      "from",
      this.currentUser,
      this.username,
      playlist
    );

    this.addPendingRequest(
      requestId,
      this.currentUser,
      requestType,
      "to",
      searchUserData.id,
      searchUserData.username,
      playlist
    );
  }

  addPendingRequest(
    requestId,
    addressId,
    requestType,
    direction,
    id,
    name,
    playlist = false
  ) {
    // Do not add request if already in model
    if (this.pending.find((p) => p.id === requestId)) return;

    const newPending = {
      id: requestId,
      type: requestType,
      [direction]: id, // to/from
      username: name,
    };

    if (playlist) {
      newPending["playlist"] = playlist.id;
    }

    if (addressId === this.currentUser) {
      this.pending = [...this.pending, newPending];
    }

    this.notifyObservers({ newPending: newPending, addressId: addressId });
  }

  addFriend(requestId, friendId, friendUsername) {
    this.removeRequest(requestId, "friendRequest", friendId);
    this.addFriendFromFirebase(friendId, friendUsername);
  }

  addFriendFromFirebase(friendId, friendUsername) {
    if (this.friends.find((f) => f.id === friendId)) {
      return;
    }

    const friend = {
      id: friendId,
      username: friendUsername,
    };

    this.friends = [...this.friends, friend];
    this.notifyObservers({ addFriend: friend });
  }

  acceptChallenge(requestId, friendId, friendUsername, playlist) {
    this.removeRequest(requestId, "challenge", friendId);
    // play playlist
    console.log("Challenge accepted");
  }

  removeRequest(requestId, requestType, userId) {
    this.pending = this.pending.filter((p) => {
      if (requestId) return p.id !== requestId;
    });

    this.notifyObservers({ removePending: requestId, userId: userId });

    return;
  }

  clearModelData() {
    this.clearPending();
    this.clearFriends();
    this.clearPlaylist();
    this.notifyObservers({ clearData: true });
  }

  clearPending() {
    if (this.pending === []) return;
    this.pending = [];
  }

  clearFriends() {
    if (this.friends === []) return;
    this.friends = [];
  }

  clearPlaylist() {
    if (this.playlists === []) return;
    this.playlists = [];
  }

  setVolume(volume) {
    // Set the preferred volume of the user
    if (this.settings.volume === volume) return;
    this.settings.volume = volume;
    this.notifyObservers({ volume: this.settings.volume });
  }
}

export default Model;
