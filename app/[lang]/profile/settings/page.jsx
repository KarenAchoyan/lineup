import React from 'react';
import Settings from "@/components/profile/Settings";
import { getDictionary } from "@/app/[lang]/dictionaries";

const Page = async ({ params }) => {
    const dict = await getDictionary(params.lang);
    return (
        <div>
            <Settings dict={dict} />
        </div>
    );
};

export default Page; 