import { v4 as uuidv4 } from "uuid";

class Model {
  constructor() {
    this.observers = [];
    this.currentUser = null;
    this.playlists = [];
    this.pending = [];
    this.friends = [];
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
      "mockUsername" //TODO: switch "mockusername" to currentUser username when merged with main
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

    console.log(this.pending);

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
    this.friends = [...this.friends, friend];
    this.notifyObservers({ addFriend: friend });
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
}

export default Model;
