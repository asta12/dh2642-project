import React, { useEffect, useState } from "react";
import FriendsView from "../views/friendsView.js";
import PendingView from "../views/pendingView.js";
import { Button, Image, Offcanvas, Badge } from "react-bootstrap";
import plus from "../images/plus.png";
import friendNotes from "../images/two_shades_friend_notes.png";
import { useNavigate, Link } from "react-router-dom";

export default function SidebarPresenter(props) {
  const [expanded, updateExpanded] = useState(false);
  const [, reRender] = useState();
  const [pending, updatePending] = useState(props.model.pending);
  const [friends, updateFriends] = useState(props.model.friends);
  const [currentUser, updateCurrentUser] = useState(props.model.currentUser);
  const [showPopup, updateShowPopup] = useState(false);
  const [playlist, updatePlaylist] = useState({});
  const [friend, updateChoosenFriend] = useState("");
  const navigate = useNavigate();

  function expand() {
    updateExpanded(!expanded);
  }

  function challenge() {
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
      props.model.setCurrentChallenge(requestId);
      props.model.acceptChallenge(requestId, id);
      navigate("/play");
    }
  }

  function decline(requestId, type, userId) {
    props.model.removeRequest(requestId, type, userId);
    props.model.setCurrentChallenge(null);
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
        <Button
          variant="light"
          onClick={(e) => expand()}
          style={{
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "0px",
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "0px",
            opacity: "0.85",
          }}
        >
          <Image src={friendNotes} height="50px" />
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
          <Offcanvas.Title>
            Friends
            <br />
            <Link
              as={Link}
              to="/profile/add-friend"
              key="add-friend"
              style={{
                fontSize: "14px",
                color: "grey",
                textDecoration: "none",
              }}
            >
              <Badge pill>
                <Image src={plus} height="9px" />
              </Badge>{" "}
              Add friend
            </Link>
          </Offcanvas.Title>
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
