import React from 'react';
import Image from "next/image";
import {DownOutlined} from "@ant-design/icons";

const App = ({children}) => {
    return (
        <>
            <header className='absolute top-0 left-0 w-full z-10'>
                <div className="container m-auto h-[136px]  flex items-center justify-between">
                    <div className='logo-parent'>
                        <Image src='/logo.png' alt={"Logo"} className='w-[200px] h-[141px]' width={800} height={800}/>
                    </div>
                    <div className='menu-parent'>
                        <div className='w-[95%] m-auto h-[64px] bg-[#2D2D2D63] rounded-full'>
                            <ul className='flex h-full items-center justify-evenly'>
                                <li className='text-[24px] text-white hover:text-[#F15A2B] hover:cursor-pointer'>About us</li>
                                <li className='text-[24px] text-white hover:text-[#F15A2B] hover:cursor-pointer'>Schedule</li>
                                <li className='text-[24px] text-white hover:text-[#F15A2B] hover:cursor-pointer'>Events</li>
                                <li className='text-[24px] text-white hover:text-[#F15A2B] hover:cursor-pointer'>Support us</li>
                            </ul>
                        </div>
                    </div>
                    <div  className='actions-parent'>
                        <div className='w-[95%] m-auto h-[64px] bg-[#2D2D2D63] rounded-full'>
                            <ul className='h-full flex items-center justify-evenly'>
                                <li>
                                    <Image className='w-[21px] h-[21px]' src={'/user.png'} alt={'User'} width={40} height={40}/>
                                </li>
                                <li className='text-white'>EN <DownOutlined className='w-[12px]'/></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                {children}
            </main>
        </>
    );
};

export default App;