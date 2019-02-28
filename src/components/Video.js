import React from 'react'

const URL_YOUTUBE_VIDEO = 'http://www.youtube.com/embed/';

const Video = ({videoId}) => {

    return(
        <div>
            <iframe id="ytplayer" type="text/html" width="640" height="360"
                    src={`${URL_YOUTUBE_VIDEO}${videoId}?autoplay=0`}
                    frameBorder="0"/>
        </div>
    )
}

export default Video