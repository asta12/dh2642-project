import React, { useEffect, useState } from "react";
import ShowPlaylistView from "../views/showPlaylistView";

export default function UserProfilePresenter(props) {
  const [playlists, updatePlaylists] = useState(props.model.playlists);
  const [expanding, updateExpanding] = useState([])
  
  function expand(index) {
    updateExpanding(expanding.map((exp, expandIndex) => {
      if (index === expandIndex) {
        return !exp
      } else {
        return exp
      }
    }))
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
  useEffect(() => updateExpanding(Array(playlists.length).fill(false)), [playlists])
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
