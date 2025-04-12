import React from 'react';
import Donation from "@/components/supports/donation";
import {getDictionary} from "@/app/[lang]/dictionaries";

const Page = async ({params}) => {
    const dict = await getDictionary(params?.lang);
    return (
        <div>
            <Donation dict={dict}/>
        </div>
    );
};

export default Page;