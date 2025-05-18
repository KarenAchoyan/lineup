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
                <img src="https://lineup.dahk.am/storage1/about.JPG" className='w-full h-full object-cover opacity-[50%] grayscale object-top'
                     alt={"Banner Image"}/>
                <div className='container relative  m-auto px-[20px] md:px-[0] '>
                    <div
                        className='w-[250px] sm:w-[350px] md:w-[400px] absolute bottom-[180px]  sm:bottom-[80px] font-bold '>
                        <h1 className='text-[25px] sm:text-[45px] text-white mb-[17px]'>{dict.about_dancing} <span className='text-[#F15A2B]'>{dict.dancing+"..."}</span></h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;