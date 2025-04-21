import React from "react";
import { useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card"; // Adjust the import path if needed

export const SearchResultsView = ({ movies, user, onToggleFavorite }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q")?.toLowerCase() || "";

  const filteredMovies = movies.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(searchQuery);
    const directorMatch = movie.director.name.toLowerCase().includes(searchQuery);
    const genreMatch = movie.genre.name.toLowerCase().includes(searchQuery);
    return titleMatch || directorMatch || genreMatch;
  });

  return (
    <div className="p-4">
      <h2 className="mb-4">Search Results</h2>
      <Row>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Col md={3} key={movie.id} className="mb-4">
              <MovieCard
                movie={movie}
                isFavorite={user?.favoriteMovies.includes(movie.id)}
                onToggleFavorite={onToggleFavorite}
              />
            </Col>
          ))
        ) : (
          <Col>
            <p>No results found for: <strong>{searchQuery}</strong></p>
          </Col>
        )}
      </Row>
    </div>
  );
};
