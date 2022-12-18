import notes from "../images/notes.png";
import robotCropped from "../images/singing_robot_cropped.png";
import { Stack, Image } from "react-bootstrap";

function Header() {
  return (
    <Stack
      direction="horizontal"
      gap={2}
      style={{ margain: "5px 5px 5px 5px", justifyContent: "center" }}
    >
      <Image src={notes} width="40px" style={{ marginRight: "0px" }} />
      <h2 style={{ color: "#4682B4", textShadow: "#000 0px 0px 1px" }}>
        Music Quiz with a Twist
      </h2>
      <Image src={robotCropped} width="70px" style={{ marginRight: "0px" }} />
    </Stack>
  );
}

export default Header;
