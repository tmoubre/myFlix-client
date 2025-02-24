import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../loginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
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

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    if (!user) {
        return (
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
                <Col md={12} className="text-center my-3">
                    <span style={{ color: "white" }}>or</span>
                </Col>
                <Col md={5}>
                    <SignupView />
                </Col>
            </Row>
        );
    }

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            <NavigationBar user={user} onLogout={handleLogout} />
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} className="text-center">
                    <h1 className="text-primary">Movie List</h1>
                </Col>
                {movies.map((movie) => (
                    <Col className="mb-5" key={movie.id} md={3}>
                        <MovieCard
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    </Col>
                ))}
                <Col xs={12} className="text-left mt-3 mb-3">
                    <Button variant="primary" onClick={handleLogout}>Logout</Button>
                </Col>
            </Row>
        </div>
    );
};

// Wrapping the MainView with BrowserRouter and setting up Routes
export const App = () => {
    return (
        <BrowserRouter>
                        <Routes>
                {/* Main route for the home page */}
                <Route path="/" element={<MainView />} />
                
                {/* Route for login */}
                <Route path="/login" element={<LoginView />} />

                {/* Route for signup */}
                <Route path="/signup" element={<SignupView />} />

                {/* Redirect to home if an unknown route is accessed */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};