import React from "react";
import { useState, useEffect } from "react";
import resolvePromise from "../resolvePromise";
import { extractFirst20Lines, numSongsToGuess } from "../settings/gameSettings";
import { getSongLyrics } from "../songSource";
import GameGuessSongView from "../views/gameGuessSongView";
import GameOverView from "../views/gameOverView";
import GameSettingsView from "../views/gameSettingsView";
import promiseNoData from "../views/promiseNoData";
import {
  saveUserStatsInFirebase,
  searchForPlaylist,
  searchForPlaylistPlayerHistory,
} from "../models/firebaseModel";
import GameChallengeView from "../views/gameChallengeView";

function GamePresenter(props) {
  const [playlists, setPlaylists] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [songLyricsPromiseStates, setSongLyricsPromiseStates] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState({});
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [volume, setVolume] = useState(0.5);
  const [speed, setSpeed] = useState(0.6);
  const [guesses, setGuesses] = useState([]);
  const [rating, setRating] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(
    props.model.currentChallenge
  );
  const [challengePlaylistPromiseState, setChallengePlaylistPromiseState] =
    useState({});
  const [
    playlistPlayerHistoryPromiseState,
    setPlaylistPlayerHistoryPromiseState,
  ] = useState({});
  const [, reRender] = useState();

  function componentCreated() {
    function onObserverNotification() {
      setPlaylists(props.model.playlists);
      setCurrentChallenge(props.model.currentChallenge);
    }

    function onComponentTakeDown() {
      window.speechSynthesis.cancel();
      props.model.removeObserver(onObserverNotification);
    }

    props.model.addObserver(onObserverNotification);

    return onComponentTakeDown;
  }

  useEffect(componentCreated, []);

  useEffect(loadChallengeMode, [currentChallenge]);

  function loadChallengeMode() {
    if (!props.model.currentChallenge) {
      return;
    }
    // Load the user's playlist from the firebase database.
    resolvePromise(
      searchForPlaylist(
        props.model.currentChallenge.from,
        props.model.currentChallenge.playlist
      ),
      challengePlaylistPromiseState,
      () => {
        if (challengePlaylistPromiseState.data) {
          loadGameFromPlaylist(challengePlaylistPromiseState.data);
        } else {
          reRender(new Object());
        }
      }
    );
  }

  function startGame() {
    if (selectedPlaylist.songs) {
      nextSong();
      setErrorMessage("");
    } else {
      setErrorMessage("Please select a quiz to start playing!");
    }
  }

  function nextSong() {
    const nextSongIndex = currentSongIndex + 1;
    if (nextSongIndex === numSongsToGuess) {
      // Save the score and load the leaderboard.
      const playlistOwnerID = props.model.currentChallenge
        ? props.model.currentChallenge.from
        : props.model.currentUser;
      saveStats().then(() => {
        resolvePromise(
          searchForPlaylistPlayerHistory(playlistOwnerID, selectedPlaylist.id),
          playlistPlayerHistoryPromiseState,
          () => reRender(new Object())
        );
      });
    } else {
      resolvePromise(
        getSongLyrics(selectedSongs[nextSongIndex].id),
        songLyricsPromiseStates[nextSongIndex],
        () => reRender(new Object())
      );
    }
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
    loadGameFromPlaylist(props.model.playlists.find((pl) => pl.id === id));
  }

  function loadGameFromPlaylist(playlist) {
    const shuffledSongs = [...playlist.songs].sort(() => Math.random() - 0.5);
    const answerOptions = shuffledSongs.map((song, index) =>
      getFourAnswerOptions(shuffledSongs, index)
    );
    // Uncomment this to print the correct answers for each question.
    // console.log(answerOptions);
    setSelectedPlaylist(playlist);
    setSelectedSongs(shuffledSongs);
    setAnswerOptions(answerOptions);
    setSongLyricsPromiseStates(playlist.songs.map((song) => new Object()));
  }

  function saveStats() {
    const score = guesses.filter((guess) => guess).length;
    const playlistOwnerID = props.model.currentChallenge
      ? props.model.currentChallenge.from
      : props.model.currentUser;

    return saveUserStatsInFirebase(
      playlistOwnerID,
      selectedPlaylist.id,
      props.model.currentUser,
      props.model.username,
      score,
      rating
    );
  }

  function clearGameSettings() {
    props.model.setCurrentChallenge(null);
    setCurrentSongIndex(-1);
    setSelectedPlaylist({});
    setGuesses([]);
    setRating(null);
  }

  if (currentSongIndex === -1) {
    if (currentChallenge) {
      return (
        promiseNoData(
          challengePlaylistPromiseState,
          challengePlaylistPromiseState.error
        ) || (
          <GameChallengeView
            playlist={challengePlaylistPromiseState.data}
            onStartClick={startGame}
            onDeclineClick={clearGameSettings}
          />
        )
      );
    } else {
      return (
        <GameSettingsView
          currentVolume={volume}
          onVolumeChange={setVolume}
          currentSpeed={speed}
          onSpeedChange={setSpeed}
          onStartClick={startGame}
          playlists={props.model.playlists}
          onPlaylistSelected={onPlaylistSelected}
          choosePlaylistText={
            selectedPlaylist.songs ? selectedPlaylist.name : "Choose a playlist"
          }
          errorMessage={errorMessage}
        />
      );
    }
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
          exitGame={clearGameSettings}
        />
      )
    );
  }

  return (
    promiseNoData(
      playlistPlayerHistoryPromiseState,
      playlistPlayerHistoryPromiseState.error
    ) || (
      <GameOverView
        guesses={guesses}
        changeRating={setRating}
        saveRating={saveStats}
        playAgain={clearGameSettings}
        scores={playlistPlayerHistoryPromiseState.data}
      />
    )
  );
}

export default GamePresenter;
