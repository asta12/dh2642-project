import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function GameOverView(props) {
  return (
    <div className='mx-auto' style={{width: "500px"}}>
        <Card  style={{ width: '30rem'}} className="text-center">
        <Card.Body>
            <Card.Title>Thank you for playing!</Card.Title>
            <Card.Text>
                Your final score was {props.score}!
            </Card.Text>
            <Button onClick = {() => props.onPlayAgainClick()} variant ="primary"> Play again</Button>
        </Card.Body>

    </Card>

    </div>
    
  )
}

export default GameOverView