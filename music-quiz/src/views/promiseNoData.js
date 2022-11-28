import Spinner from 'react-bootstrap/Spinner';

function promiseNoData(promiseState){

    if (!promiseState.promise) {
        return <div></div>
    }

    if (promiseState.error) {
        return <div>{promiseState.error.toString()}</div>
    }
    
    if (promiseState.data) {
        return false
    }

    return (
        <Spinner animation="border" role="status" style={{ "margin": "10px" }} variant="primary">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export default promiseNoData