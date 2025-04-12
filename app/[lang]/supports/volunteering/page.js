import React from 'react';
import Volunteering from "@/components/supports/volunteering/volunteering";
import {VolunteeringProvider} from "@/providers/Volunteering";
import {getDictionary} from "@/app/[lang]/dictionaries";

const Page = async ({params}) => {
    const dict = await getDictionary(params.lang)
    return (
        <div>
            <VolunteeringProvider value={{dict}}>
                <Volunteering/>
            </VolunteeringProvider>
        </div>
    );
};

export default Page;