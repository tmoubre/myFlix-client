import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";

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
                console.log("login response", data);

                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.title,
                        imageUrl: movie.imageUrl,
                        description: movie.description,
                        director: movie.director,
                        genre: movie.genre,
                    };
                });

                setMovies(moviesFromApi);
            })
            .catch((error) => console.error("error fetching movies:", error));

    }, [token]);

    if (!user) {
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                or
                <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        console.log(selectedMovie);
        return (
            <>
                <button
                    onClick={() => {
                        setUser(null);
                    }}
                >
                    Logout
                </button>
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                />
            </>
        );
    }

    if (movies.length === 0) {
        return (
            <>
                <button
                    onClick={() => {
                        setUser(null);
                    }}
                >
                    Logout
                </button>
                <div>The list is empty!</div>
            </>
        );
    }

    return (
        <div>
            <button
                onClick={() => {
                    setUser(null);
                    setToken(null);
                }}
            >
                Logout
            </button>
            {movies.map((movieItem) => (
                <MovieCard
                    key={movieItem.id}
                    movie={movieItem}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};