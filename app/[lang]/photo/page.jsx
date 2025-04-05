import React from 'react';
import Photo from "@/components/photo/photo";
import {getDictionary} from "@/app/[lang]/dictionaries";
import {useApp} from "@/providers/AppProvider";

const Page = async ({params}) => {
    const dict = await getDictionary(params.lang)
    return (
        <div>
            <Photo dict={dict}/>
        </div>
    );
};

export default Page;