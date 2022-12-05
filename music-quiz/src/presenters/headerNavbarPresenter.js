import { useState, useEffect } from "react";
import Header from '../views/headerView'
import NavBar from '../views/navbarView'

function HeaderNavbar(props) {

    const [username, setUsername] = useState(props.model.username)

    function componentCreated() {
    
        function onObserverNotification() {
            setUsername(props.model.username)
        }
    
        function onComponentTakeDown() {
            props.model.removeObserver(onObserverNotification)
        }
    
        props.model.addObserver(onObserverNotification)
    
        return onComponentTakeDown
      }
      
      useEffect(componentCreated, [])

    return <div className="mb-3">
        <Header />
        <NavBar loggedInUser={props.model.username} />
    </div>
}

export default HeaderNavbar;