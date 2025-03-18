import React from 'react';
import Image from "next/image";
import {
    DownOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    FacebookFilled,
    InstagramFilled, YoutubeFilled
} from "@ant-design/icons";

const App = ({children}) => {
    return (
        <>
            <header className='absolute top-0 left-0 w-full z-10'>
                <div className="container m-auto h-[136px]  flex items-center justify-between">
                    <div className='logo-parent'>
                        <Image src='/logo.png' alt={"Logo"} className='w-[200px] h-[141px]' width={800} height={800}/>

                    </div>
                    <div className='menu-parent'>
                        <div className='w-[95%] m-auto h-[64px] bg-[#434343] rounded-full'>
                            <ul className='flex h-full items-center justify-evenly'>
                                <li className='text-[24px] text-white hover:text-[#F15A2B] hover:cursor-pointer'>About us</li>
                                <li className='text-[24px] text-white hover:text-[#F15A2B] hover:cursor-pointer'>Schedule</li>
                                <li className='text-[24px] text-white hover:text-[#F15A2B] hover:cursor-pointer'>Events</li>
                                <li className='text-[24px] text-white hover:text-[#F15A2B] hover:cursor-pointer'>Support us</li>
                            </ul>
                        </div>
                    </div>
                    <div  className='actions-parent'>
                        <div className='w-[95%] m-auto h-[64px] bg-[#434343] rounded-full'>
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
            <footer className='absolute w-full  h-[450px] bg-[#2D2D2D] border-top border-t-2 border-[#BF3206] pt-[50px]'>
                <div className='container m-auto  flex items-center h-auto '>
                    <div className='w-1/3 h-64 footer-logo'>
                       <div className='w-[260px]'>
                           <Image src='/logo.png' alt={"Logo"} className='w-[260px] h-[180px]' width={800} height={800}/>
                           <ul className='flex justify-evenly w-[240px] m-auto'>
                               <li className='text-[#C7C7C7] text-[20px]'><FacebookFilled/></li>
                               <li className='text-[#C7C7C7] text-[20px]'><InstagramFilled/></li>
                               <li className='text-[#C7C7C7] text-[20px]'><YoutubeFilled/></li>
                           </ul>
                       </div>
                    </div>
                    <div className='w-1/3 h-64'>
                         <h3 className='text-[20px] text-[#F15A2B] font-bold '>Find Us</h3>
                        <ul>
                            <li className="flex items-center gap-2 my-4 text-sm text-[#C7C7C7] font-semibold">
                                <span className="text-lg text-[#F15A2B]" ><MailOutlined/></span> lineup2606@gmail.com
                            </li>
                            <li className="flex items-center gap-2 my-4 text-sm text-[#C7C7C7] font-semibold">
                                <span className="text-lg text-[#F15A2B]" ><PhoneOutlined  /></span> +995 (592) 777 743
                            </li>
                            <li className="flex items-center gap-2 my-4 text-sm text-[#C7C7C7] font-semibold">
                                <span className="text-lg text-[#F15A2B]" ><PhoneOutlined  /></span> +995 (574) 515 075
                            </li>
                            <li className="flex items-center gap-2 my-4 text-sm text-[#C7C7C7] font-semibold">
                                <span className="text-lg text-[#F15A2B]" ><EnvironmentOutlined /></span> Akhalkalaki city, Azatutyan 87/3
                            </li>
                        </ul>
                    </div>
                    <div className='w-1/3 h-64'>
                        <h3 className='text-[20px] text-[#F15A2B] font-bold'>Customers</h3>
                        <ul>
                            <li className='my-[16px] text-[14px] text-[#C7C7C7] font-[600]'>FAQ</li>
                            <li className='my-[16px] text-[14px] text-[#C7C7C7] font-[600]'>Process Returns/Exchange</li>
                            <li className='my-[16px] text-[14px] text-[#C7C7C7] font-[600]'>Refund/Return Policy</li>
                            <li className='my-[16px] text-[14px] text-[#C7C7C7] font-[600]'>Blog Post</li>
                        </ul>
                    </div>
                </div>
                <div className="container m-auto flex justify-end">
                    <div className='text-right text-[#C7C7C7]'>
                        <p>Copyright ©2025 </p>
                        <p>All rights reserved</p>
                        <p>The website is made by GeekLab Company</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default App;