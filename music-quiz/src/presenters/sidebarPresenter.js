import React, { useEffect, useState } from "react";
import FriendsView from "../views/friendsView.js";
import PendingView from "../views/pendingView.js";
import { Button, Image, Offcanvas } from "react-bootstrap";
import notes from "../images/notes.png";

export default function SidebarPresenter(props) {
  const [expanded, updateExpanded] = useState(false);
  const [, reRender] = useState();

  function expand() {
    updateExpanded(!expanded);
  }

  function observer(payload) {
    if (
      payload?.addFriend ||
      payload?.newPending ||
      payload?.clearData ||
      payload?.requestRemoved
    ) {
      reRender(new Object());
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

  return (
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
              pending={props.model.pending}
              accept={(id, username) => accept(id, username)}
              decline={(requestId) => decline(requestId)}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
