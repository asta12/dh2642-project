import AddFriendView from "../views/addFriendView.js";
import resolvePromise from "../resolvePromise.js";
import { useState } from "react";
import { searchForUserByEmail } from "../models/firebaseModel.js";

export default function AddFriend(props) {
  const [validEmail, setValidEmail] = useState(true);
  const [searchUserPromiseState] = useState({});
  const [email, setEmail] = useState("");
  const [, reRender] = useState();

  function searchUser() {
    const checkEmail = isValidEmail();
    setValidEmail(checkEmail);

    // TODO: check if this is the same as currentUsers email, then do not print results

    if (checkEmail)
      resolvePromise(
        searchForUserByEmail(props.model, email),
        searchUserPromiseState,
        () => reRender(new Object())
      );
  }

  function sendFriendRequest() {
    if (searchUserPromiseState.data === null) return;
    const data = searchUserPromiseState.data;
    props.model.newPendingRequest(data, "friendRequest");
  }

  function isValidEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function isUserFriend() {
    return props.model.friends.find(
      (friend) => friend.id === searchUserPromiseState.data.id
    );
  }

  function isRequestSent() {
    return props.model.pending.find(
      (p) =>
        p.type === "friendRequest" &&
        (p.to === searchUserPromiseState.data.id ||
          p.from === searchUserPromiseState.data.id)
    );
  }

  return (
    <div>
      <AddFriendView
        searchResult={searchUserPromiseState.data}
        error={searchUserPromiseState.error}
        validEmail={validEmail}
        setEmail={setEmail}
        isUserFriend={isUserFriend}
        searchUser={searchUser}
        sendFriendRequest={sendFriendRequest}
        isRequestSent={isRequestSent}
      ></AddFriendView>
    </div>
  );
}
