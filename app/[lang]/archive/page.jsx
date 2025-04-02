import React from 'react';
import ArchiveComponent from "@/components/archive/carousel";
import ToggleTabs from "@/components/archive/toggleTabs";
import Archive from "@/components/archive/archive";
import {ArchiveProvider} from "@/providers/ArchiveProvider";
import MainArchive from "@/components/archive/mainArchive";


async function getYears() {
    const res = await fetch('https://lineup.dahk.am/api/years');
    const data = await res.json();
    return data;
}

const Page = async () => {
    const years = await getYears();
    return (
        <div className='w-full bg-[#232222] pt-[160px] component-archive'>
            <ArchiveProvider value={{years}}>
                <MainArchive/>
            </ArchiveProvider>
        </div>
    );
};

export default Page;