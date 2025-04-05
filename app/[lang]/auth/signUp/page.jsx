import React from 'react';
import SignUp from "@/components/auth/signUp";
import {getDictionary} from "@/app/[lang]/dictionaries";

const Page = async ({params}) => {
    const dict = await getDictionary(params.lang)

    return (
        <>
           <SignUp  dict={dict}/>
        </>
    );
};

export default Page;