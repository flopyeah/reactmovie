import React from 'react'

const IMG_PATH = 'http://image.tmdb.org/t/p/w185'

const VideoDetail = ({title, description, image}) => {


    return(
        <div>
            <div className="media">
                <img className="mr-3" alt={title} src={`${IMG_PATH}${image}`} />

                <div className="media-body">
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>

            </div>

        </div>
    )
}

export default VideoDetail