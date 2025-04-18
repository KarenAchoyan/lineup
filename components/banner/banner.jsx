"use client"
import React, {useContext} from 'react';
import Link from "next/link";
import {useApp} from "@/providers/AppProvider";
import {MainContext} from "@/providers/HomeProvider";

const Banner = () => {
    const {lang} = useApp();
    const {dict} = useContext(MainContext)
    return (
        <>
            <div className='w-full h-screen relative bg-[#211d1dfc]'>
                <img src="/banner1.png" className='w-full h-full object-cover opacity-[50%] grayscale object-top'
                     alt={"Banner Image"}/>
                <div className='container relative  m-auto px-[20px] md:px-[0] '>
                    <div
                        className='w-[250px] sm:w-[350px] md:w-[400px] absolute bottom-[180px]  sm:bottom-[80px] font-bold '>
                        <h1 className='text-[25px] sm:text-[45px] text-white mb-[17px]'>{dict.about_dancing} <span className='text-[#F15A2B]'>{dict.dancing+"..."}</span></h1>
                        <Link href={"/auth/signUp"}>
                            <button
                                className='text-[15px] sm:text-[20px] bg-[#F15A2B] px-[50px] cursor-pointer transition duration-100 hover:bg-[#4D4C4C] sm:px-[86px] py-[8px]  sm:py-[10px] rounded-xl text-white shadow-[0px_9px_9.1px_0px_#0000004A]'>
                                {dict.register}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;