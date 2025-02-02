import React from 'react'
import VideoListItem from './VideoListItem'

const VideoList = (props) => {

    const {movieList} = props

    return(
        <div>
            <ul className="list-group">
                {
                    movieList.map( (movie) => {
                        return <VideoListItem key={movie.id} movie={movie} callback={receiveCallback} />
                    })
                }
            </ul>
        </div>
    )

    function receiveCallback(movie) {
        props.callback(movie)
    }
}

export default VideoList