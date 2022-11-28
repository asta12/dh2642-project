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
