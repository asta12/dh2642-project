import { register, login, logOut } from "../firebaseAuthentication.js";
import { isEmailAlreadyRegistered } from "./firebaseModel.js";

function UserException(name, message){
  this.name = name
  this.message = message
}

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

  async registerUser(username, email, password) {

    const isEmailRegistered = await isEmailAlreadyRegistered(email);
    if (isEmailRegistered === true) {
      throw new UserException("emailAlreadyRegistered", "Account already exists");
    }

    return register(email, password).then((userCredential) => {
      // Registered successfully
      const user = { id: userCredential.user.uid, username: username, email: email };
      console.log("User Registered:");
      console.log(user);

      this.notifyObservers({ addUser: user });
    });
  }

  setCurrentUser(uid) {
    if (this.currentUser === uid) return;
    this.currentUser = uid;
    console.log(this.currentUser)
    this.notifyObservers({ currentUser: this.currentUser });
  }

  addPlaylist(playlist) {
    // Don't add the same playlist twice.
    if (this.playlists.find(pl => pl.id === playlist.id)) {
        return;
    }

    this.playlists = [...this.playlists, playlist]
    this.notifyObservers({ playlistAdded: playlist })
  }

  getUniquePlaylistID() {
    // Find the next largest ID that is unique. 
    // Another solution: `this.playlists.length`, however, that will not work if we are allowed to remove playlists.  
    return this.playlists.reduce((currentMax, playlist) => Math.max(currentMax, playlist.id), 0)
  }
}

export default Model;
