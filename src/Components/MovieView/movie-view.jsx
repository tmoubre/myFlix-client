export const MovieView = ({ movie, onBackClick }) => {
    console.log(movie.imageUrl);
    return (
        <div>
            <div>
                <img src={movie.imageUrl} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>

            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};