import { v4 as uuidv4 } from "uuid";

class Model {
  constructor() {
    this.observers = [];
    this.currentUser = null;
    this.email = null;
    this.username = null;
    this.playlists = [];
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

  addPlaylist(playlist) {
    // Don't add the same playlist twice.
    if (this.playlists.find((pl) => pl.id === playlist.id)) {
      return;
    }

    this.playlists = [...this.playlists, playlist];
    this.notifyObservers({ addPlaylist: playlist });
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

  newPendingRequest(searchUserData, requestType) {
    // We do not want more than one request to/from a user respectively.
    if (
      this.pending.find(
        (p) =>
          p.type === requestType &&
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
      this.username
    );

    this.addPendingRequest(
      requestId,
      this.currentUser,
      requestType,
      "to",
      searchUserData.id,
      searchUserData.username
    );
  }

  addPendingRequest(requestId, addressId, requestType, direction, id, name) {
    // Do not add request if already in model
    if (this.pending.find((p) => p.id === requestId)) return;

    const newPending = {
      id: requestId,
      type: requestType,
      [direction]: id, // to/from
      username: name,
    };

    if (addressId === this.currentUser) {
      this.pending = [...this.pending, newPending];
    }

    this.notifyObservers({ newPending: newPending, addressId: addressId });
  }

  addFriend(friendId, friendUsername) {
    if (this.friends.find((f) => f.id === friendId)) {
      return;
    }
    const friend = {
      id: friendId,
      username: friendUsername,
    };

    const requestToRemove = this.removeRequest(null, "friendRequest", friendId);

    this.friends = [...this.friends, friend];

    this.notifyObservers({
      removePending: requestToRemove.id,
      userId: friendId,
    });
    this.notifyObservers({ addFriend: friend });
  }

  removeRequest(requestId, requestType, userId) {
    var requestToRemove = {};
    this.requests = this.pending.filter((p) => {
      // Either requestId is provided
      if (requestId) return p.id === requestId;

      // Or we have to go through the data to filter out the correct request
      if (p.type === requestType && (p.to === userId || p.from === userId)) {
        requestToRemove = p;
        return false;
      }
      return true;
    });

    return requestToRemove;
  }

  clearRequests() {
    if (this.requests === []) return;
    this.requests = [];
    this.notifyObservers();
  }

  clearFriends() {
    if (this.friends === []) return;
    this.firends = [];
    this.notifyObservers();
  }

  clearPlaylist() {
    if (this.playlists === []) return;
    this.playlists = [];
    this.notifyObservers();
  }
}

export default Model;
