class Model {
  constructor() {
    this.observers = [];
    this.currentUser = null;
    this.playlists = [];
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
    if (this.playlists.find(pl => pl.id === playlist.id)) {
        return;
    }

    this.playlists = [...this.playlists, playlist]
    this.notifyObservers({ addPlaylist: playlist })
  }

  getUniquePlaylistID() {
    // Find the next largest ID that is unique. 
    // Another solution: `this.playlists.length`, however, that will not work if we are allowed to remove playlists.  
    return this.playlists.reduce((currentMax, playlist) => Math.max(currentMax, playlist.id), 0) + 1
  }
}

export default Model;
