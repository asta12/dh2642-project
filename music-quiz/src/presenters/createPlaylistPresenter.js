import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import SearchSongView from "../views/searchSongView.js";
import resolvePromise from "../resolvePromise.js";
import { searchSong } from "../songSource.js";
import SearchResultsView from "../views/searchResultsView.js";
import promiseNoData from "../views/promiseNoData.js";
import CreatePlaylistName from "../views/createPlaylistNameView.js";
import CreatePlaylistSelectedSongs from "../views/createPlaylistSelectedSongsView.js";
import { Row, Col } from "react-bootstrap";

/**
 * The minimum number of songs that a playlist must contain.
 */
const PLAYLIST_MIN_SONGS = 5;

/**
 * The maximum number of songs that a playlist can contain.
 */
const PLAYLIST_MAX_SONGS = 10;

export default function CreatePlaylist(props) {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [createPlaylistErrorMessage, setCreatePlaylistErrorMessage] =
    useState("");
  const [searchString, updateSearchString] = useState("");
  const [initialSearch, updateInitialSearch] = useState(false);
  const [page, updatePage] = useState(1);
  const [promiseState] = useState({});
  const [, reRender] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialSearch) {
      search();
    }
  }, [page]);

  function search() {
    updateInitialSearch(true);
    resolvePromise(searchSong(searchString, page), promiseState, notify);
  }

  function newSearch() {
    updatePage(1);
    search();
  }

  function notify() {
    reRender(new Object());
  }

  function nextPage() {
    updatePage(page + 1);
  }

  function prevPage() {
    if (page === 1) {
      return;
    }
    updatePage(page - 1);
  }

  function updateInput(newInput) {
    updateSearchString(newInput);
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
      setCreatePlaylistErrorMessage("You need to give the playlist a name!");
    } else if (playlistSongs.length < PLAYLIST_MIN_SONGS) {
      setCreatePlaylistErrorMessage(
        `You need to provide at least ${PLAYLIST_MIN_SONGS} songs!`
      );
    } else {
      // The playlist is valid save it in our model.
      setCreatePlaylistErrorMessage("");
      props.model.addPlaylist({
        id: props.model.getUniquePlaylistID(),
        name: playlistName,
        songs: playlistSongs,
      });
      // Go back to the profile.
      navigate("/profile");
    }
  }

  if (!props.model.currentUser) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div>
        <CreatePlaylistName playlistNameChange={setPlaylistName} />
        <Row>
          <Col>
            <SearchSongView
              updateSearchString={updateInput}
              search={newSearch}
              nextPage={nextPage}
              prevPage={prevPage}
              page={page}
            />
            {promiseNoData(promiseState) || (
              <SearchResultsView
                searchResults={promiseState.data}
                addSongToPlaylist={addSongToPlaylist}
                isSongInPlaylist={isSongInPlaylist}
                isPlaylistFull={isPlaylistFull}
              />
            )}
          </Col>
          <Col>
            <CreatePlaylistSelectedSongs
              playlistSongs={playlistSongs}
              removeSongFromPlaylist={removeSongFromPlaylist}
              errorMessage={createPlaylistErrorMessage}
              savePlaylist={savePlaylistToModel}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
