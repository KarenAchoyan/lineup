"use client"
import React, {useContext} from 'react';
import {Image} from "antd";
import {getYouTubeId} from "@/utils/utils";
import {MainContext} from "@/providers/HomeProvider";
import Link from "next/link";

const Achievements = ({all=false}) => {
    const {galleries, dict} = useContext(MainContext)
    return (
        <div className='bg-[#232222] py-20'>
            <div className='container m-auto bg-[#4D4C4C] p-[20px] rounded-2xl border-t-2 border-[#BF3206] h-auto'>
                <h1 className='text-[#C7C7C7] font-bold mb-6 text-center text-[30px] md:text-[45px]'>{dict.our_achievements}</h1>
                <div className="flex flex-wrap justify-between">
                    {galleries.map((gallery) => {
                        return (
                            <div className="item-gallery w-full  sm:w-[48%] h-[360px] rounded-2xl overflow-hidden mb-10" key={gallery.id}>
                                <Image src={process.env.IMAGE_URL+gallery.image} className='w-full h-full object-cover'  preview={true}/>
                            </div>
                        )
                    })}
                </div>
                {all &&
                    <div className='flex justify-center my-10'>
                        <Link href={'/achievements'} className='text-[#C7C7C7] underline'>
                            {dict.see_more}
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default Achievements;