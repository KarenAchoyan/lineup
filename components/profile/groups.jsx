import React from 'react';
import {LogoutOutlined, UsergroupAddOutlined, UserOutlined} from "@ant-design/icons";

const Groups = () => {
    return (
        <>
            <div className="bg-[#232222] pt-[160px] pb-[100px]">
                <div
                    className='container m-auto bg-[#D9D9D91A] p-[20px] rounded-2xl border-t-2 border-[#BF3206] h-auto  lg:h-[500px]'>

                    <h1 className='text-[#C7C7C7] font-bold mb-6 text-center text-[30px] md:text-[45px]'>Groups</h1>
                    <div className="content mt-[50px]">
                        <div
                            className='w-full border-b-1  border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] cursor-pointer flex items-center text-[22px] text-white'>
                           <div className='w-[50%] border-r-1 h-full border-white flex items-center justify-center'>
                               <p>Falk fances</p>
                           </div>
                           <div className='flex items-center justify-center h-full w-[50%]'>
                               <p>12.01.2025-12.06.2025</p>
                           </div>
                        </div>
                        <div
                            className='w-full border-b-1 flex border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] cursor-pointer flex items-center text-[22px] text-white'>
                           <div className='w-[50%] border-r-1 h-full border-white flex items-center justify-center'>
                               <p>Falk fances</p>
                           </div>
                           <div className='flex items-center justify-center h-full w-[50%]'>
                               <p>12.01.2025-12.06.2025</p>
                           </div>
                        </div>
                        <div
                            className='w-full border-b-1 flex border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] cursor-pointer flex items-center text-[22px] text-white'>
                           <div className='w-[50%] border-r-1 h-full border-white flex items-center justify-center'>
                               <p>Falk fances</p>
                           </div>
                           <div className='flex items-center justify-center h-full w-[50%]'>
                               <p>12.01.2025-12.06.2025</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Groups;