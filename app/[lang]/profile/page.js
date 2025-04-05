import React from 'react';
import Main from "@/components/profile/main";
import LogoutModal from "@/components/profile/logoutModal";
import {getDictionary} from "@/app/[lang]/dictionaries";

const Page = async ({params}) => {
    const dict = await getDictionary(params.lang)
    return (
        <div>
            <Main dict={dict}/>
        </div>
    );
};

export default Page;