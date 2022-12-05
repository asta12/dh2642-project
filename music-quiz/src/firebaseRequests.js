import { firebase, REF } from "./models/firebaseModel.js";

// Fetches a user with a specific ID from firebase. 
function getUser(userID) {
    return firebase.database().ref(`${REF}/users/${userID}/`).get()
}

export { getUser }