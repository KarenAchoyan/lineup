import React from 'react';
import Image from "next/image";

const Banner = () => {
    return (
        <>
            <div className='w-full h-[900px] relative bg-[#211d1dfc]'>
                <Image src="/banner.png" className='w-full h-full object-cover' alt={"Banner Image"} width={1500} height={700}/>
                <div className='container relative m-auto'>
                    <div className='w-[400px] absolute bottom-[80px] font-bold '>
                        <h1 className='text-[45px] text-white mb-[17px]'>It's never too late
                            to start <span className='text-[#F15A2B]'>dancing</span></h1>
                        <button className='text-[25px] bg-[#F15A2B] px-[86px] py-[10px] rounded-full text-white shadow-[0px_9px_9.1px_0px_#0000004A]'>Register</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;