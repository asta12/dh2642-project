import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ShowPlaylistView from "../views/showPlaylistView";
import UserInfoView from "../views/userInfoView";
import CreatePlaylistButtonView from "../views/createPlaylistButtonView";

export default function UserProfilePresenter(props) {
  const [playlists, updatePlaylists] = useState(props.model.playlists);
  const [email, setEmail] = useState(props.model.email);
  const [username, setUsername] = useState(props.model.username);
  const [expanding, updateExpanding] = useState([]);
  const navigate = useNavigate();

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

  function editPlaylist(playlistID) {
    navigate(`/profile/edit-playlist?id=${playlistID}`);
  }

  function whenCreated() {
    function observer(payload) {
      updatePlaylists(props.model.playlists);
      setEmail(props.model.email);
      setUsername(props.model.username);
    }
    props.model.addObserver(observer);

    function whenTakenDown() {
      props.model.removeObserver(observer);
    }
    return whenTakenDown;
  }

  useEffect(whenCreated, []);
  useEffect(
    () => updateExpanding(Array(playlists.length).fill(false)),
    [playlists]
  );

  // If not logged in redirect to the login page.
  if (!username) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <UserInfoView email={props.model.email} username={props.model.username} />
      <ShowPlaylistView
        playlists={playlists}
        expanding={expanding}
        expand={expand}
        editPlaylist={editPlaylist}
      />
      <CreatePlaylistButtonView
        createPlaylistButtonClick={() => navigate("/profile/create-playlist")}
      />
    </div>
  );
}
