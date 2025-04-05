"use client"

import React from 'react';
import Registration from "@/components/supports/collaborate/registration";
import {Input} from "antd";

const Donation = () => {
    return (
        <>
            <div className="bg-[#211d1dfc] signIn-background py-[180px] pb-[50px]">
                <div className="flex items-center justify-center">
                    <div className="container bg-[#4d4c4c2b] mb-[50px] pt-[30px] rounded-lg shadow-xl p-8">
                        <h1 className="text-[40px] text-[#C7C7C7] text-center">Donation</h1>
                        <p className='text-[20px] text-[#C7C7C7] text-center'>Your support allows us to develop the project and create the best for everyone. Every
                            donation makes us stronger.</p>

                        <div>
                            <p className='text-center text-[#C7C7C7] text-[20px] mt-[30px] mb-[10px]'>Frequency (Once or every month)</p>
                            <div className='flex justify-center'>
                                <div className='px-2'>
                                    <button className='px-[55px] hover:opacity-[50%] cursor-pointer py-[10px] bg-[#C7C7C7] rounded-xl mx-2'>Once</button>
                                </div>
                                <div className='px-2'>
                                    <button className='px-[55px] hover:opacity-[50%] cursor-pointer py-[10px] bg-[#C7C7C7] rounded-xl mx-2'>Every month</button>
                                </div>
                            </div>
                        </div>
                        <div className='w-full pt-10'>
                            <p className='text-center text-[#C7C7C7] text-[20px] mt-[30px] mb-[10px]'>The Amount</p>
                            <div className='flex justify-center w-full flex-wrap'>
                                <div className='px-2'>
                                    <button className='px-[55px] hover:opacity-[50%] cursor-pointer my-3 py-[10px] bg-[#C7C7C7] rounded-xl mx-2'>10GEL</button>
                                </div>
                                <div className='px-2'>
                                    <button className='px-[55px] hover:opacity-[50%] cursor-pointer my-3 py-[10px] bg-[#C7C7C7] rounded-xl mx-2'>20GEL</button>
                                </div>
                                <div className='px-2'>
                                    <button className='px-[55px] hover:opacity-[50%] cursor-pointer my-3 py-[10px] bg-[#C7C7C7] rounded-xl mx-2'>30GEL</button>
                                </div>
                                <div className='px-2'>
                                    <button className='px-[55px] hover:opacity-[50%] cursor-pointer my-3 py-[10px] bg-[#C7C7C7] rounded-xl mx-2'>40GEL</button>
                                </div>
                                <div className='px-2'>
                                    <button className='px-[55px] hover:opacity-[50%] cursor-pointer my-3 py-[10px] bg-[#C7C7C7] rounded-xl mx-2'>Other</button>
                                </div>
                            </div>
                        </div>

                        <div className='px-3 mt-5 cover-input w-full sm:w-[80%] mx-auto'>
                            <Input.TextArea placeholder='Cover letter'></Input.TextArea>
                        </div>
                        <div className='flex justify-center px-3 mt-[30px]'>
                            <button
                                type="submit"
                                className="bg-[#F15A2B] hover:bg-[#808080] w-[320px]  text-[18px]  sm:text-[20px]  text-white py-2 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Donation;