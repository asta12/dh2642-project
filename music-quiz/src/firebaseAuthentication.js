import firebase, {REF} from "./models/firebaseModel.js";
import "firebase/compat/auth";

async function isEmailAlreadyRegistered(email) {
  return new Promise((resolve) => {
    firebase
      .database()
      .ref(REF + "/users")
      .on("value", (firebaseData) => {
        const users = firebaseData.val();
        if (!users) {
          resolve(false);
        } else {
          for (const [_, user] of Object.entries(users)) {
            if (user.email.trim() === email.trim()) {
              resolve(true);
            }
          }
          resolve(false);
        }
      });
  });
}

async function register(username, email, password) {
  const emailTaken = await isEmailAlreadyRegistered(email);

  if (emailTaken) {
    throw "emailAlreadyRegistered";
  }

  // If the email is not taken sign up in firebase.
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      // Put the user information in the realtime database.
      return firebase
        .database()
        .ref(REF + "/users/" + userCredentials.user.uid)
        .set({
          username: username,
          email: email,
        })
        .then(() => username); // If everything went well we will return the username.
    });
}

function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function logout() {
  return firebase
    .auth()
    .signOut()
    .catch((error) => {
      // An error happened.
    });
}

export { register, login, logout };
