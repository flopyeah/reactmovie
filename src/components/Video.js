import React from 'react'

const URL_YOUTUBE_VIDEO = 'http://www.youtube.com/embed/';

const Video = ({videoId}) => {

    return(
        <div className="col-12 mb-3">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe id="ytplayer" type="text/html" className="embed-responsive-item"
                        src={`${URL_YOUTUBE_VIDEO}${videoId}?autoplay=0`}
                        frameBorder="0"/>
            </div>
        </div>
    )
}

export default Video