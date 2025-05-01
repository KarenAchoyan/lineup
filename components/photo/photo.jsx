"use client"
import React from 'react';
import {PhoneOutlined} from "@ant-design/icons";

const Photo = ({dict}) => {
    return (
        <div className="bg-[#211d1dfc] photo-background h-screen py-[180px]">
            <div className='flex items-center justify-center'>
                <div className="container bg-[#4d4c4c2b] min-h-[70vh] pt-[50px] rounded-lg shadow-xl p-8">
                    <h1 className='text-[30px] md:text-[40px] text-[#C7C7C7] text-center'>{dict.photo_video}</h1>
                    <h3 className='text-[20px] md:text-[24px] text-[#C7C7C7] text-center'>{dict.professional_photography_videography}</h3>
                    <div className='mt-5 text-white text-center'>
                        <p>
                            {dict.photo_video_description}
                        </p>
                       
                    </div>
                    <div className='flex justify-center mt-[20px]'>
                        <a href='tel:+995592777743' className='hover:underline'>
                        <button className='bg-[#4D4C4C] text-white rounded-lg cursor-pointer hover:opacity-[50%] p-[10px] btn-phone'>
                            <PhoneOutlined /> +995592777743
                        </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Photo;