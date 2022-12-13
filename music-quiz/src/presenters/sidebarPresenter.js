import React, { useEffect, useState } from "react";
import FriendsView from "../views/friendsView.js";
import PendingView from "../views/pendingView.js";
import { Button, Image, Offcanvas } from "react-bootstrap";
import notes from "../images/notes.png";

export default function SidebarPresenter(props) {
  const [expanded, updateExpanded] = useState(false);
  const [, reRender] = useState();
  const [pending, updatePending] = useState(props.model.pending);
  const [friends, updateFriends] = useState(props.model.friends);
  const [currentUser, updateCurrentUser] = useState(props.model.currentUser);
  const [showPopup, updateShowPopup] = useState(false);
  const [playlist, updatePlaylist] = useState({});
  const [friend, updateChoosenFriend] = useState("");

  function expand() {
    updateExpanded(!expanded);
  }

  function challenge() {
    console.log(playlist.id);
    props.model.newPendingRequest(friend, "challenge", playlist.id);
  }

  function observer(payload) {
    if (payload?.addFriend) {
      updateFriends(props.model.friends);
    } else if (payload?.clearData) {
      updatePending([]);
    } else if (payload?.removePending) {
      updatePending(props.model.pending);
    } else if (
      payload?.newPending &&
      payload?.addressId === props.model.currentUser
    ) {
      updatePending(props.model.pending);
    } else if (payload?.currentUser) {
      updateCurrentUser(payload.currentUser);
    } else if (payload?.logOut) {
      updateCurrentUser(null);
      updatePending([]);
      updateFriends([]);
    }
    reRender(new Object());
  }

  function whenCreated() {
    props.model.addObserver(observer);

    function whenTakenDown() {
      props.model.removeObserver(observer);
    }
    return whenTakenDown;
  }

  function accept(requestId, id, username, type) {
    if (type === "friendRequest") {
      props.model.addFriend(requestId, id, username);
    } else {
      props.model.acceptChallenge(requestId, id, username, playlist);
    }
  }

  function decline(requestId, type, userId) {
    props.model.removeRequest(requestId, type, userId);
  }

  function togglePopup(f) {
    updateChoosenFriend(f);
    updateShowPopup(!showPopup);
    if (!showPopup) updatePlaylist({});
  }

  function choosePlaylist(newPlaylist) {
    updatePlaylist(newPlaylist);
  }

  useEffect(whenCreated, []);

  return !currentUser ? (
    <></>
  ) : (
    <>
      <div>
        <Button variant="light" onClick={(e) => expand()}>
          <Image src={notes} height="50px" />
        </Button>
      </div>
      <Offcanvas
        show={expanded}
        onHide={expand}
        scroll={true}
        backdrop={false}
        style={{ width: "600px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Friends</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ position: "relative" }}>
          <FriendsView
            friends={friends}
            showPopup={showPopup}
            togglePopup={togglePopup}
            playlistOptions={props.model.playlists}
            playlist={playlist}
            choosePlaylist={choosePlaylist}
            challenge={challenge}
          />
          <div style={{ position: "sticky", bottom: "0px", left: "0px" }}>
            <PendingView
              pending={pending}
              accept={(requestId, id, username, type) =>
                accept(requestId, id, username, type)
              }
              decline={(requestId, type, userId) =>
                decline(requestId, type, userId)
              }
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
