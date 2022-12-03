import React from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

function GuessSongView(props) {




  return (
    <div className="mx-auto" style={{ margin: "10px", width: "300px" }}>
      <Stack direction="horizontal" gap={3}>
        <Button
          variant="primary"
          size="lg"
          style={{ width: "300px", marginBottom: "10px" }}
          onClick={(e) => props.onGuessClick(0)}
        >{props.songs[0]}</Button>
        <Button
          variant="primary"
          size="lg"
          style={{ width: "300px",  marginBottom: "10px" }}
          onClick={(e) => props.onGuessClick(1)}
        >{props.songs[1]}</Button>
      </Stack>
      <Stack direction="horizontal" gap={3}>
        <Button
          variant="primary"
          size="lg"
          style={{ width: "300px" }}
          onClick={(e) => props.onGuessClick(2)}
        >{props.songs[2]}</Button>
        <Button
          variant="primary"
          size="lg"
          style={{ width: "300px" }}
          onClick={(e) => props.onGuessClick(3)}
        >{props.songs[3]}</Button>
      </Stack>
    </div>
  );
}

export default GuessSongView;
