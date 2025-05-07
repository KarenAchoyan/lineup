import React from 'react';
import PaymentHistory from "@/components/profile/PaymentHistory";
import { getDictionary } from "@/app/[lang]/dictionaries";

const Page = async ({ params }) => {
    const dict = await getDictionary(params.lang);
    return (
        <div>
            <PaymentHistory dict={dict} />
        </div>
    );
};

export default Page; 