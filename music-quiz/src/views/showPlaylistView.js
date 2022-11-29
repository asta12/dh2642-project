import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Button, Stack } from "react-bootstrap";
import down from "../images/down.png";
import up from "../images/up.png";

// testdata: this should be retrieved from props
let playlists = [
  {
    name: "Christmas Songs",
    songs: [
      {
        title: "Last Christmas",
        artist: "Wham!",
      },
      {
        title: "All I Want For Christmas Is you",
        artist: "Mairah Carey",
      },
      {
        title: "Run Rudolph Run",
        artist: "Chuck Berry",
      },
    ],
  },
  {
    name: "80's",
    songs: [
      {
        title: "Take On Me",
        artist: "A-ha",
      },
      {
        title: "Africa",
        artist: "Toto",
      },
      {
        title: "Never Gonna Give You Up",
        artist: "Rick Astley",
      },
    ],
  },
  {
    name: "Queen",
    songs: [
      {
        title: "Bohemian Rhapsody",
        artist: "Queen",
      },
      {
        title: "Another One Bites The Dust",
        artist: "Queen",
      },
      {
        title: "We Will Rock You",
        artist: "Queen",
      },
    ],
  },
];

export default function ShowPlaylistView(props) {
  const [current, updateCurrent] = useState(-1);

  function expand(i) {
    if (current === i) {
      updateCurrent(-1);
    } else {
      updateCurrent(i);
    }
  }

  return (
    <div>
      <h2>Playlists:</h2>
      <ListGroup>
        {playlists.map((playlist, index) => {
          let songs = <></>;
          let img = (
            <img
              src={up}
              alt="add item"
              width="25"
              onClick={(e) => {
                expand(index);
              }}
            />
          );
          if (index === current) {
            songs = (
              <ListGroup>
                {playlist.songs.map((song, songIndex) => {
                  return (
                    <ListGroup.Item key={songIndex + 100}>
                      {song.title} - {song.artist}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            );
            img = (
              <img
                src={down}
                alt="add item"
                width="25"
                onClick={(e) => {
                  expand(index);
                }}
              />
            );
          }
          return (
            <ListGroup.Item>
              <Stack direction="horizontal">
                <div style={{ display: "flex" }}>
                  {img}
                  <h5>{playlist.name}</h5>
                </div>
                <div className="ms-auto">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      console.log("edit " + playlist.name);
                    }}
                    variant="outline-primary">
                    Edit
                  </Button>
                </div>
              </Stack>
              {songs}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}