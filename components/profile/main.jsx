"use client"
import React, {useEffect, useState} from 'react';
import {LogoutOutlined, UsergroupAddOutlined, UserOutlined} from "@ant-design/icons";
import Link from "next/link";
import LogoutModal from "@/components/profile/logoutModal";
import {getCookie} from "@/utils/utils";
import PaymentExample from "@/components/paypal/PaymentExample";
const Main = ({dict}) => {
    const [logoutModal, setLogoutModal] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const authToken = getCookie('authToken');
        if (authToken) {
            const userData = JSON.parse(authToken);
            setUser(userData);
        } else {
            console.log('Auth token not found');
        }
    }, []);
    return (
        <div className="bg-[#232222] pt-[160px] pb-[100px]">
            <div
                className='container m-auto bg-[#D9D9D91A] p-[20px] rounded-2xl border-t-2 border-[#BF3206] h-auto '>

                <div className="flex text-white font-bold">
                    <div className='w-[50%] flex  border-r-2 border-white'>
                       <div className='w-auto'>
                           <div className="avatar rounded-full overflow-hidden w-[200px] h-[200px] mr-2 ">
                               <img src="/user-avatar.png" className='w-full h-full object-cover' alt=""/>
                           </div>
                       </div>
                        <div className='w-[50%] pt-5 text-[#C7C7C7]'>
                            <h2 className='text-2xl'>{dict?.student}</h2>
                            <h1 className='text-xl'>{user.name}</h1>
                        </div>
                    </div>
                    <div className='w-[50%] pl-4 text-[#C7C7C7]'>
                        <div className='w-[50%] pt-5'>
                            <h2 className='text-2xl'>{dict.parent}</h2>
                            <h1 className='text-xl'>Name Surname</h1>
                            <h3 className='text-xl'>{user.email}</h3>
                        </div>
                        <div>
                        <PaymentExample />
                        </div>
                    </div>
                </div>

                <div className="content mt-[50px]">
                    <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] cursor-pointer flex items-center text-[19px] text-white'>
                        <p className='ml-5'>
                            <UserOutlined /> {dict.profile_information}
                        </p>
                    </div>
                    <Link href='/profile/groups'>
                        <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] cursor-pointer flex items-center text-[19px] text-white'>
                            <p className='ml-5'>
                                <UsergroupAddOutlined /> {dict.groups}
                            </p>
                        </div>
                    </Link>
                    <div onClick={()=>setLogoutModal(true)} className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] cursor-pointer flex items-center text-[19px] text-white'>
                        <p className='ml-5'>
                            <LogoutOutlined /> {dict.sign_out}
                        </p>
                    </div>
                </div>
            </div>
            {logoutModal &&
                <LogoutModal dict={dict}  handlerClose={()=>setLogoutModal(false)}/>}

        </div>
    );
};

export default Main;