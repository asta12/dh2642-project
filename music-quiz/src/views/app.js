import { useState, useEffect } from "react";
import HeaderNavbar from "../presenters/headerNavbarPresenter";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../presenters/loginPresenter.js";
import Register from "../presenters/registerPresenter.js";
import CreatePlaylist from "../presenters/createPlaylistPresenter.js";
import Loading from "./loadingView.js";

function App(props) {
  const [currentUser, setCurrentUser] = useState(props.model.currentUser);
  const [isLoaded, setIsLoaded] = useState(false);

  function componentCreated() {
    function onObserverNotification() {
      setCurrentUser(props.model.currentUser);
    }

    function onComponentTakeDown() {
      props.model.removeObserver(onObserverNotification);
    }

    props.model.addObserver(onObserverNotification);

    return onComponentTakeDown;
  }

  useEffect(componentCreated, []);

  useEffect(() => {
    // Wait 500 milliseconds before displaying page
    setInterval(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return currentUser || isLoaded ? (
    <div className="container">
      <HeaderNavbar model={props.model} />
      <Routes>
        <Route path="/" />
        {/*<Route exact path="/" element={Home} />
        <Route path="/profile" element={Profile} />
        <Route path="/about" element={About} />*/}
        <Route
          path="/profile/create-playlist"
          element={<CreatePlaylist model={props.model} />}
        />
        <Route path="/login" element={<Login model={props.model} />} />
        <Route path="/register" element={<Register model={props.model} />} />
      </Routes>
    </div>
  ) : (
    <Loading />
  );
}

export default App;
