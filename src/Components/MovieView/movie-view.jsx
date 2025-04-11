import "./movie-view.scss";
import { useParams, Link } from "react-router";
import { Row, Col } from "react-bootstrap";
export const MovieView = ({ movies }) => {
  const { Id } = useParams();
  const movie = movies.find((m) => m.id === Id);
  return (
    <Row className="justify-content-md-center">
      <Col md={12} className="text-center my-3">
        <div>
          <img alt="" src={movie.imageUrl} />
        </div>
        <div style={{ color: "white" }}>
          <span className="text-white">Title: </span>
          <span>{movie.title}</span>
        </div>
        <div style={{ color: "white" }}>
          <span className="text-white">Director: </span>
          <span>{movie.director.name}</span>
        </div>
        <div style={{ color: "white" }}>
          <span className="text-white">Description: </span>
          <span>{movie.description}</span>
        </div>
        <div style={{ color: "white" }}>
          <span className="text-white">Genre: </span>
          <span>{movie.genre.name}</span>
        </div>
        <Link to={"/"}>
          <button
            type="button"
            className="back-button"
            style={{ cursor: "pointer" }}
          >
            Back
          </button>
        </Link>
      </Col>
    </Row>
  );
};