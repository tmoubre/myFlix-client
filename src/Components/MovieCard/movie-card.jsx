import React from "react";
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100" onClick={() => onMovieClick(book)}>
          <Card.Img variant="top" src={movie.imageUrl} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.director}</Card.Text>
            <Button onClick={() => onBookClick(book)} variant="link">
              Open
            </Button>
          </Card.Body>
        </Card>
      );
    };
MovieCard.propTypes = {
    movies: PropTypes.shape({
        // id: PropTypes.string.isRequired,
        // title: PropTypes.string.isRequired,
        // imageUrl: PropTypes.string.isRequired,
        // description: PropTypes.string.isRequired,
        // director: PropTypes.string.isRequired,
        // genre: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};