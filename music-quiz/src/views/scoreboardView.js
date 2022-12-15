import trophy from "../images/trophy.png";
import { Image, ListGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ScoreboardView(props) {
  let sortedScores = props.scores.sort((a, b) => a.score - b.score);
  return (
    <ListGroup>
      {console.log(typeof props.scores)}
      {sortedScores.map((score, index) => {
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
          <ListGroup.Item key={index}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {img}{" "}
              <Link to={`/friend?id=${score.playerID}`}>{score.username}</Link>{" "}
              {score.score} p
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
