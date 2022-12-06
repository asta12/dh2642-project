import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';


function ChoosePlaylistView(props) {
    
    function getDropdownItem(playlist){
       
        function onSelected(){
            props.onPlaylistSelected(playlist.id)
        }

        return (
            <Dropdown.Item as="button" key={playlist.id} onClick={onSelected}>{playlist.name}</Dropdown.Item>
        )
    }

  return (
    <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-playlists">
            Choose a playlist
        </Dropdown.Toggle>
        <Dropdown.Menu>
        {props.playlists.map(getDropdownItem)}
        </Dropdown.Menu>
        

    </Dropdown>
  )
}

export default ChoosePlaylistView