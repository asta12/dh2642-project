import HeaderNavbar from '../presenters/headerNavbarPresenter'
import Login from "../presenters/loginPresenter.js"

function App(props) {
  return (
    <div className="container">
        <HeaderNavbar />
        <Login model={props.model}></Login>
    </div>
  );
}

export default App;
