"use client"
import React from 'react';

const LogoutModal = ({handlerClose}) => {
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
            <div className='w-full h-screen bg-[#000000a2] fixed top-0 left-0 z-20'>

            </div>
            <div
                className='fixed w-[600px] h-[300px] bg-[#353434] top-[50%] z-30 left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center'>
                <div className='flex flex-col justify-center items-center w-full p-10'>
                    <h1 className='text-[#C7C7C7] text-2xl'>Are you sure you want to log out?</h1>
                    <div className='flex mt-10'>
                        <button className='w-[180px] h-[40px] cursor-pointer text-[20px] mx-5 rounded-lg text-white bg-[#4D4C4C] hover:bg-[#F15A2B]' onClick={answerYes}>Yes</button>
                        <button className='w-[180px] h-[40px] cursor-pointer text-[20px] mx-5 rounded-lg text-white bg-[#4D4C4C] hover:bg-[#F15A2B]' onClick={answerNo}>No</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogoutModal;