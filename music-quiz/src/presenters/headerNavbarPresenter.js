import { useState, useEffect } from "react";
import Header from '../views/headerView'
import NavBar from '../views/navbarView'
import {logout} from '../firebaseAuthentication'

function HeaderNavbar(props) {

    const [currentUser, setCurrentUser] = useState(props.model.currentUser)

    function componentCreated() {
    
        function onObserverNotification() {
            setCurrentUser(props.model.currentUser)
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
        <NavBar loggedInUser={props.model.currentUser} handleLogout={logout} />
    </div>
}

export default HeaderNavbar;