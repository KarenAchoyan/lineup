import React from 'react';
import ResetPassword from '@/components/auth/resetPassword';
import { getDictionary } from '@/app/[lang]/dictionaries';

const Page = async ({ params, searchParams }) => {
    const dict = await getDictionary(params.lang);
    const token = searchParams.token;
    
    return (
        <div>
            <ResetPassword dict={dict} lang={params.lang} token={token} />
        </div>
    );
};

export default Page;
