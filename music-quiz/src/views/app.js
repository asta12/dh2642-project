import HeaderNavbar from "../presenters/headerNavbarPresenter";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../presenters/loginPresenter.js"
import Register from "../presenters/registerPresenter.js"
import Game from "../presenters/gamePresenter";

function App(props) {
  return (
    <div className="container">
      <HeaderNavbar />
      <Routes>
        <Route path="/" />
        {/*<Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />*/}
        <Route path="/game" element={<Game model={props.model} />} />
        <Route path="/login" element={<Login model={props.model}/>} />
        <Route path="/register" element={<Register model={props.model}/>} />
      </Routes>
    </div>
  );
}

export default App;
