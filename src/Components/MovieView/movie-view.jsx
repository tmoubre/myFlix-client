import "./movie-view.scss";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const MovieView = ({ movies, user, onUpdateFavorites }) => {
  const { Id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const selectedMovie = movies.find((m) => m.id === Id);
    setMovie(selectedMovie);

    if (user && user.favoriteMovies.includes(Id)) {
      setIsFavorite(true);
    }
  }, [Id, movies, user]);

  const toggleFavorite = () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://film-app-f9566a043197.herokuapp.com/users/favoriteMovies/${movie.id}`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to ${isFavorite ? "remove from" : "add to"} favorite movies.`);
        }
        return response.json();
      })
      .then(() => {
        setIsFavorite(!isFavorite);
        setLoading(false);
        onUpdateFavorites(updatedUser)
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <Row className="justify-content-md-center">
      <Col md={12} className="text-center my-3">
        <div><img alt="" src={movie.imageUrl} /></div>
        <div style={{ color: "white" }}>
          <span className="text-white">Title: </span>{movie.title}
        </div>
        <div style={{ color: "white" }}>
          <span className="text-white">Director: </span>{movie.director.name}
        </div>
        <div style={{ color: "white" }}>
          <span className="text-white">Description: </span>{movie.description}
        </div>
        <div style={{ color: "white" }}>
          <span className="text-white">Genre: </span>{movie.genre.name}
        </div>

        <div className="mb-3">
          {loading ? (
            <Button variant="primary" disabled>Loading...</Button>
          ) : (
            <Button variant="primary" onClick={toggleFavorite}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          )}
          {error && <p className="text-danger">{error}</p>}
        </div>

        <Link to="/">
          <button type="button" className="back-button" style={{ cursor: "pointer" }}>
            Back
          </button>
        </Link>
      </Col>
    </Row>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onUpdateFavorites: PropTypes.func.isRequired,
};