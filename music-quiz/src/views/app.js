import HeaderNavbar from '../presenters/headerNavbarPresenter'
import CreatePlaylist from '../presenters/createPlaylistPresenter';
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
        <CreatePlaylist />
      </Routes>
    </div>
  );
}

export default App;
