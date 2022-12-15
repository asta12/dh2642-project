import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FriendUserInfo from "../views/friendUserInfoView";
import resolvePromise from "../resolvePromise";
import promiseNoData from "../views/promiseNoData";
import ShowPlaylistView from "../views/showPlaylistView";
import { searchForUserByID } from "../models/firebaseModel";

export default function FriendProfilePresenter(props) {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [expanding, updateExpanding] = useState([]);
  const [friendPromiseState, setFriendPromiseState] = useState({});
  const [, reRender] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  function expand(index) {
    updateExpanding(
      expanding.map((exp, expandIndex) => {
        if (index === expandIndex) {
          return !exp;
        } else {
          return exp;
        }
      })
    );
  }

  function whenCreated() {
    findFriend();
  }

  function findFriend() {
    const id = searchParams.get("id");
    if (id) {
      resolvePromise(searchForUserByID(id), friendPromiseState, () => {
        if (friendPromiseState.data) {
          const friend = friendPromiseState.data;
          setEmail(friend.email);
          setUsername(friend.username);
          if (friend.playlists) {
            setPlaylists(Object.values(friend.playlists));
          }
        } else {
          reRender(new Object());
        }
      });
    }
  }

  useEffect(whenCreated, []);
  useEffect(
    () => updateExpanding(Array(playlists.length).fill(false)),
    [playlists]
  );

  useEffect(findFriend, [searchParams])

  if (!friendPromiseState.promise) {
    return "Please provide a valid ID";
  }

  return (
    promiseNoData(friendPromiseState, friendPromiseState.error) || (
      <div>
        <FriendUserInfo username={username} email={email} />
        <ShowPlaylistView
          playlists={playlists}
          expanding={expanding}
          expand={expand}
          editable={false}
        />
      </div>
    )
  );
}
