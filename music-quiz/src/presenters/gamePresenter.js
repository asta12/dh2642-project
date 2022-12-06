import React from "react";
import SettingsView from "../views/settingsView";
import GuessSongView from "../views/guessSongView";
import ScoreView from "../views/scoreView";
import ChoosePlaylistView from "../views/choosePlaylistView";
import GameOverView from "../views/gameOverView"
import { getSongLyrics} from "../songSource"
import { useState, useEffect } from "react";
import promiseNoData from "../views/promiseNoData";
import resolvePromise from "../resolvePromise";

function GamePresenter(props) {

  const songsToGuess = 2

  const [_, reRender] = useState()
  const [songLyricsPromiseState, setSongLyricsPromiseState] = useState({});
  const [playlistChosen, setPlaylistChosen] = useState(false)
  const [isInbetweenSongs, setIsInbetweenSongs] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false)
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [correctSongs, setCorrectSongs] = useState([])
  const [allSongs, setAllSongs] = useState([])
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
  const [previousGuessText, setPreviousGuessText] = useState("");
  const [userPlaylists, setUserPlaylists] = useState(props.model["playlists"]);

  function updateModelSettings() {
    props.model.settings["volume"] = currentVolume;
    props.model.settings["speed"] = currentSpeed;
  }

  function startGame() {
    if(currentPlaylist.length > 0){
    setGameStarted(true);
    // Only update user settings when play is pressed
    updateModelSettings();
    // Get the lyrics for the first song
    resolvePromise(getSongLyrics(correctSongs[0].id), songLyricsPromiseState, () => {playTextToSpeech();reRender(new Object())});
    }
  }

  function playTextToSpeech() {
    if(songLyricsPromiseState.data && !isInbetweenSongs){
    window.speechSynthesis.cancel();
    const u = getSpeechSettingsObject();
    window.speechSynthesis.speak(u);
    }
  }

  function getSpeechSettingsObject() {
    const u = new SpeechSynthesisUtterance();
    u.text = songLyricsPromiseState.data;
    u.pitch = 1;
    u.rate = currentSpeed;
    u.volume = currentVolume;
    return u;
  }

  function getNextSong() {
    if (currentSongIndex < correctSongs.length - 1) {
      resolvePromise(getSongLyrics(correctSongs[currentSongIndex+1].id), songLyricsPromiseState, () => {playTextToSpeech();reRender(new Object())});

      function startNextSong() {
        setIsInbetweenSongs(false);
        setCurrentSongIndex(currentSongIndex + 1);
        setPreviousGuessText("");
      } 
      setTimeout(startNextSong, 5000);
      
    } else {
      setPreviousGuessText("Game Over!");
      setGameOver(true)
      window.speechSynthesis.cancel();
    }
  }

  function playAgain(){
    // Reset all state of the game
    setSongLyricsPromiseState({})
    setIsInbetweenSongs(false)
    setPlayerScore(0)
    setGameStarted(false)
    setGameOver(false)
    setCurrentSongIndex(0)
    setButtonStyles([
      "primary",
      "primary",
      "primary",
      "primary",
    ])
    setPreviousGuessText("")

  }

  function getSongAlternatives(playlist){
    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    const shuffled = shuffle([...playlist]);
    
    const rightAnswers = shuffled.slice(0, songsToGuess);
    const alternativePool = shuffled.slice(songsToGuess, shuffled.length);

    function constructAlternatives(correctSong){
      
      let alternatives = shuffle([...alternativePool]);
      alternatives = alternatives.slice(0, 3);
      return shuffle([correctSong, ...alternatives]);
      
      
    } 
    setCorrectSongs(rightAnswers);
    const found = rightAnswers.map(constructAlternatives)
    setAllSongs(found)

    

    

  }

  function playlistSelected(id) {
    
    const foundPlaylist = props.model.playlists.find((playlist) => playlist.id === id);
    getSongAlternatives(foundPlaylist.songs);
    setCurrentPlaylist(foundPlaylist.songs);
    
  }

  function setButtonStylingAfterGuess(guessedSongIndex, correctSongIndex) {
    let newButtonStyles = [...buttonStyles];
   
    if (guessedSongIndex !== correctSongIndex) {
      newButtonStyles[guessedSongIndex] = "danger";
    }
    newButtonStyles[correctSongIndex] = "success";
    setButtonStyles(newButtonStyles);
  }

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

  function componentCreated() {
    function onObserverNotification() {
      // What state should be updated from the model
      setUserPlaylists(props.model["playlists"]);
      console.log("TODO");
    }

    function onComponentTakeDown() {
      props.model.removeObserver(onObserverNotification);
      window.speechSynthesis.cancel();
    }

    props.model.addObserver(onObserverNotification);
    return onComponentTakeDown;
  }

  useEffect(() => {
      if(isInbetweenSongs){
        getNextSong();
      }
  }, [isInbetweenSongs])

  // Call a callback each time the song changes and the game has started
  useEffect(() => {
    if (gameStarted) {
      setButtonStyles(["primary", "primary", "primary", "primary"]);
      playTextToSpeech();
    }
  }, [currentSongIndex]);
  useEffect(componentCreated, []);

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
          <ChoosePlaylistView playlists={userPlaylists} onPlaylistSelected={playlistSelected} />
        </>
      ) : (
        <>
          {(!isInbetweenSongs && promiseNoData(songLyricsPromiseState))
          ||
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
          />
          {gameOver ? 
          <GameOverView score={playerScore} onPlayAgainClick={playAgain}/> :
          ""}

          </>
        }
        </>
      )}
    </>
  );
}

export default GamePresenter;
