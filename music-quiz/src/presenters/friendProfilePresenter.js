import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FriendUserInfo from "../views/friendUserInfoView";
import resolvePromise from "../resolvePromise";
import promiseNoData from "../views/promiseNoData";
import ShowPlaylistView from "../views/showPlaylistView";
import { getUser } from "../firebaseRequests";

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
    const id = searchParams.get("id");
    if (id) {
      resolvePromise(getUser(id), friendPromiseState, () => {
        if (friendPromiseState.data) {
          const friend = friendPromiseState.data.val();
          if (friend) {
            setEmail(friend.email);
            setUsername(friend.username);
            // The playlists from firebase can contain some "empty" elements because the playlist ID:s start from 1.
            setPlaylists(friend.playlists.filter((playlist) => playlist));
          } else {
            // There exists no user with the specified ID, we rerender and show an error message.
            reRender(new Object());
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

  if (!friendPromiseState.promise) {
    return "Please provide a valid ID";
  }

  const dataNotReady = promiseNoData(friendPromiseState);

  if (dataNotReady) {
    return dataNotReady;
  }

  if (!email) {
    return "Could not find an user with that ID";
  }

  return (
    <div>
      <FriendUserInfo username={username} email={email} />
      <ShowPlaylistView
        playlists={playlists}
        expanding={expanding}
        expand={expand}
        editable={false}
      />
    </div>
  );
}
