import React, { useState, useEffect } from "react";
import SelectedSongsView from "../views/selectedSongsView.js";

export default function SelectedSongsPresenter(props) {
  return (
    <div>
        <SelectedSongsView 
            playlistSongs={props.playlistSongs}
            removeSongFromPlaylist={props.removeSongFromPlaylist}
        />
    </div>
  );
}
