import React, { useEffect, useState } from "react";
import FriendsView from "../views/friendsView.js";
import PendingView from "../views/pendingView.js";
import { Button, Image, Offcanvas } from "react-bootstrap";
import notes from "../images/notes.png";

export default function SidebarPresenter(props) {
  const [expanded, updateExpanded] = useState(false);
  const [, reRender] = useState();
  const [pending, updatePending] = useState([]);
  const [currentUser, updateCurrentUser] = useState(props.model.currentUser);

  function expand() {
    updateExpanded(!expanded);
  }

  function observer(payload) {
    if (payload?.addFriend) {
      reRender(new Object());
    } else if (payload?.clearData) {
      updatePending([]);
    } else if (payload?.requestRemoved) {
      updatePending(
        pending.filter((request) => request.id === payload.removedRequest)
      );
    } else if (
      payload?.newPending &&
      payload.addressId === props.model.currentUser
    ) {
      updatePending([...pending, payload.newPending]);
    } else if (payload?.currentUser) {
      updateCurrentUser(payload.currentUser);
    } else if (payload?.logOut) {
      updateCurrentUser(null);
    }
  }

  function whenCreated() {
    props.model.addObserver(observer);

    function whenTakenDown() {
      props.model.removeObserver(observer);
    }
    return whenTakenDown;
  }

  function accept(id, username) {
    props.model.addFriend(id, username);
  }

  function decline(requestId) {
    props.model.removeRequest(requestId, null, null);
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
          <FriendsView friends={props.model.friends} />
          <div style={{ position: "sticky", bottom: "0px", left: "0px" }}>
            <PendingView
              pending={pending}
              accept={(id, username) => accept(id, username)}
              decline={(requestId) => decline(requestId)}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
