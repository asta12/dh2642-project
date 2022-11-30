import React from 'react'
import Form from 'react-bootstrap/Form';

function SettingsView(props) {

    function onVolumeChange(e) {
        props.onVolumeChange(e.target.value);
    }

    function onSpeedChange(e) {
        props.onSpeedChange(e.target.value);
    }

  return (
    <>
    <Form.Label>Game Volume</Form.Label>
    <Form.Range min="0" max="1" step="0.1" defaultValue={props.currentVolume} onChange={onVolumeChange}/>
    
    <Form.Label>Game Speed</Form.Label>
    <Form.Range min="0.1" max="2" step="0.1" defaultValue={props.currentSpeed} onChange={onSpeedChange}/>
    </>
  )
}

export default SettingsView