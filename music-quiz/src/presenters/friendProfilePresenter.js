import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FriendUserInfo from "../views/friendUserInfoView";
import resolvePromise from "../resolvePromise";
import promiseNoData from "../views/promiseNoData";
import { getUser } from "../firebaseRequests";

export default function FriendProfilePresenter(props) {
  const [friendPromiseState, setFriendPromiseState] = useState({});
  const [, reRender] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  function whenCreated() {
    const id = searchParams.get("id");
    if (id) {
      resolvePromise(getUser(id), friendPromiseState, () =>
        reRender(new Object())
      );
    }
  }

  useEffect(whenCreated, []);

  if (!friendPromiseState.promise) {
    return "Please provide a valid ID";
  }

  const dataNotReady = promiseNoData(friendPromiseState);

  if (dataNotReady) {
    return dataNotReady;
  }

  // The data is now ready.
  const friend = friendPromiseState.data.val();

  if (!friend) {
    return "Could not find an user with that ID";
  }

  return <FriendUserInfo username={friend.username} email={friend.email} />;
}
