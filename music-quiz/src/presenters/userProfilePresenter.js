import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ShowPlaylistView from "../views/showPlaylistView";
import UserInfoView from "../views/userInfoView";
import CreatePlaylistButtonView from "../views/createPlaylistButtonView";
import ReactStars from "react-rating-stars-component";

export default function UserProfilePresenter(props) {
  const [playlists, updatePlaylists] = useState(props.model.playlists);
  const [email, setEmail] = useState(props.model.email);
  const [username, setUsername] = useState(props.model.username);
  const [expanding, updateExpanding] = useState([]);
  const navigate = useNavigate();

  function expand(index) {
    updateExpanding(
      expanding.map((exp, expandIndex) => {
        if (index === expandIndex) {
          return !exp;
        } else {
          return exp;
        }
      })
    );
  }

  function editPlaylist(playlistID) {
    navigate(`/profile/edit-playlist?id=${playlistID}`);
  }

  function whenCreated() {
    function observer(payload) {
      updatePlaylists(props.model.playlists);
      setEmail(props.model.email);
      setUsername(props.model.username);
    }
    props.model.addObserver(observer);

    function whenTakenDown() {
      props.model.removeObserver(observer);
    }
    return whenTakenDown;
  }

  function averageRating(playlistHistory) {
    if (!playlistHistory) {
      return (
        <p style={{ margin: "0px", color: "lightGrey" }}>No ratings yet</p>
      );
    }
    let ratings = Object.values(playlistHistory).filter((history) => {
      if (history.rating) {
        return true;
      }
      return false;
    });
    if (ratings.length === 0) {
      return <p style={{ margin: "0px" }}>No Rating</p>;
    }
    let sumOfRatings = 0;
    ratings.map((score, index) => {
      sumOfRatings += score.rating;
    });
    let averageRating = Math.round(sumOfRatings / ratings.length);
    return (
      <div style={{ display: "flex" }}>
        <p style={{ margin: "3px 3px" }}>Rating:</p>
        <ReactStars
          count={5}
          value={averageRating}
          size={20}
          activeColor="#ffd700"
          edit={false}
        />
      </div>
    );
  }

  useEffect(whenCreated, []);
  useEffect(
    () => updateExpanding(Array(playlists.length).fill(false)),
    [playlists]
  );

  // If not logged in redirect to the login page.
  if (!username) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <UserInfoView email={props.model.email} username={props.model.username} />
      <ShowPlaylistView
        playlists={playlists}
        averageRating={averageRating}
        expanding={expanding}
        expand={expand}
        editPlaylist={editPlaylist}
        editable={true}
      />
      <CreatePlaylistButtonView
        createPlaylistButtonClick={() => navigate("/profile/create-playlist")}
      />
    </div>
  );
}
