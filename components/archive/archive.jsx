"use client"
import React, {useState} from 'react';
import ToggleTabs from "@/components/archive/toggleTabs";
import Videos from "@/components/archive/videos";
import Images from "@/components/archive/images";

const Archive = ({videos, images, dict}) => {
    const [activeTab, setActiveTab] = useState("Videos");

    return (
        <div className='container m-auto bg-[#4D4C4C] rounded-3xl pt-10 '>
            <ToggleTabs activeTab={activeTab} setActiveTab={setActiveTab} dict={dict}/>
            <div>
                {activeTab === "Videos" ?
                    <Videos videos={videos} />
                    : <Images images={images} />
                }
            </div>
        </div>
    );
};

export default Archive;