import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../loginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ProfileView } from "../profile-view/profile-view";
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  //const [selectedMovie, setSelectedMovie] = useState(null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [user, setUser] = useState(storedUser ? storedUser : null);

  useEffect(() => {
    if (!token) return;
    fetch("https://film-app-f9566a043197.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.title,
          imageUrl: movie.imageUrl,
          description: movie.description,
          director: movie.director,
          genre: movie.genre,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [token]);
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
                <Col md={12} className="text-center my-3">
                  <h1 className="text-primary">MyFlix DB</h1>
                </Col>
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
                <Col md={12} className="text-center my-3">
                  <h1 className="text-primary">MyFlix DB</h1>
                </Col>
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
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
            ) : movies.length === 0 ? (
              <Col>The movie does not exist!</Col>
            ) : (
              <Col md={8}>
                <MovieView movies={movies} />
              </Col>
            )
          }
        />

<Route
  path="/profile"
  element={
    !user ? (
      <Navigate to="/login" replace />
    ) : (
      <Col md={8}>
        <ProfileView user={user} movies={movies} onLogout={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }} />
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
                      onMovieClick={() => {
                        //setSelectedMovie(movie);
                      }}
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
