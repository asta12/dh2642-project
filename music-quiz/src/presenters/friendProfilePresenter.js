import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FriendUserInfo from "../views/friendUserInfoView";
import resolvePromise from "../resolvePromise";
import promiseNoData from "../views/promiseNoData";
import { getFriend } from "../firebaseRequests";

export default function FriendProfilePresenter(props) {
  const [friendPromiseState, setFriendPromiseState] = useState({});
  const [, reRender] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  function whenCreated() {
    const id = searchParams.get("id");
    if (id) {
      resolvePromise(getFriend(id), friendPromiseState, () =>
        reRender(new Object())
      );
    }
  }

  useEffect(whenCreated, []);

  if (!friendPromiseState.promise) {
    return "Please provide a valid ID"
  }
  
  const dataNotReady = promiseNoData(friendPromiseState)

  if (dataNotReady) {
    return dataNotReady
  }

  // The data is now ready to be proccessed. 
  const friend = friendPromiseState.data.val()

  if (!friend) {
    return "Could not find an user with that ID"
  }

  return (
    promiseNoData(friendPromiseState) || (
      <FriendUserInfo username={friend.username} email={friend.email} />
    )
  );
}
