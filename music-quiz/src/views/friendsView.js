import { ListGroup, Badge, Button, Image } from "react-bootstrap";
import p1 from "../images/profile_pic_1.png";
import p2 from "../images/profile_pic_2.png";
import p3 from "../images/profile_pic_3.png";
import p4 from "../images/profile_pic_4.png";

const friends = [
  {
    user_id: "user_id",
    name: "Pluto",
  },
  {
    user_id: "user_id",
    name: "Mimmi Pigg",
  },
  {
    user_id: "user_id",
    name: "Kajsa Anka",
  },
  {
    user_id: "user_id",
    name: "A",
  },
  {
    user_id: "user_id",
    name: "B",
  },
  {
    user_id: "user_id",
    name: "C",
  },
  {
    user_id: "user_id",
    name: "D",
  },
  {
    user_id: "user_id",
    name: "E",
  },
  {
    user_id: "user_id",
    name: "F",
  },
  {
    user_id: "user_id",
    name: "G",
  },
  {
    user_id: "user_id",
    name: "I",
  },
  {
    user_id: "user_id",
    name: "J",
  },
  {
    user_id: "user_id",
    name: "K",
  },
  {
    user_id: "user_id",
    name: "L",
  },
  {
    user_id: "user_id",
    name: "M",
  },
  {
    user_id: "user_id",
    name: "N",
  },
];

export default function FriendsView(props) {

  // This function gets a random profile picture from a name, same one every time
  function getProfileNumber(name) {
    let total = 0
    for (let i = 0; i < name.length; i++) {
      total += name.charCodeAt(i)
    }
    return (total % 4) + 1
  }

  return (
    <>
    <ListGroup>
      {friends.map((friend, index) => {
        let rand_img_nr = getProfileNumber(friend.name)
        let img = null;
        switch (rand_img_nr) {
          case 1:
            img = p1;
            break;
          case 2:
            img = p2;
            break;
          case 3:
            img = p3;
            break;
          case 4:
            img = p4;
            break;
        }

        return (
          <ListGroup.Item
            style={{ display: "flex", justifyContent: "space-between" }}
            key={index}
          >
            <div>
              <Image src={img} width="50" />
              {friend.name}
            </div>
            <Button
              onClick={(e) => console.log("Challenge " + friend.name)}
              size="sm"
              style={{ height: "40px" }}
            >
              Challenge
            </Button>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
    </>
  );
}
