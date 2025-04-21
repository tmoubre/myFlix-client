import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../loginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import { SearchResultsView } from './search-results/search-results';
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(storedToken || null);
  const [user, setUser] = useState(storedUser || null);

  // Fetch all movies
  useEffect(() => {
    if (!token) return;

    fetch("https://film-app-f9566a043197.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedMovies = data.map((movie) => ({
          id: movie._id,
          title: movie.title,
          imageUrl: movie.imageUrl,
          description: movie.description,
          director: movie.director,
          genre: movie.genre
        }));
        setMovies(formattedMovies);
      })
      .catch((err) => console.error("Error loading movies:", err));
  }, [token]);

  // Handle add/remove favorite
  const handleToggleFavorite = (movieId) => {
    if (!user) return;

    const isAlreadyFavorite = user.favoriteMovies.includes(movieId);
    const method = isAlreadyFavorite ? "DELETE" : "POST";

    fetch(`https://film-app-f9566a043197.herokuapp.com/users/${user.userId}/favoriteMovies/${movieId}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update favorites");
        return res.json();
      })
      .then((updatedUser) => {
        // Update user in state and localStorage
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((err) => console.error(err));
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }}
      />

      <Routes>
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Row className="justify-content-md-center">
                <Col md={5}>
                  <SignupView />
                </Col>
              </Row>
            )
          }
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Row className="justify-content-md-center">
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("token", token);
                    }}
                  />
                </Col>
              </Row>
            )
          }
        />

<Route
  path="/movies/:Id"
  element={
    !user ? (
      <Navigate to="/login" replace />
    ) : (
      <Col md={8}>
        <MovieView
          movies={movies}
          user={user}
          onUpdateFavorites={(updatedUser) => {
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }}
        />
      </Col>
    )
  }
/>

<Route
  path="/search"
  element={
    <SearchResultsView
      movies={movies}
      user={user}
      onToggleFavorite={handleToggleFavorite}
    />
  }
/>

        <Route
          path="/profile"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <Col md={8}>
                <ProfileView
                  user={user}
                  movies={movies}
                  onLogout={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                  }}
                />
              </Col>
            )
          }
        />

        <Route
          path="/"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <Row>
                {movies.map((movie) => (
                  <Col className="mb-4" key={movie.id} md={3}>
                    <MovieCard
                      movie={movie}
                      isFavorite={user.favoriteMovies.includes(movie.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  </Col>
                ))}
              </Row>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainView;

