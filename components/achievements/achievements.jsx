import React from 'react';
import {Image} from "antd";
import {getYouTubeId} from "@/utils/utils";

const Achievements = ({galleries, videos}) => {
    return (
        <div>
            <div className='container m-auto'>
                {videos.map((video, index) => (
                    <div className="w-full h-[300px] rounded-2xl my-4 overflow-hidden" key={index}>
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${getYouTubeId(video.video_url)}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>

                    </div>
                ))}

                <div className="flex flex-wrap justify-between">
                    {galleries.map((gallery) => {
                        return (
                            <div className="item-gallery w-full  sm:w-[48%] h-[360px] rounded-2xl overflow-hidden mb-10" key={gallery.id}>
                                <Image src={process.env.IMAGE_URL+gallery.image} className='w-full h-full object-cover'  preview={true}/>
                            </div>
                        )
                    })}
                </div>
                <div className='flex justify-center'>
                    <button className='text-[25px] bg-[#F15A2B] px-[86px] py-[10px] rounded-full text-white shadow-[0px_9px_9.1px_0px_#0000004A]'>See more</button>
                </div>
            </div>
        </div>
    );
};

export default Achievements;