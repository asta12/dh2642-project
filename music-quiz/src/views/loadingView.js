import Spinner from "react-bootstrap/Spinner";

export default function Loading() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{ margin: "10px" }}
      variant="primary"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
