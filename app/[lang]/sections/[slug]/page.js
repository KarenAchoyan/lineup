import React from 'react';
import Dance from "@/components/prices/dance";
import {getDictionary} from "@/app/[lang]/dictionaries";
async function getLessons() {
    const res = await fetch('https://lineup.dahk.am/api/lessons');
    const data = await res.json();
    return data;
}

const Page = async ({params}) => {
    const lessons = await getLessons();
    const dict = await getDictionary(params.lang)
    const {lang} = await params

    return (
        <div>
            <Dance lessons={lessons} dict={dict} slug={params.slug} lang={lang} />
        </div>
    );
};

export default Page;