import AddFriendView from "../views/addFriendView.js";
import resolvePromise from "../resolvePromise.js";
import promiseNoData from "../views/promiseNoData.js";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchForUserByEmail } from "../models/firebaseModel.js";
import SearchUserResults from "../views/searchUserResultsView.js";

export default function AddFriend(props) {
  const [validEmail, setValidEmail] = useState(true);
  const [requestSent, setRequestSent] = useState({});
  const [searchUserPromiseState] = useState({});
  const [email, setEmail] = useState("");
  const [, reRender] = useState();
  const [currentUser, updateCurrentUser] = useState(props.model.currentUser);

  function searchUser() {
    const checkEmail = isValidEmail();
    setValidEmail(checkEmail);

    // Should not be able to add yourself as friend
    if (email === props.model.email) return;

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
    setRequestSent({ requestTo: searchUserPromiseState.data.id });
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
    return (
      requestSent.requestTo === searchUserPromiseState.data.id ||
      props.model.pending.find(
        (p) =>
          p.type === "friendRequest" &&
          (p.to === searchUserPromiseState.data.id ||
            p.from === searchUserPromiseState.data.id)
      )
    );
  }

  function observer(payload) {
    if (payload?.currentUser) {
      updateCurrentUser(payload.currentUser);
    } else if (payload?.logOut) {
      updateCurrentUser(null);
    }
  }

  function whenCreated() {
    props.model.addObserver(observer);

    function whenTakenDown() {
      props.model.removeObserver(observer);
    }
    return whenTakenDown;
  }

  useEffect(whenCreated, []);

  if (!currentUser) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div>
        <AddFriendView
          error={searchUserPromiseState.error}
          validEmail={validEmail}
          setEmail={setEmail}
          searchUser={searchUser}
        ></AddFriendView>
        {promiseNoData(searchUserPromiseState) || (
          <SearchUserResults
            searchResult={searchUserPromiseState.data}
            isRequestSent={isRequestSent}
            isUserFriend={isUserFriend}
            sendFriendRequest={sendFriendRequest}
          />
        )}
      </div>
    );
  }
}
