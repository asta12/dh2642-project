import trophy from "../images/trophy.png";
import star from "../images/star_with_outline.png";
import { Image, ListGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ScoreboardView(props) {
  return (
    <ListGroup>
      {props.scores.map((score, index) => {
        let img = (
          <div
            style={{
              paddingRight: "8px",
              paddingLeft: "8px",
              fontWeight: "bold",
            }}
          >
            {index + 1}
          </div>
        );
        if (index === 0) {
          img = <Image src={trophy} width="30px" />;
        }
        return (
          <ListGroup.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {img}{" "}
              <Link to={`/friend?id=${score.userID}`}>{score.username}</Link>{" "}
              {score.score} p
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
