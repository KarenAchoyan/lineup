import React from 'react';
import SignIn from "@/components/auth/signIn";
import {getDictionary} from "@/app/[lang]/dictionaries";

const Page = async ({params}) => {
    const dict = await getDictionary(params.lang)
    return (
        <div>
            <SignIn dict={dict}/>
        </div>
    );
};

export default Page;