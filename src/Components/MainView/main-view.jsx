import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
    const [movie, setmovies] = useState([
        {
            id: 1,
            title: 'Dune: Part Two',
            description: '2024 American epic science fiction film directed and co-produced by Denis Villeneuve, who co-wrote the screenplay with Jon Spaihts.',
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Dune_Part_Two_poster.jpeg/220px-Dune_Part_Two_poster.jpeg",
            director: 'Denis Villeneuve',
            genre: 'scifi',
        },
        {
            id: 2,
            title: 'Atlas',
            description: ' 2024 American science fiction action film starring Jennifer Lopez as a highly skilled counterterrorism analyst, who harbors a profound skepticism towards artificial intelligence, and who comes to realize that it may be her sole recourse following the failure of a mission aimed at apprehending a rogue robot.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Atlas_2024_film_poster.png/220px-Atlas_2024_film_poster.png',
            director: 'Brad Peyton',
            genre: 'scifi',
        },
        {
            id: 3,
            title: 'Code 8: Part II',
            description: ' 2024 Canadian superhero science fiction action film[1] directed by Jeff Chan, who co-wrote the screenplay with Chris Paré, Sherren Lee and Jesse LaVercombe.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Code_eight_part_II_poster.jpg/220px-Code_eight_part_II_poster.jpg',
            director: 'Brad Peyton',
            genre: 'scifi',
        },

    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movie.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movie.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};
