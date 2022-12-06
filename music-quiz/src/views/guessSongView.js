import React from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

function GuessSongView(props) {

  return (
    <div className="mx-auto" style={{ margin: "10px", width: "400px" }}>
      <Stack direction="horizontal" gap={3}>
        <Button 
          variant= {props.buttonStyles[0]}
          size="lg"
          style={{ display:"inline-block", width: "700px", height: "180px", marginBottom: "10px" }}
          onClick={(e) => props.onGuessClick(0)}
        >{props.songs[0].title}</Button>
        <Button 
          variant= {props.buttonStyles[1]}
          size="lg"
          style={{ display:"inline-block", width:"700px",  height: "180px",  marginBottom: "10px" }}
          onClick={(e) => props.onGuessClick(1)}
        >{props.songs[1].title}</Button>
      </Stack>
      <Stack direction="horizontal" gap={3}>
        <Button 
          variant= {props.buttonStyles[2]}
          size="lg"
          style={{ display:"inline-block", width:"700px", height: "180px",}}
          onClick={(e) => props.onGuessClick(2)}
        >{props.songs[2].title}</Button>
        <Button 
          variant= {props.buttonStyles[3]}
          size="lg"
          style={{ display:"inline-block", width: "700px",  height: "180px", }}
          onClick={(e) => props.onGuessClick(3)}
        >{props.songs[3].title}</Button>
      </Stack>
    </div>
  );
}

export default GuessSongView;
