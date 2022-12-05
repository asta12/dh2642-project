import { firebase, REF } from "./models/firebaseModel.js";

// Fetches firebase for a user 
function getUser(userID) {
    return firebase.database().ref(`${REF}/users/${userID}/`).get()
}

export { getUser }