"use client"
import React from 'react';
import Link from "next/link";

const Volunteering = () => {
    return (
        <div>
            <div className="bg-[#211d1dfc] photo-background h-screen py-[180px]">
                <div className='flex items-center justify-center'>
                    <div className="container bg-[#4d4c4c2b] h-[70vh] pt-[50px] rounded-lg shadow-xl p-8 px-[100px]">
                        <h1 className='text-[40px] text-[#C7C7C7] text-center'>Volunteering</h1>
                        <h3 className='text-[24px] text-[#C7C7C7] text-center'>Professional photography and
                            videography</h3>
                        <div className='mt-5 text-white text-[24px] text-left'>
                            <p>
                                Would you like to help and participate in the development process? We are always happy
                                for new volunteers. Fill out the application below and we will contact you to discuss
                                the details.
                            </p>
                        </div>
                        <div className='flex justify-center mt-[50px]'>
                            <Link href='/supports/volunteering/registration'>
                                <button className='bg-[#F15A2B] hover:bg-[#4D4C4C]  text-[25px] cursor-pointer text-white rounded-lg p-[10px] px-[40px] btn-phone'>
                                    Fill out the application
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