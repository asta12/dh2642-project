import HeaderNavbar from "../presenters/headerNavbarPresenter";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../presenters/loginPresenter.js"
import Register from "../presenters/registerPresenter.js"
import CreatePlaylist from "../presenters/createPlaylistPresenter"
import UserProfilePresenter from "../presenters/userProfilePresenter.js"

function App(props) {
  return (
    <div className="container">
      <HeaderNavbar model={props.model} />
      <Routes>
        <Route path="/" />
        {/*<Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />*/}
        <Route path="/profile/create-playlist" element={<CreatePlaylist model={props.model}/>} />
        <Route path="/login" element={<Login model={props.model}/>} />
        <Route path="/register" element={<Register model={props.model}/>} />
        <Route path="/profile" element={<UserProfilePresenter model={props.model}/>} />
      </Routes>
    </div>
  );
}

export default App;
