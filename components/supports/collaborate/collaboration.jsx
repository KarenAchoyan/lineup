"use client"
import React from 'react';
import Registration from "@/components/supports/collaborate/registration";

const Collaboration = () => {
    return (
        <>
            <div className="bg-[#211d1dfc] signIn-background py-[180px] pb-[50px]">
                <div className="flex items-center justify-center">
                    <div className="container bg-[#4d4c4c2b] mb-[50px] pt-[30px] rounded-lg shadow-xl p-8">
                        <h1 className="text-[40px] text-[#C7C7C7] text-center">Collaboration</h1>
                        <Registration/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Collaboration;