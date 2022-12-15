import React from "react";
import { ListGroup } from "react-bootstrap";
import { Button, Stack, Image } from "react-bootstrap";
import down from "../images/down.png";
import up from "../images/up.png";
import ScoreboardPopupPresenter from "../presenters/scoreboardPopupPresenter";

export default function ShowPlaylistView(props) {
  return (
    <div>
      <h2>Playlists</h2>
      {props.playlists.length === 0 ? (
        "The list of playlists is empty"
      ) : (
        <ListGroup>
          {props.playlists.map((playlist, index) => {
            let songs = <></>;
            let expandImg = (
              <img
                src={up}
                alt="add item"
                width="25"
                onClick={(e) => {
                  props.expand(index);
                }}
                style={{ cursor: "pointer" }}
              />
            );
            if (props.expanding[index]) {
              songs = (
                <ListGroup>
                  {playlist.songs.map((song, songIndex) => {
                    return (
                      <ListGroup.Item key={songIndex + 100}>
                        <Image
                          src={song.img_src}
                          thumbnail
                          className="me-3"
                          width="70"
                          height="70"
                        />
                        {song.title} - {song.artist_names}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              );
              expandImg = (
                <img
                  src={down}
                  alt="add item"
                  width="25"
                  onClick={(e) => {
                    props.expand(index);
                  }}
                  style={{ cursor: "pointer" }}
                />
              );
            }
            return (
              <ListGroup.Item key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    {expandImg}
                    <h5 style={{ margin: "0px" }}>{playlist.name}</h5>
                  </div>
                  {props.averageRating(playlist.playerHistory)}
                  <div>
                    <ScoreboardPopupPresenter
                      playerHistory={playlist.playerHistory}
                    />
                    {props.editable && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          props.editPlaylist(playlist.id);
                        }}
                        variant="outline-primary"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
                {songs}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
}
