import React from 'react';
import ArchiveComponent from "@/components/archive/carousel";
import ToggleTabs from "@/components/archive/toggleTabs";
import Archive from "@/components/archive/archive";
import {ArchiveProvider} from "@/providers/ArchiveProvider";
import MainArchive from "@/components/archive/mainArchive";
import {getDictionary} from "@/app/[lang]/dictionaries";


async function getYears() {
    const res = await fetch('https://lineup.dahk.am/api/years');
    const data = await res.json();
    return data;
}

const Page = async ({params}) => {
    const years = await getYears();
    const dict = await getDictionary(params?.lang)
    return (
        <div className='w-full bg-[#232222] pt-[160px] component-archive'>
            <ArchiveProvider value={{years}}>
                <MainArchive dict={dict}/>
            </ArchiveProvider>
        </div>
    );
};

export default Page;