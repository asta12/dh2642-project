import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatePlaylistView from "../views/createPlaylistView.js";
import { Navigate } from "react-router-dom";
import {
  PLAYLIST_MIN_SONGS,
  PLAYLIST_MAX_SONGS,
} from "../settings/playlistSettings.js";

export default function CreatePlaylistPresenter(props) {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, updateCurrentUser] = useState(props.model.currentUser);
  const navigate = useNavigate();

  function addSongToPlaylist(song) {
    setPlaylistSongs([...playlistSongs, song]);
  }

  function isSongInPlaylist(songID) {
    return playlistSongs.filter((song) => song.id === songID).length > 0;
  }

  function isPlaylistFull() {
    return playlistSongs.length === PLAYLIST_MAX_SONGS;
  }

  function removeSongFromPlaylist(songID) {
    setPlaylistSongs(playlistSongs.filter((song) => song.id !== songID));
  }

  function savePlaylistToModel() {
    // Check that the playlist is valid. The playlist must have a name and at least 5 songs.
    if (!playlistName) {
      setErrorMessage("You need to give the playlist a name!");
    } else if (playlistSongs.length < PLAYLIST_MIN_SONGS) {
      setErrorMessage(
        `You need to provide at least ${PLAYLIST_MIN_SONGS} songs!`
      );
    } else {
      // The playlist is valid save it in our model.
      setErrorMessage("");
      props.model.addPlaylist({
        id: props.model.getUniquePlaylistID(),
        name: playlistName,
        songs: playlistSongs,
      });
      // Go back to the profile.
      navigate("/profile");
    }
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
        <CreatePlaylistView
          playlistNameChange={setPlaylistName}
          addSongToPlaylist={addSongToPlaylist}
          isSongInPlaylist={isSongInPlaylist}
          isPlaylistFull={isPlaylistFull}
          playlistSongs={playlistSongs}
          removeSongFromPlaylist={removeSongFromPlaylist}
          savePlaylist={savePlaylistToModel}
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}
