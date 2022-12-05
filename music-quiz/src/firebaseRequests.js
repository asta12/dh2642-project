import { firebase, REF } from "./models/firebaseModel.js";

function getFriend(friendID) {
    return firebase.database().ref(`${REF}/users/${friendID}/`).get()
}

export { getFriend }