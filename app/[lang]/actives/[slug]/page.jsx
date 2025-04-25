import React from 'react';
import {getDictionary} from "@/app/[lang]/dictionaries";
import {Image} from "antd";
import Details from "@/components/activeUsers/details";
async function getSingleNews(slug, lang) {
    try {
        const res = await fetch(`https://lineup.dahk.am/api/actives/${slug}?lang=${lang}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return {success: false, message: `Error ${res.status}: News not found`};
        }

        const data = await res.json();
        return {success: true, data};
    } catch (error) {
        return {success: false, message: "Failed to fetch news"};
    }
}

const Page = async ({params}) => {
    const result = await getSingleNews(params.slug, params.lang);
    const dict = await getDictionary(params.lang)
    const data = await result?.data?.data;
    return (
        <>
            <div className='w-full bg-[#232222] pt-[160px]'>
                <Details data={data} dict={dict} params={params} />
            </div>
        </>
    );
};

export default Page;