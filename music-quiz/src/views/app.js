import HeaderNavbar from '../presenters/headerNavbarPresenter'
import Button from 'react-bootstrap/Button';
import { Route, Routes} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="container">
        <HeaderNavbar />
        
      </div>} />
      <Route path="/testbtn" element = {<Button>This is a bootstrap button!</Button>} />

    </Routes>
    
  );
}

export default App;

