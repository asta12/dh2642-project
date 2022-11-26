import HeaderNavbar from "../presenters/headerNavbarPresenter";
import Button from "react-bootstrap/Button";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <HeaderNavbar />
      <Routes>
        <Route
          path="/"
          element={<Button>This is a bootstrap button!</Button>}
        />
        <Route
          path="/test"
          element={<Button>Testing navigation</Button>}
        />

      </Routes>
    </div>
  );
}

export default App;
