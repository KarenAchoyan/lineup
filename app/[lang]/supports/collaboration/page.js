import React from 'react';
import Collaboration from "@/components/supports/collaborate/collaboration";
import {getDictionary} from "@/app/[lang]/dictionaries";
import {CollaborationProvider} from "@/providers/CollaborationProvider";

const Page = async ({params}) => {
    const dict = await getDictionary(params.lang)

    return (
        <div>
            <CollaborationProvider value={{dict}}>
                <Collaboration/>
            </CollaborationProvider>
        </div>
    );
};

export default Page;