import React from "react";
import { useState, useEffect } from "react";
import resolvePromise from "../resolvePromise";
import { extractFirst20Lines, numSongsToGuess } from "../settings/gameSettings";
import { getSongLyrics } from "../songSource";
import GameGuessSongView from "../views/gameGuessSongView";
import GameSettingsView from "../views/gameSettingsView";
import promiseNoData from "../views/promiseNoData";

function GamePresenter2(props) {
  const [songLyricsPromiseStates, setSongLyricsPromiseStates] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState({});
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [volume, setVolume] = useState(0.5);
  const [speed, setSpeed] = useState(0.6);
  const [guesses, setGuesses] = useState([]);
  const [, reRender] = useState();

  function componentCreated() {
    function onObserverNotification() {
      setPlaylists(props.model.playlists);
    }

    function onComponentTakeDown() {
      window.speechSynthesis.cancel();
      props.model.removeObserver(onObserverNotification);
    }

    props.model.addObserver(onObserverNotification);

    return onComponentTakeDown;
  }

  useEffect(componentCreated, []);

  function nextSong() {
    const nextSongIndex = currentSongIndex + 1;
    resolvePromise(
      getSongLyrics(selectedSongs[nextSongIndex].id),
      songLyricsPromiseStates[nextSongIndex],
      () => reRender(new Object())
    );
    setCurrentSongIndex(nextSongIndex);
  }

  function getFourAnswerOptions() {
    const correct = [
      { correct: true, title: selectedSongs[currentSongIndex].title },
    ];
    const wrong = selectedSongs
      .slice(currentSongIndex + 1)
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
    const playlist = playlists.find((pl) => pl.id === id);
    setSelectedPlaylist(playlist);
    setSelectedSongs([...playlist.songs].sort(() => Math.random() - 0.5));
    setSongLyricsPromiseStates(playlist.songs.map((song) => new Object()));
  }
  
  useEffect(() => console.log(selectedSongs), [selectedSongs])
  
  if (currentSongIndex === -1) {
    return (
      <GameSettingsView
        currentVolume={volume}
        onVolumeChange={setVolume}
        currentSpeed={speed}
        onSpeedChange={setSpeed}
        onStartClick={nextSong}
        playlists={playlists}
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
          answers={getFourAnswerOptions()}
          guesses={guesses}
          correctGuess={correctGuess}
          wrongGuess={wrongGuess}
          nextSong={nextSong}
        />
      )
    );
  }

  return "Game over screen";
}

export default GamePresenter2;
