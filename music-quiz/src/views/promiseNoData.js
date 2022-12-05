import Loading from "./loadingView.js";

function promiseNoData(promiseState) {
  if (!promiseState.promise) {
    return <div></div>;
  }

  if (promiseState.error) {
    return <div>{promiseState.error.toString()}</div>;
  }

  if (promiseState.data) {
    return false;
  }

  return <Loading />;
}

export default promiseNoData;
