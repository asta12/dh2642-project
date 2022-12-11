import Loading from "./loadingView.js";

function promiseNoData(promiseState, error = <div>promisteState.error</div>) {
  if (!promiseState.promise) {
    return <div></div>;
  }

  if (promiseState.error) {
    return error;
  }

  if (promiseState.data) {
    return false;
  }

  return <Loading />;
}

export default promiseNoData;
