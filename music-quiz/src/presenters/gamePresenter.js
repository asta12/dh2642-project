import React from "react";
import GameView from "../views/gameView";
import SettingsView from "../views/settingsView";
import { useState, useEffect } from "react";

function GamePresenter(props) {
  const test_lyrics =
    "I been movin' calm, don't start no trouble with me \
    Tryna keep it peaceful is a struggle for me \
    ";

  const [currentLyrics, setCurrentLyrics] = useState(test_lyrics);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState("God's Plan");
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

  function playTextToSpeech() {
    // Only update user settings when he presses play
    updateModelSettings();

    window.speechSynthesis.cancel();
    const u = getSpeechSettingsObject();
    window.speechSynthesis.speak(u);
  }

  function getSpeechSettingsObject() {
    const u = new SpeechSynthesisUtterance();
    u.text = currentLyrics;
    u.pitch = 1;
    u.rate = currentSpeed;
    u.volume = currentVolume;
    return u;
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

  useEffect(componentCreated, []);

  return (
    <>
      <SettingsView
        currentVolume={currentVolume}
        onVolumeChange={(volume) => setCurrentVolume(volume)}
        currentSpeed={currentSpeed}
        onSpeedChange={(speed) => setCurrentSpeed(speed)}
      />
      <GameView
        onPlayClick={playTextToSpeech}
        onCheckClick={() => setShowLyrics(!showLyrics)}
        showLyrics={showLyrics}
      />
    </>
  );
}

export default GamePresenter;
