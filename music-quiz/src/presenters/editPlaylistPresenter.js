import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  PLAYLIST_MIN_SONGS,
  PLAYLIST_MAX_SONGS,
} from "../settings/playlistSettings.js";
import EditPlaylistView from "../views/editPlaylistView.js";

export default function EditPlaylistPresenter(props) {
  const [playlistID, setPlaylistID] = useState(null);
  const [playlistName, setPlaylistName] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentUser, updateCurrentUser] = useState(props.model.currentUser);
  const navigate = useNavigate();

  function observer(payload) {
    if (payload?.currentUser) {
      updateCurrentUser(payload.currentUser);
    } else if (payload?.logOut) {
      updateCurrentUser(null);
    } else {
      loadPlaylist();
    }
  }

  function whenCreated() {
    if (currentUser) {
      loadPlaylist();
    }
    props.model.addObserver(observer);

    function whenTakenDown() {
      props.model.removeObserver(observer);
    }

    return whenTakenDown;
  }

  useEffect(whenCreated, []);

  function loadPlaylist() {
    // Tries to load the playlist to edit by looking at the URL query and the model.
    const id = +searchParams.get("id");
    const findPlaylist = props.model.playlists.find(
      (playlist) => playlist.id === id
    );
    if (findPlaylist) {
      setPlaylistID(findPlaylist.id);
      setPlaylistName(findPlaylist.name);
      setPlaylistSongs([...findPlaylist.songs]);
    }
  }

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
      props.model.editPlaylist({
        id: playlistID,
        name: playlistName,
        songs: playlistSongs,
      });
      // Go back to the profile.
      navigate("/profile");
    }
  }

  function deletePlaylistFromModel() {
    props.model.deletePlaylist(playlistID);
    navigate("/profile");
  }

  if (!currentUser) {
    return <Navigate replace to="/login" />;
  } else if (!playlistID) {
    return "Cannot find playlist";
  } else {
    return (
      <div>
        <EditPlaylistView
          playlistName={playlistName}
          playlistNameChange={setPlaylistName}
          addSongToPlaylist={addSongToPlaylist}
          isSongInPlaylist={isSongInPlaylist}
          isPlaylistFull={isPlaylistFull}
          playlistSongs={playlistSongs}
          removeSongFromPlaylist={removeSongFromPlaylist}
          savePlaylist={savePlaylistToModel}
          deletePlaylist={deletePlaylistFromModel}
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}
