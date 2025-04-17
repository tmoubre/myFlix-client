import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const MovieCard = ({ movie, onMovieClick, isFavorite, onToggleFavorite }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.imageUrl} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>

        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button
              variant="link"
              onClick={() => onMovieClick && onMovieClick(movie)}
            >
              Open
            </Button>
          </Link>

          {onToggleFavorite && (
            <Button
              variant="link"
              onClick={(e) => {
                e.stopPropagation();
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
