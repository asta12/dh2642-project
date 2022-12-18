import { useState, useEffect } from "react";
import HeaderNavbar from "../presenters/headerNavbarPresenter";
import { Route, Routes } from "react-router-dom";
import Login from "../presenters/loginPresenter.js";
import Register from "../presenters/registerPresenter.js";
import UserProfilePresenter from "../presenters/userProfilePresenter.js";
import GamePresenter from "../presenters/gamePresenter";
import CreatePlaylistPresenter from "../presenters/createPlaylistPresenter.js";
import EditPlaylistPresenter from "../presenters/editPlaylistPresenter";
import FriendProfilePresenter from "../presenters/friendProfilePresenter";
import HomePresenter from "../presenters/homePresenter";
import AddFriend from "../presenters/addFriendPresenter";
import Loading from "./loadingView.js";
import SidebarPresenter from "../presenters/sidebarPresenter";

function App(props) {
  const [currentUser, setCurrentUser] = useState(props.model.currentUser);
  const [isLoaded, setIsLoaded] = useState(false);

  function componentCreated() {
    props.model.clearModelData();
    function onObserverNotification(payload) {
      if (payload?.setCurrentUser) {
        setCurrentUser(props.model.currentUser);
      }
      if (props.model.initialLoginAttemptComplete) setIsLoaded(true);
    }

    function onComponentTakeDown() {
      props.model.removeObserver(onObserverNotification);
    }

    props.model.addObserver(onObserverNotification);

    return onComponentTakeDown;
  }

  useEffect(componentCreated, []);

  return currentUser || isLoaded ? (
    <div>
      <div style={{ position: "fixed", top: "0", left: "0" }}>
        <SidebarPresenter model={props.model} />
      </div>
      <div className="container">
        <HeaderNavbar model={props.model} />
        <Routes>
          <Route path="/" element={<HomePresenter model={props.model} />} />
          <Route path="/play" element={<GamePresenter model={props.model} />} />
          <Route path="/login" element={<Login model={props.model} />} />
          <Route path="/register" element={<Register model={props.model} />} />
          <Route
            path="/friend"
            element={<FriendProfilePresenter model={props.model} />}
          />
          <Route
            path="/profile"
            element={<UserProfilePresenter model={props.model} />}
          />
          <Route
            path="/profile/create-playlist"
            element={<CreatePlaylistPresenter model={props.model} />}
          />
          <Route
            path="/profile/edit-playlist"
            element={<EditPlaylistPresenter model={props.model} />}
          />
          <Route
            path="/profile/add-friend"
            element={<AddFriend model={props.model} />}
          />
        </Routes>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default App;
