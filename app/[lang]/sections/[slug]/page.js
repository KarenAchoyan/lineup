import React from 'react';
import Dance from "@/components/prices/dance";
async function getLessons() {
    const res = await fetch('http://127.0.0.1:8000/api/lessons');
    const data = await res.json();
    return data;
}

const Page = async ({params}) => {
    const lessons = await getLessons();

    return (
        <div>
            <Dance lessons={lessons} slug={params.slug} />
        </div>
    );
};

export default Page;