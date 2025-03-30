"use client"
import React, {useContext} from 'react';
import {Image} from "antd";
import {getYouTubeId} from "@/utils/utils";
import {MainContext} from "@/providers/HomeProvider";
import Link from "next/link";

const Achievements = ({all=false}) => {
    const {galleries, lang} = useContext(MainContext)
    return (
        <div className='bg-[#232222] py-20'>
            <div className='container m-auto bg-[#4D4C4C] p-[20px] rounded-2xl border-t-2 border-[#BF3206] h-auto'>
                <h1 className='text-[#C7C7C7] font-bold mb-6 text-center text-[30px] md:text-[45px]'>Our Achievements</h1>
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
                    <div className='flex justify-center'>
                        <Link href={lang+'/achievements'}>
                            <button className='text-[25px] bg-[#F15A2B] hover:bg-[#4D4C4C] hover:text-white transition duration-1000 cursor-pointer px-[86px] py-[10px] rounded-full text-white shadow-[0px_9px_9.1px_0px_#0000004A]'>See more</button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default Achievements;