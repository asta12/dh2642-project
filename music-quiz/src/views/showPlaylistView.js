import React, { useState } from "react"
import { ListGroup } from "react-bootstrap";


// testdata: this should be retrieved from props
let playlists = [
        {
            "name": "Christmas Songs", 
            "songs": [
                {
                    "title": "Last Christmas",
                    "artist": "Wham!"
                },
                {
                    "title": "All I Want For Christmas Is you",
                    "artist": "Mairah Carey"
                },
                {
                    "title": "Run Rudolph Run",
                    "artist": "Chuck Berry"
                }
            ]
        },
        {
            "name": "80's",
            "songs": [
                {
                    "title": "Take On Me",
                    "artist": "A-ha"
                },
                {
                    "title": "Africa",
                    "artist": "Toto"
                },
                {
                    "title": "Never Gonna Give You Up",
                    "artist": "Rick Astley"
                }
            ]
        },
        {
            "name": "Queen",
            "songs": [
                {
                    "title": "Bohemian Rhapsody",
                    "artist": "Queen"
                },
                {
                    "title": "Another One Bites The Dust",
                    "artist": "Queen"
                },
                {
                    "title": "We Will Rock You",
                    "artist": "Queen"
                }
            ]
        }
    ] 

export default
function ShowPlaylistView(props) {
    const [current, updateCurrent] = useState(-1)

    function expand(i) {
        if (current === i) {
            updateCurrent(-1)
        } else {
            updateCurrent(i)
        }
    }

    return  <div>
                <h2>Playlists:</h2>
                <ListGroup>
                    {playlists.map((playlist, index) => {
                        let songs = <></>
                        if (index === current) {
                            songs = <ListGroup>
                                        {playlist.songs.map((song, songIndex) => {
                                            return <ListGroup.Item key={songIndex+100}>{song.title} by {song.artist}</ListGroup.Item>
                                        })}
                                    </ListGroup>
                        }
                        return  <ListGroup.Item key={index} 
                                                action 
                                                onClick={(e) => {
                                                    expand(index)
                                                }}>
                                                <h5>{playlist.name}</h5>
                                    {songs}
                                </ListGroup.Item>
                    })}
                </ListGroup>
            </div>
}
