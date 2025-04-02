import React from 'react';
import {getYouTubeId} from "@/utils/utils";

const Modal = ({openModal, video}) => {
    console.log(video);
    const youtubeEmbedLink = video && typeof video === "string"
        ? `https://www.youtube.com/embed/${getYouTubeId(video)}`
        : '';
    return (
        <>
            <div
                className="fixed top-0 inset-0 bg-[#000000ab] bg-opacity-50 z-[3333333333333333] flex items-center justify-center"
                onClick={openModal}
            ></div>
            <div
                className="fixed z-[3333333333333334] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-white  p-4 rounded-lg shadow-lg"
            >
                <iframe
                    width="100%"
                    height="100%"
                    src={youtubeEmbedLink}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube Video"
                />
            </div>
        </>
    );
};

export default Modal;
