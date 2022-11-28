import { firebase, REF } from "./models/firebaseModel.js";
import "firebase/compat/auth";

function register(username, email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredentials) => {
    return firebase
        .database()
        .ref(REF + "/users/" + userCredentials.id.uid)
        .set({
            username: username,
            email: email
        })
  })
}

function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function logOut() {
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      // An error happened.
    });
}

export { register, login, logOut };
