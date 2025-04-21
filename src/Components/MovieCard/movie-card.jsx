import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const MovieCard = ({ movie, onMovieClick, isFavorite, onToggleFavorite }) => {
  return (
    <Link
      to={`/movies/${encodeURIComponent(movie.id)}`}
      className="text-decoration-none text-dark"
      style={{ textDecoration: "none" }}
      onClick={() => onMovieClick && onMovieClick(movie)}
    >
      <Card className="h-100" style={{ cursor: "pointer" }}>
        <Card.Img variant="top" src={movie.imageUrl} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director.name}</Card.Text>

          <div className="d-flex justify-content-end align-items-center">
            {onToggleFavorite && (
              <Button
                variant="link"
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  e.stopPropagation(); // Prevent bubbling up
                  onToggleFavorite(movie.id);
                }}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                className="text-danger p-0"
                style={{ fontSize: "1.5rem" }}
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.object.isRequired,
    genre: PropTypes.object.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
};

