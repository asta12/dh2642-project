import HeaderNavbar from '../presenters/headerNavbarPresenter'
import Button from 'react-bootstrap/Button';
import CreatePlaylist from '../presenters/createPlaylistPresenter';

function App() {
  return (
    <div className="container">
        <HeaderNavbar />
        <Button>This is a bootstrap button!</Button>
        <CreatePlaylist />
    </div>
  );
}

export default App;
