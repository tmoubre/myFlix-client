import React from "react";
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
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