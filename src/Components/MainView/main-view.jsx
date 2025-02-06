import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://film-app-f9566a043197.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

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

                setMovies(data);
            })
            .catch((error) => console.error("error fetching movies:", error));
    }, []);
    if (selectedMovie) {
        console.log(selectedMovie);
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}
            />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
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
