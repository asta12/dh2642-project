import HeaderNavbar from '../presenters/headerNavbarPresenter'
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="container">
        <HeaderNavbar />
        <Button>This is a bootstrap button!</Button>
    </div>
  );
}

export default App;
