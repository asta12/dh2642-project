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
      showLyrics: true
    };
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

  setVolume(volume) {
    // Set the preferred volume of the user
    if (this.settings.volume === volume) return;
    this.settings.volume = volume;
    this.notifyObservers({ volume: this.settings.volume });
  }
}

export default Model;
