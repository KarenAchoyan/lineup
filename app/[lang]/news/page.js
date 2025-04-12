import React from 'react';
import {NewsProvider} from "@/providers/NewsProvider";
import All from "@/components/news/all";

async function getNews() {
    const res = await fetch('https://lineup.dahk.am/api/news', { cache: "no-store" })
    return res.json()
}
const Page = async () => {
    const news = await getNews();

    return (
        <div>
            <NewsProvider value={{news}}>
                <All/>
            </NewsProvider>
        </div>
    );
};

export default Page;