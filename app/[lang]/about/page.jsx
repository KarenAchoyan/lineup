import React from 'react';
import About from "@/components/about/about";
import {getDictionary} from "@/app/[lang]/dictionaries";

async function getAbout() {
    const res = await fetch('https://lineup.dahk.am/api/infos', { cache: "no-store" })
    return res.json()
}
async function getStaffs() {
    const res = await fetch('https://lineup.dahk.am/api/staffs', { cache: "no-store" })
    return res.json()
}
const Page = async ({params}) => {
    const about = await getAbout();
    const staffs = await getStaffs();
    const dict = await getDictionary(params.lang)
    return (
        <div className='w-full bg-[#232222] pt-[160px] '>
            <About about={about} staffs={staffs} lang={params.lang} dict={dict}/>
        </div>
    );
};

export default Page;