import React from "react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import resolvePromise from "../resolvePromise";
import { extractFirst20Lines, numSongsToGuess } from "../settings/gameSettings";
import { getSongLyrics } from "../songSource";
import GameGuessSongView from "../views/gameGuessSongView";
import GameOverView from "../views/gameOverView";
import GameSettingsView from "../views/gameSettingsView";
import promiseNoData from "../views/promiseNoData";
import { searchForPlaylist } from "../models/firebaseModel";

function GamePresenter(props) {
  const [songLyricsPromiseStates, setSongLyricsPromiseStates] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState({});
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [volume, setVolume] = useState(0.5);
  const [speed, setSpeed] = useState(0.6);
  const [guesses, setGuesses] = useState([]);
  const [challengeMode, setChallengeMode] = useState(false)
  const [challengePlaylistPromiseState, setChallengePlaylistPromiseState] = useState({})
  const [, reRender] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  function componentCreated() {
    function onObserverNotification() {
      setPlaylists(props.model.playlists);
    }

    function onComponentTakeDown() {
      window.speechSynthesis.cancel();
      props.model.removeObserver(onObserverNotification);
    }

    // We might be in "challenge mode". If we are then we must load the playlist from the firebase database.
    loadPlaylistInChallengeMode();

    props.model.addObserver(onObserverNotification);

    return onComponentTakeDown;
  }

  useEffect(componentCreated, []);

  function loadPlaylistInChallengeMode() {
    const userID = searchParams.get("userID");
    const playlistID = searchParams.get("playlistID");
    if (userID && playlistID) {
        setChallengeMode(true)
        console.log(`Challenge mode: ${userID}:${playlistID}`)
        // Load the user's playlist from the firebase database.
        resolvePromise(searchForPlaylist(userID, playlistID), challengePlaylistPromiseState, () => reRender(new Object()))
    }
  }

  function nextSong() {
    const nextSongIndex = currentSongIndex + 1;
    resolvePromise(
      getSongLyrics(selectedSongs[nextSongIndex].id),
      songLyricsPromiseStates[nextSongIndex],
      () => reRender(new Object())
    );
    setCurrentSongIndex(nextSongIndex);
  }

  function getFourAnswerOptions(songs, index) {
    const correct = [{ correct: true, title: songs[index].title }];
    const wrong = songs
      .slice(index + 1)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((song) => {
        return { correct: false, title: song.title };
      });
    return correct.concat(wrong).sort(() => Math.random() - 0.5);
  }

  function correctGuess() {
    setGuesses([...guesses, true]);
  }

  function wrongGuess() {
    setGuesses([...guesses, false]);
  }

  function onPlaylistSelected(id) {
    const playlist = props.model.playlists.find((pl) => pl.id === id);
    const shuffledSongs = [...playlist.songs].sort(() => Math.random() - 0.5);
    const answerOptions = shuffledSongs.map((song, index) =>
      getFourAnswerOptions(shuffledSongs, index)
    );
    console.log(shuffledSongs);
    console.log(answerOptions);
    setSelectedPlaylist(playlist);
    setSelectedSongs(shuffledSongs);
    setAnswerOptions(answerOptions);
    setSongLyricsPromiseStates(playlist.songs.map((song) => new Object()));
  }

  if (challengePlaylistPromiseState.data) {
    console.log(challengePlaylistPromiseState.data.val())
  }

  if (currentSongIndex === -1) {
    return (
      <GameSettingsView
        currentVolume={volume}
        onVolumeChange={setVolume}
        currentSpeed={speed}
        onSpeedChange={setSpeed}
        onStartClick={nextSong}
        playlists={props.model.playlists}
        onPlaylistSelected={onPlaylistSelected}
        choosePlaylistText={
          selectedPlaylist.songs ? selectedPlaylist.name : "Choose a playlist"
        }
      />
    );
  }

  if (currentSongIndex < numSongsToGuess) {
    return (
      promiseNoData(songLyricsPromiseStates[currentSongIndex]) || (
        <GameGuessSongView
          songLyrics={extractFirst20Lines(
            songLyricsPromiseStates[currentSongIndex].data
          )}
          speed={speed}
          volume={volume}
          answers={answerOptions[currentSongIndex]}
          guesses={guesses}
          correctGuess={correctGuess}
          wrongGuess={wrongGuess}
          nextSong={nextSong}
        />
      )
    );
  }

  return <GameOverView guesses={guesses} />;
}

export default GamePresenter;
