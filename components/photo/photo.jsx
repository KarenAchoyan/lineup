"use client"
import React from 'react';
import {PhoneOutlined} from "@ant-design/icons";

const Photo = () => {
    return (
        <div className="bg-[#211d1dfc] photo-background h-screen py-[180px]">
            <div className='flex items-center justify-center'>
                <div className="container bg-[#4d4c4c2b] h-[70vh] pt-[50px] rounded-lg shadow-xl p-8">
                    <h1 className='text-[40px] text-[#C7C7C7] text-center'>Photo/video</h1>
                    <h3 className='text-[24px] text-[#C7C7C7] text-center'>Professional photography and videography</h3>
                    <div className='mt-5 text-white'>
                        <p>
                            Welcome to our studio, where we create unforgettable photos and video materials. We have a
                            fully equipped photo studio with various backgrounds, which allows you to realize any
                            creative idea.
                        </p>
                        <p>
                            Our photo shoots:
                            Family photo shoots – preserve warm moments with your loved ones.
                            Group shoots – for friends, colleagues and collectives.
                            Children's photo shoots – delicate and touching shots for your little ones.
                            New Year's photo shoots – festive atmosphere in the studio.
                            Individual and fashion shoots – for professional portfolios and social networks.
                            Love Story – romantic shots for couples in love.
                        </p>
                    </div>
                    <div className='flex justify-center mt-[20px]'>
                        <a href='tel:+995592777743' className='hover:underline'>
                        <button className='bg-[#4D4C4C] text-white rounded-lg p-[10px] btn-phone'>
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