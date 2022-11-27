//import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "../presenters/registerPresenter.js";
import Login from "../presenters/loginPresenter.js"

function App(props) {
  return (
    <div className="App">
      <Login model={props.model}/>
    </div>
  );
}

export default App;
