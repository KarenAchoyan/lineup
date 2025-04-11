import React from 'react';
import RefundReturn from "@/components/refund_return/refund_return";
import {getDictionary} from "@/app/[lang]/dictionaries";

async function getAbout() {
    const res = await fetch('https://lineup.dahk.am/api/infos', { cache: "no-store" })
    return res.json()
}
const Page = async ({params}) => {
    const dict = await getDictionary(params.lang);
    const about = await getAbout();

    return (
        <>
            <RefundReturn dict={dict} about={about} lang={params.lang} />
        </>
    );
};

export default Page;