import React from 'react';
import Achievements from "@/components/achievements/achievements";
import {MainProvider} from "@/providers/HomeProvider";
import {getDictionary} from "@/app/[lang]/dictionaries";

async function getGallery() {
    const res = await fetch('https://lineup.dahk.am/api/galleries');
    const data = await res.json();
    return data;
}


const Page = async ({params}) => {
    const galleries = await getGallery();
    const {lang} = await params
    const dict = await getDictionary(lang) // en
    return (
        <>
            <div className='pt-[100px] bg-[#232222]'>
                <MainProvider value={{galleries,dict}}>
                    <Achievements/>
                </MainProvider>
            </div>
        </>
    );
};

export default Page;