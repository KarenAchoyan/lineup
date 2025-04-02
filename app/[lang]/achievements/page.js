import React from 'react';
import Achievements from "@/components/achievements/achievements";
import {MainProvider} from "@/providers/HomeProvider";

async function getGallery() {
    const res = await fetch('https://lineup.dahk.am/api/galleries');
    const data = await res.json();
    return data;
}

async function getVideos() {
    const res = await fetch('https://lineup.dahk.am/api/videos/last');
    const data = await res.json();
    return data;
}

const Page = async () => {
    const galleries = await getGallery();
    const videos = await getVideos();

    return (
        <>
            <div className='pt-[100px] bg-[#232222]'>
                <MainProvider value={{galleries, videos}}>
                    <Achievements/>
                </MainProvider>
            </div>
        </>
    );
};

export default Page;