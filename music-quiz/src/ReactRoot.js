import React, { useEffect, useState } from "react";
import {
  firebaseModelPromise,
  updateFirebaseFromModel,
  updateModelFromFirebase,
} from "./models/firebaseModel.js";
import resolvePromise from "./resolvePromise.js";
import promiseNoData from "./views/promiseNoData.js";
import { BrowserRouter } from 'react-router-dom';
import App from "./views/app.js"

function ReactRoot() {
  const [promiseState] = useState({});
  const [, reRender] = useState();
  const [model, setModel] = useState({});

  function whenCreatedACB() {
    resolvePromise(firebaseModelPromise(), promiseState, notifyACB);

    function whenTakenDown() {}
    return whenTakenDown;
  }

  function notifyACB() {
    if (promiseState.data) {
      setModel(promiseState.data);
      updateFirebaseFromModel(promiseState.data);
      updateModelFromFirebase(promiseState.data);
    } else {
      reRender(new Object());
    }
  }

  useEffect(whenCreatedACB, []);

  return (
    <div>
      {promiseNoData(promiseState) || (
        <BrowserRouter>
          <App model={model} />
        </BrowserRouter>
      )}
    </div>
  );
}

export default ReactRoot;
