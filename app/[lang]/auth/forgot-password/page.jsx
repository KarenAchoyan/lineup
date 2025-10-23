import React from 'react';
import ForgotPassword from '@/components/auth/forgotPassword';
import { getDictionary } from '@/app/[lang]/dictionaries';

const Page = async ({ params }) => {
    const dict = await getDictionary(params.lang);
    
    return (
        <div>
            <ForgotPassword dict={dict} lang={params.lang} />
        </div>
    );
};

export default Page;
