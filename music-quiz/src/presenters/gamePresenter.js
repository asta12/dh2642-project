import React from "react";
import GameView from "../views/gameView";
import SettingsView from "../views/settingsView";
import GuessSongView from "../views/guessSongView";
import { useState, useEffect } from "react";

function GamePresenter(props) {
  
  const test_lyrics_1 =
  "Jag är sexton år\
  Jag är platsen dom aldrig upptäckte\
  Jag är en storm från ingenstans\
  Jag kan krossa ditt hjärta\
  Som en orkan kan jag svepa bort dig\
  Men jag tänker aldrig dö, nej\
  Det kommer aldrig va över för mig\
  Jag kommer älska dig när jorden gått under\
  För jag tänker aldrig dö, nej\
  Det kommer aldrig va över för mig\
  ";
  const test_lyrics_2 =
    "She played the fiddle in an Irish band\
    But she fell in love with an English man\
    Kissed her on the neck and then I took her by the hand\
    Said, Baby, I just want to dance\
    I met her on Grafton street right outside of the bar\
    She shared a cigarette with me while her brother played the guitar\
    She asked me what does it mean the Gaelic ink on your arm?\
    Said it was one of my friend's songs do you want to drink on?\
    ";
  
  const test_songs = [
    ["Cold Heart - Dua Lipa", "Wrong answer", "Wrong answer", "wrong answer"],
    ["Wrong answer", "Galway Girl", "Wrong answer", "wrong answer"],
  ];

  const [playerWon, setPlayerWon] = useState(false);
  const [playerScore, setPlayerScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState([
    { title: "Cold Heart - Dua Lipa", Lyrics: test_lyrics_1 },
    { title: "Galway Girl", Lyrics: test_lyrics_2 },
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(
    props.model.settings["volume"]
  );
  const [showLyrics, setShowLyrics] = useState(
    props.model.settings["showLyrics"]
  );
  const [currentSpeed, setCurrentSpeed] = useState(
    props.model.settings["speed"]
  );

  function updateModelSettings() {
    props.model.settings["volume"] = currentVolume;
    props.model.settings["showLyrics"] = showLyrics;
    props.model.settings["speed"] = currentSpeed;
  }

  function startGame() {
    setGameStarted(true);
    // Only update user settings when play is pressed
    updateModelSettings();
    setIsPlaying(true);
    playTextToSpeech();
  }

  function playTextToSpeech() {
    
    
    console.log("lyricindex: " + currentSongIndex);
    window.speechSynthesis.cancel();
    const u = getSpeechSettingsObject();
    window.speechSynthesis.speak(u);
    
  }

  function getSpeechSettingsObject() {
    const u = new SpeechSynthesisUtterance();
    console.log(currentPlaylist[currentSongIndex]["Lyrics"])
    u.text = currentPlaylist[currentSongIndex]["Lyrics"];
    u.pitch = 1;
    u.rate = currentSpeed;
    u.volume = currentVolume;
    return u;
  }

  function getNextSong() {
    if (currentSongIndex < currentPlaylist.length - 1) {
      
      setCurrentSongIndex(currentSongIndex + 1, playTextToSpeech());
    
    } else {
      alert("Game over your score is: " + playerScore);
      
      setGameStarted(false);
      setIsPlaying(false);
      window.speechSynthesis.cancel();
    }
  }
  
  function guessSong(guessedSongIndex) {
    console.log((test_songs[currentSongIndex][guessedSongIndex]));
    if (test_songs[currentSongIndex][guessedSongIndex] === currentPlaylist[currentSongIndex].title) {
      setPlayerScore(playerScore + 1);
      setPlayerWon(true);
      alert("Correct!");
    } else {
      setPlayerScore(playerScore - 1);
      alert("Incorrect!");
    }
    getNextSong();
  }

  function changePlayingStatus() {
    if (isPlaying) {
      window.speechSynthesis.pause();
    } else {
      window.speechSynthesis.resume();
    }

    setIsPlaying(!isPlaying);
  }

  function componentCreated() {
    function onObserverNotification() {
      // What state should be updated from the model
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
     if(gameStarted){
      playTextToSpeech();
     }

  }, [currentSongIndex]);
  useEffect(componentCreated, []);

  return (
    <>
      {!gameStarted ? (
        <SettingsView
          currentVolume={currentVolume}
          onVolumeChange={(volume) => setCurrentVolume(volume)}
          currentSpeed={currentSpeed}
          onSpeedChange={(speed) => setCurrentSpeed(speed)}
          onStartClick={startGame}
        />
      ) : (
        <GameView
          onCheckClick={() => setShowLyrics(!showLyrics)}
          gameStarted={gameStarted}
          showLyrics={showLyrics}
          playText={isPlaying ? "Stop" : "Play"}
          onPlayClick={changePlayingStatus}
        />
      )}
      {isPlaying ? (
        <GuessSongView songs={test_songs[currentSongIndex]} onGuessClick={guessSong} />
      ) : (
        ""
      )}
    </>
  );
}

export default GamePresenter;
