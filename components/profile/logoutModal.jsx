"use client"
import React from 'react';

const LogoutModal = ({handlerClose, dict}) => {
    function answerYes() {
        document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict";
        localStorage.removeItem("user");
        window.location.reload();
    }

    function answerNo() {
        handlerClose()
    }

    return (
        <>
            <div className='w-full h-screen bg-[#000000a2] fixed top-0 left-0 z-20'></div>
            <div
                className='fixed w-[600px] h-[300px] bg-[#353434] top-[50%] z-30 left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center'>
                <div className='flex flex-col justify-center items-center w-full p-10'>
                    <h1 className='text-[#C7C7C7] text-2xl'>{dict.are_you_sure_you_want_to_log_out}</h1>
                    <div className='flex mt-10'>
                        <button className='w-[180px] h-[40px] cursor-pointer text-[20px] mx-5 rounded-lg text-white bg-[#4D4C4C] hover:bg-[#F15A2B]' onClick={answerYes}>{dict.yes}</button>
                        <button className='w-[180px] h-[40px] cursor-pointer text-[20px] mx-5 rounded-lg text-white bg-[#4D4C4C] hover:bg-[#F15A2B]' onClick={answerNo}>{dict.no}</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogoutModal;