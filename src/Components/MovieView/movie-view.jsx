import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    console.log(movie.imageUrl);
    return (
        <div>
            <div>
                <img src={movie.imageUrl} />
            </div>
            <div style={{color:"white"}}>
                <span className="text-white">Title: </span>
                <span>{movie.title}</span>
            </div>
            <div style={{color:"white"}}>
                <span className="text-white">Director: </span>
                <span>{movie.director.name}</span>
            </div>
            <div style={{color:"white"}}>
                <span className="text-white">Description: </span>
                <span>{movie.description}</span>
            </div>

            <div style={{color:"white"}}>
                <span className="text-white">Genre: </span>
                <span>{movie.genre.name}</span>
            </div>
            <button onClick={onBackClick}
            className="back-button"
            style={{cursor:"pointer"}} 
            >
            Back
            </button>
        </div>
    );
};