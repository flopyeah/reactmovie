import React from 'react'

const IMG_PATH = 'http://image.tmdb.org/t/p/w185'

const VideoListItem = (props) => {

    const {movie} = props
    // same as
    //const movie = props.movie

    function handleClickMovie() {
        props.callback(movie)
    }

    return(
        <li className="list-group-item cursor-pointer" onClick={handleClickMovie}>
            <div className="media">
                <img className="mr-3" height="100" alt={movie.title} src={`${IMG_PATH}${movie.poster_path}`} />

                <div className="media-body">
                    <h5>{movie.title}</h5>
                </div>
            </div>
        </li>
    )
}

export default VideoListItem