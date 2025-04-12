import React, {useContext} from 'react';
import Registration from "@/components/supports/volunteering/registration";
import {VolunteeringContext, VolunteeringProvider} from "@/providers/Volunteering";
import {getDictionary} from "@/app/[lang]/dictionaries";

const Page = async ({params}) => {
    const dict = await getDictionary(params.lang)

    return (
        <div>
          <VolunteeringProvider value={{dict}}>
              <Registration/>
          </VolunteeringProvider>
        </div>
    );
};

export default Page;