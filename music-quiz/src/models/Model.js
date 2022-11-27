import { register, login, logOut } from "../firebaseAuthentication.js";

class Model {
  constructor() {
    this.observers = [];
    this.users = [];
    this.currentUser = null
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

  registerInModel(id, username, email) {
    if (this.users.find((user) => user.id === id)) return;

    const user = { id: id, username: username, email: email };
    this.users = [...this.users, user];
    this.notifyObservers({ addUser: user });
  }

  registerUser(username, email, password) {
    if (this.users.find((user) => user.email === email)) return;

    return register(email, password).then((userCredential) => {
        // Registered successfully
        console.log("User Registered");
        this.registerInModel(userCredential.user.uid, username, email);
    });
  }

  setCurrentUser(uid) {
    if (this.currentUser === uid) return;
    this.currentUser = uid;
  }

  loginUser(email, password) {
    return login(email, password).then((userCredential) => {
      // Signed in successfully.
      console.log("User signed in successfully");
      this.setCurrentUser(userCredential.user.uid);
      this.notifyObservers({ setCurrentUser: userCredential.user.uid });
    });
  }

  logOutUser() {
    this.currentUser = null;
    return logOut().then(() => {
      // Signed-out successfully.
      this.currentUser = null;
      this.notifyObservers({ setCurrentUser: null });
    });
  }
}

export default Model;
