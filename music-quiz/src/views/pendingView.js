import { ListGroup, Button, Badge } from "react-bootstrap";

export default function PendingView(props) {
  return (
    <div style={{ width: "568px" }}>
      <ListGroup>
        {props.pending.map((event, index) => {
          let type = "Friend Request";
          let color = "info";
          if (event.type === "challenge") {
            type = "Challenge";
            color = "warning";
          }
          if (event.from) {
            return (
              <ListGroup.Item
                key={index}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <Badge
                    pill
                    bg={color}
                    style={{ height: "20px", marginRight: "10px" }}
                  >
                    !
                  </Badge>
                  You have a {type} from {event.username}!
                </div>

                <div>
                  <Button
                    onClick={(e) => {
                      props.accept(event.id, event.from, event.username);
                    }}
                    size="sm"
                    variant="success"
                    style={{ marginRight: "5px" }}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={(e) => {
                      props.decline(event.id, event.type, event.from);
                    }}
                    size="sm"
                    variant="danger"
                  >
                    Decline
                  </Button>
                </div>
              </ListGroup.Item>
            );
          } else {
            return (
              <ListGroup.Item
                key={index}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <Badge
                    pill
                    bg="success"
                    style={{ height: "20px", marginRight: "10px" }}
                  >
                    i
                  </Badge>
                  You have sent a request to {event.username}, waiting for
                  response
                </div>
              </ListGroup.Item>
            );
          }
        })}
      </ListGroup>
    </div>
  );
}
