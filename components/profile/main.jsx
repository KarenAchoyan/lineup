"use client";
import React, { useEffect, useState } from 'react';
import { LogoutOutlined, UsergroupAddOutlined, UserOutlined, CreditCardOutlined, SettingOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import LogoutModal from "@/components/profile/logoutModal";
import { getCookie } from "@/utils/utils";
import PaymentExample from "@/components/paypal/PaymentExample";
import { useRouter } from 'next/navigation';

const Main = ({ dict }) => {
    const router = useRouter();
    const [logoutModal, setLogoutModal] = useState(false);
    const [user, setUser] = useState({});
    const [hasPaid, setHasPaid] = useState(null); // null = loading, true = paid, false = not paid

    useEffect(() => {
        const checkAuth = () => {
            const authToken = getCookie('authToken');
            
            if (!authToken) {
                console.log('Auth token not found');
                router.push('/auth/signIn');
                return;
            }
            
            try {
                // Try to decode the URI-encoded cookie value
                const decodedToken = decodeURIComponent(authToken);
                const userData = JSON.parse(decodedToken);
                
                if (!userData || !userData.user_id) {
                    console.error("Invalid user data in token");
                    router.push('/auth/signIn');
                    return;
                }

                setUser(userData);
                
                // Check payment status
                fetch(`/api/payment-status?user_id=${userData.user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userData.token}` // Add token to request
                    },
                })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Payment status check failed');
                    }
                    return res.json();
                })
                .then(data => {
                    setHasPaid(data.has_paid);
                })
                .catch(err => {
                    console.error("Payment check failed:", err);
                    setHasPaid(false);
                });

            } catch (error) {
                console.error("Error processing auth token:", error);
                // If there's an error parsing the token, clear it and redirect
                document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict";
                router.push('/auth/signIn');
            }
        };

        checkAuth();
    }, [router]);

    return (
        <div className="bg-[#232222] pt-[160px] pb-[100px]">
            <div className='container m-auto bg-[#D9D9D91A] p-[20px] rounded-2xl border-t-2 border-[#BF3206] h-auto'>
                <div className="flex text-white font-bold flex-wrap">
                    <div className='w-full md:w-[50%] flex border-r-2 border-white'>
                        <div className='w-auto'>
                            <div className="relative w-[200px] h-[200px] mr-2">
                                <Image
                                    src="/user-avatar.png"
                                    alt="User Avatar"
                                    width={200}
                                    height={200}
                                    className="rounded-full object-cover"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </div>
                        <div className='w-[50%] pt-5 text-[#C7C7C7]'>
                            <h2 className='text-2xl'>{dict?.student}</h2>
                            <h1 className='text-xl'>{user.name}</h1>
                        </div>
                    </div>
                    <div className='w-full md:w-[50%] pl-4 text-[#C7C7C7]'>
                        <div className='w-[50%] pt-5'>
                            <h2 className='text-2xl'>{dict?.parent}</h2>
                            <h1 className='text-xl'>{user.parent_name}</h1>
                            <h3 className='text-xl'>{user.email}</h3>
                        </div>
                    </div>
                </div>

                <div className="content mt-[50px]">
                    <Link href='/profile/settings'>
                        <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] cursor-pointer flex items-center text-[19px] text-white'>
                            <p className='ml-5'>
                                <UserOutlined /> {dict?.profile_information}
                            </p>
                        </div>
                    </Link>
                    <Link href='/profile/payments'>
                        <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] cursor-pointer flex items-center text-[19px] text-white'>
                            <p className='ml-5'>
                                <CreditCardOutlined /> {dict?.payment_history || 'Payment History'}
                            </p>
                        </div>
                    </Link>
                    <div onClick={() => setLogoutModal(true)} className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] cursor-pointer flex items-center text-[19px] text-white'>
                        <p className='ml-5'>
                            <LogoutOutlined /> {dict?.sign_out}
                        </p>
                    </div>
                </div>
            </div>
            {logoutModal &&
                <LogoutModal dict={dict} handlerClose={() => setLogoutModal(false)} />}
        </div>
    );
};

export default Main;
