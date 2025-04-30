"use client"
import React, {useContext} from 'react';
import Link from "next/link";
import {CollaborationContext} from "@/providers/CollaborationProvider";
import {VolunteeringContext} from "@/providers/Volunteering";

const Volunteering = () => {
    const {dict} = useContext(VolunteeringContext);
    return (
        <div>
            <div className="bg-[#211d1dfc] photo-background h-screen md:py-[180px] pt-30">
                <div className='flex items-center justify-center'>
                    <div className="container bg-[#4d4c4c2b] min-h-[70vh] pt-[50px] rounded-lg shadow-xl p-8 md:px-[100px]">
                        <h1 className='text-[30px] md:text-[40px] text-[#C7C7C7] text-center'>{dict.volunteering}</h1>
                        <h3 className='text-[20px] md:text-[24px] text-[#C7C7C7] text-center'>{dict.prof_photography_videography}</h3>
                        <div className='mt-5 text-white text-[18px]  md:text-[24px] text-left'>
                            <p>
                               {dict.prof_photography_videography_2}
                            </p>
                        </div>
                        <div className='flex justify-center mt-[50px]'>
                            <Link href='/supports/volunteering/registration'>
                                <button className='bg-[#F15A2B] hover:bg-[#4D4C4C]  text-[18px]  md:text-[25px] cursor-pointer text-white rounded-lg p-[10px] px-[40px] btn-phone'>
                                    {dict.fill_out_the_application_2}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Volunteering;