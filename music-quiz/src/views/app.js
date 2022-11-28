import HeaderNavbar from "../presenters/headerNavbarPresenter";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App(props) {
  return (
    <div className="container">
      <HeaderNavbar />
      <Routes>
        <Route
          path="/"
        />
      </Routes>
    </div>
  );
}

export default App;
