import React from 'react';
import VideoStyle from '../../styles/mainPage/video.module.css'

const VideoComp = () => {
    return (
        <>
            <div className={VideoStyle.body}>
                <div className={VideoStyle.title}>
                    <h2 >
                        <img src="https://www.google.com/logos/fnbx/westminster_dog_show/westminster_kp_dm.gif" alt="" />
                        이런 반려동물 모여라
                        <img src="https://www.google.com/logos/fnbx/animal_paws/cat_kp_dm.gif" alt=""  />
                    </h2>
                </div>

                <div className={VideoStyle.iframe}>
                 </div>
            </div>
        </>
    );
};

export default VideoComp;