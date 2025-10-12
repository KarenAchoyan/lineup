"use client"

import React, { useState } from 'react';
import { Input } from "antd";

const Donation = ({dict}) => {
    const [coverLetter, setCoverLetter] = useState('');

    const handleCoverLetterChange = (e) => {
        setCoverLetter(e.target.value);
    };

    return (
        <>
            <div className="bg-[#211d1dfc] signIn-background py-[180px] pb-[50px]">
                <div className="flex items-center justify-center">
                    <div className="container bg-[#4d4c4c2b] mb-[50px] pt-[30px] rounded-lg shadow-xl p-8">
                        <h1 className="text-[40px] text-[#C7C7C7] text-center mb-5">{dict.donation}</h1>
                        <p className='text-[20px] text-[#C7C7C7] text-center'>{dict.donation_description}</p>

                        <div className="mt-8">
                            <p className='text-center text-[#C7C7C7] text-[18px] mb-4'>
                                For donations, please contact us directly at our office or through our contact information.
                            </p>
                            
                            <div className='px-3 mt-5 cover-input w-full sm:w-[80%] mx-auto'>
                                <Input.TextArea 
                                    placeholder='Cover letter or message'
                                    value={coverLetter}
                                    onChange={handleCoverLetterChange}
                                />
                            </div>

                            <div className="flex justify-center mt-6">
                                <button 
                                    className="px-8 py-3 bg-[#F15A2B] text-white rounded-xl hover:opacity-[80%] transition-opacity"
                                    onClick={() => {
                                        alert('Thank you for your interest in supporting us. Please contact us directly for donation arrangements.');
                                    }}
                                >
                                    Contact for Donation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Donation;