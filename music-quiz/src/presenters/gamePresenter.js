import React from "react";
import SettingsView from "../views/settingsView";
import GuessSongView from "../views/guessSongView";
import ScoreView from "../views/scoreView";
import ChoosePlaylistView from "../views/choosePlaylistView";
import GameOverView from "../views/gameOverView";
import { getSongLyrics } from "../songSource";
import { useState, useEffect } from "react";
import promiseNoData from "../views/promiseNoData";
import resolvePromise from "../resolvePromise";
import {
  numSecondsAfterGuess,
  numSongsToGuess,
  extractFirst20Lines,
} from "../settings/gameSettings";

function GamePresenter(props) {
  const [countdownInterval, setCountdownInterval] = useState();
  const [promiseDataLyrics, setPromiseDataLyrics] = useState({});
  const [songLyricsPromiseState, setSongLyricsPromiseState] = useState({});
  const [countdown, setCountdown] = useState(numSecondsAfterGuess);
  const [isInbetweenSongs, setIsInbetweenSongs] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [correctSongs, setCorrectSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(
    props.model.settings["volume"]
  );
  const [currentSpeed, setCurrentSpeed] = useState(
    props.model.settings["speed"]
  );
  const [buttonStyles, setButtonStyles] = useState([
    "primary",
    "primary",
    "primary",
    "primary",
  ]);
  const [previousGuessText, setPreviousGuessText] = useState(
    "Which song are you hearing?"
  );
  const [userPlaylists, setUserPlaylists] = useState(props.model["playlists"]);

  function updateModelSettings() {
    props.model.settings["volume"] = currentVolume;
    props.model.settings["speed"] = currentSpeed;
  }
  /*
  starts the game given that we have chosen a playlist. Fetches the lyrics for the first song.
  */
  function startGame() {
    if (currentPlaylist.songs.length > 0) {
      setGameStarted(true);
      // Only update user settings when play is pressed
      updateModelSettings();
      // Get the lyrics for the first song
      resolvePromise(
        getSongLyrics(correctSongs[0].id),
        songLyricsPromiseState,
        promiseDataFound
      );
    }
  }

  function playTextToSpeech() {
    //  We only want to start playing given that we are not inbetween songs, and we have received the lyrics from a promise
    if (songLyricsPromiseState.data && !isInbetweenSongs) {
      window.speechSynthesis.cancel();
      const u = getSpeechSettingsObject();
      window.speechSynthesis.speak(u);
    }
  }

  /*
  Sets the text to speech options
  */
  function getSpeechSettingsObject() {
    const u = new SpeechSynthesisUtterance();
    u.text = extractFirst20Lines(songLyricsPromiseState.data);
    u.pitch = 1;
    u.rate = currentSpeed;
    u.volume = currentVolume;

    return u;
  }

  /*
  Function called by resolvePromise. When data is retrieved, we change the promiseDataLyrics state, causing an update via useState
  */
  function promiseDataFound() {
    if (songLyricsPromiseState.data) {
      setPromiseDataLyrics(songLyricsPromiseState.data);
    }
  }

  function performCountdown() {
    setCountdown((prevTime) => prevTime - 1);
  }

  /*
  Checks if there are any songs left, if that is the case we try to retrieve the next song. 
  At the end, we start the countdown.
  */
  function getNextSong() {
    if (currentSongIndex < correctSongs.length - 1) {
      resolvePromise(
        getSongLyrics(correctSongs[currentSongIndex + 1].id),
        songLyricsPromiseState,
        promiseDataFound
      );
    }
    setCountdownInterval(setInterval(performCountdown, 1000));
  }
  /*Resets the game */
  function playAgain() {
    setSongLyricsPromiseState({});
    setIsInbetweenSongs(false);
    setPlayerScore(0);
    setGameStarted(false);
    setGameOver(false);
    setCurrentSongIndex(0);
    setButtonStyles(["primary", "primary", "primary", "primary"]);
    setPreviousGuessText("Which song are you hearing?");
  }

  /*
  Needs a playlist of atleast (numberOfSongsToGuess + 3). Takes the playlist, shuffles it, chooses the NumberOfSongsToGuess songs 
  that will be the correct answers. For each song, it then randomly generates 3 alternatives from the remaining titles. 
   */
  function getSongAlternatives(playlist) {
    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    const shuffled = shuffle([...playlist]);

    const rightAnswers = shuffled.slice(0, numSongsToGuess);
    const alternativePool = shuffled.slice(numSongsToGuess, shuffled.length);

    function constructAlternatives(correctSong) {
      let alternatives = shuffle([...alternativePool]);
      alternatives = alternatives.slice(0, 3);
      return shuffle([correctSong, ...alternatives]);
    }
    setCorrectSongs(rightAnswers);
    const found = rightAnswers.map(constructAlternatives);
    setAllSongs(found);
  }

  /*
  Function used in choosePlaylistView to select a playlist for the game.
  */
  function playlistSelected(id) {
    const foundPlaylist = props.model.playlists.find(
      (playlist) => playlist.id === id
    );
    getSongAlternatives(foundPlaylist.songs);
    setCurrentPlaylist(foundPlaylist);
  }

  /*
  Takes a guessed song index as well as the correct song index. Changes the style so that
  if the guessed song index is different from the correct one, it is highlighted with the "danger"
  variant. The correct index always receives the "success" variant styling.
  */
  function setButtonStylingAfterGuess(guessedSongIndex, correctSongIndex) {
    let newButtonStyles = [...buttonStyles];

    if (guessedSongIndex !== correctSongIndex) {
      newButtonStyles[guessedSongIndex] = "danger";
    }
    newButtonStyles[correctSongIndex] = "success";
    setButtonStyles(newButtonStyles);
  }

  /*
  Performs a guess if we are not inbetween songs. Increments the player score and calls 
  on the function to update styling depending on if the user guessed correctly
  */
  function guessSong(guessedSongIndex) {
    if (isInbetweenSongs) {
      return;
    }
    setIsInbetweenSongs(true);
    const correctSongIndex = allSongs[currentSongIndex].findIndex(
      (song) => song.id === correctSongs[currentSongIndex].id
    );
    window.speechSynthesis.cancel();

    if (guessedSongIndex === correctSongIndex) {
      setPlayerScore(playerScore + 1);
      setPreviousGuessText("Correct!");
    } else {
      setPreviousGuessText("Wrong!");
    }

    setButtonStylingAfterGuess(guessedSongIndex, correctSongIndex);
  }
  /* Called when the component is rendered adds observers to the model and removes them upon
    component takedown
  */
  function componentCreated() {
    function onObserverNotification() {
      // What state should be updated from the model
      setUserPlaylists(props.model["playlists"]);
    }

    function onComponentTakeDown() {
      props.model.removeObserver(onObserverNotification);
      window.speechSynthesis.cancel();
    }

    props.model.addObserver(onObserverNotification);
    return onComponentTakeDown;
  }
  useEffect(componentCreated, []);
  /*
   Checks when the countdown state variable changes. If it changes to zero, this means we should progress in the game
   and increase the song index. Although if we are at the end, we instead set game over.
  */
  useEffect(() => {
    if (countdown === 0) {
      if (currentSongIndex === correctSongs.length - 1) {
        setGameOver(true);
        return;
      }
      clearInterval(countdownInterval);
      setIsInbetweenSongs(false);
      setCurrentSongIndex(currentSongIndex + 1);
      setPreviousGuessText("Which song are you hearing?");
      setCountdown(numSecondsAfterGuess);
    }
  }, [countdown]);

  // When we receive new promise data we call upon text to speech
  useEffect(() => {
    playTextToSpeech();
  }, [promiseDataLyrics]);

  // When we set inbetween songs, we start fetching the next song
  useEffect(() => {
    if (isInbetweenSongs) {
      getNextSong();
    }
  }, [isInbetweenSongs]);

  // Call a callback each time the song changes and the game has started
  useEffect(() => {
    if (gameStarted) {
      setButtonStyles(["primary", "primary", "primary", "primary"]);
      playTextToSpeech();
    }
  }, [currentSongIndex]);

  return (
    <>
      {!gameStarted ? (
        <>
          <SettingsView
            currentVolume={currentVolume}
            onVolumeChange={(volume) => setCurrentVolume(volume)}
            currentSpeed={currentSpeed}
            onSpeedChange={(speed) => setCurrentSpeed(speed)}
            onStartClick={startGame}
          />
          <ChoosePlaylistView
            playlists={userPlaylists}
            onPlaylistSelected={playlistSelected}
            choosePlaylistText={
              currentPlaylist.songs ? currentPlaylist.name : "Choose a playlist"
            }
          />
        </>
      ) : (
        <>
          {(!isInbetweenSongs && promiseNoData(songLyricsPromiseState)) || (
            <>
              {gameOver ? (
                <GameOverView
                  score={playerScore}
                  onPlayAgainClick={playAgain}
                />
              ) : (
                <>
                  <GuessSongView
                    songs={allSongs[currentSongIndex]}
                    onGuessClick={guessSong}
                    buttonStyles={buttonStyles}
                  />
                  <ScoreView
                    score={playerScore}
                    maxScore={correctSongs.length}
                    previousGuessText={previousGuessText}
                    successStyle={
                      buttonStyles.includes("danger")
                        ? "danger"
                        : buttonStyles.includes("success")
                        ? "success"
                        : "secondary"
                    }
                    countdown={isInbetweenSongs ? countdown : ""}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default GamePresenter;
