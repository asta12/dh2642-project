import { ListGroup, Button, Badge } from "react-bootstrap";

const pending = [
  {
    type: "friend_request",
    from: "user_id",
    name: "Kalle Anka",
  },
  {
    type: "challenge",
    from: "user_id",
    name: "Musse Pigg",
  },
  {
    type: "friend_request",
    to: "user_id",
    name: "Långben",
  },
];

export default function PendingView(props) {
  return (
    <div style={{ width: "568px" }}>
      <ListGroup>
        {pending.map((event, index) => {
          if (event.to) {
            return;
          }

          let type = "Friend Request";
          let color = "info"
          if (event.type === "challenge") {
            type = "Challenge";
            color = "warning"
          }

          return (
            <ListGroup.Item
              key={index}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <Badge pill bg={color} style={{ height: "20px", marginRight: "10px" }}>
                  !
                </Badge>
                You have a {type} from {event.name}!
              </div>

              <div>
                <Button
                  onClick={(e) => console.log("accept " + event.name)}
                  size="sm"
                  variant="success"
                  style={{ marginRight: "5px" }}
                >
                  Accept
                </Button>
                <Button
                  onClick={(e) => console.log("decline " + event.name)}
                  size="sm"
                  variant="danger"
                >
                  Decline
                </Button>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
