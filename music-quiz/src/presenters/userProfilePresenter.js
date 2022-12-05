import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ShowPlaylistView from "../views/showPlaylistView";

export default function UserProfilePresenter(props) {
  const [playlists, updatePlaylists] = useState(props.model.playlists);
  const [expanding, updateExpanding] = useState([]);

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
    function observer(payload) {
      updatePlaylists(props.model.playlists);
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

  if (!props.model.currentUser) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div>
        <ShowPlaylistView
          playlists={playlists}
          expanding={expanding}
          expand={expand}
        />
      </div>
    );
  }
}
