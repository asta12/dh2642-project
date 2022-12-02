import { useState } from "react";
import FriendsView from "../views/friendsView.js";
import PendingView from "../views/pendingView.js";
import { Button, Image, Offcanvas } from "react-bootstrap";
import notes from "../images/notes.png";

export default function SidebarPresenter(props) {
  const [expanded, updateExpanded] = useState(false);

  function expand() {
    updateExpanded(!expanded);
  }

  return (
    <>
      <div>
        <Button variant="light" onClick={(e) => expand()}>
          <Image src={notes} height="50px"/>
        </Button>
      </div>
      <Offcanvas show={expanded} onHide={expand} scroll={true} backdrop={false} style={{ width: "600px" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Friends</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style= {{ position: "relative" }}>
            <FriendsView />
            <div style={{ position: "sticky", bottom: "0px", left: "0px" }}>
              <PendingView />
            </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
