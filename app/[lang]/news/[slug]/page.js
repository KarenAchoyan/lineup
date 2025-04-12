import React from 'react';
import Image from "next/image";
import News from "@/components/news/news";
import Details from "@/components/news/details";

async function getSingleNews(slug, lang) {
    try {
        const res = await fetch(`https://lineup.dahk.am/api/news/${slug}?lang=${lang}`, {
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
    console.log(result);
    const data = await result?.data?.data;
    const lastNews = result?.data?.lastNews;
    return (
        <>
            <Details news={data} lastNews={lastNews}/>
        </>
    );
};

export default Page;