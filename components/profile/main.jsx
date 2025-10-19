"use client";
import React, { useEffect, useState } from 'react';
import { LogoutOutlined, UserOutlined, CreditCardOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import LogoutModal from "@/components/profile/logoutModal";
import FlittPayment from "@/components/payments/FlittPayment";
import { getCookie } from "@/utils/utils";
import { useRouter } from 'next/navigation';

const Main = ({ dict }) => {
    const router = useRouter();
    const [logoutModal, setLogoutModal] = useState(false);
    const [user, setUser] = useState({});
    const [showPayment, setShowPayment] = useState(false);
    const [hasPaid, setHasPaid] = useState(null); // null = loading, true = paid, false = not paid
    const [paymentLoading, setPaymentLoading] = useState(false);

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
                console.log('Profile: User data set:', userData);
                
                // Check payment status
                console.log('Profile: Checking payment status for user_id:', userData.user_id);
                fetch(`/api/payments/check-status?user_id=${userData.user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userData.token}`
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

    // Handle payment success redirect
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentSuccess = urlParams.get('payment_success');
        const paymentError = urlParams.get('payment_error');
        
        if (paymentSuccess === 'true') {
            console.log('Payment success detected, refreshing payment status...');
            setHasPaid(true);
            setShowPayment(false);
            setPaymentLoading(false);
            
            // Clean up URL parameters
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        } else if (paymentError) {
            console.log('Payment error detected:', paymentError);
            setHasPaid(false);
            setShowPayment(false);
            setPaymentLoading(false);
            
            // Clean up URL parameters
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    }, []);

    return (
        <div className="bg-[#232222] pt-[160px] pb-[100px]">
            <div className='container m-auto bg-[#D9D9D91A] p-[20px] rounded-2xl border-t-2 border-[#BF3206] h-auto'>
                <div className="flex text-white font-bold flex-wrap">
                    <div className='w-full md:w-[30%] flex border-r-2 border-white'>
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
                    <div className='w-full md:w-[70%] pl-4 text-[#C7C7C7]'>
                        <div className='w-[50%] pt-5'>
                            <h2 className='text-2xl'>{dict?.parent}</h2>
                            <h1 className='text-xl'>{user.parent_name}</h1>
                            <h3 className='text-xl'>{user.email}</h3>
                            
                            {/* Payment Section */}
                            <div className="mt-6 w-full">
                                {hasPaid === null && (
                                    <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg mb-4">
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                                            <p>Checking payment status...</p>
                                        </div>
                                    </div>
                                )}
                                
                                {hasPaid === true && (
                                    <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-4">
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                                            <p>Payment completed successfully!</p>
                                        </div>
                                    </div>
                                )}
                                
                                {hasPaid === false && (
                                    <div className="mb-4">
                                        <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 px-4 py-3 rounded-lg mb-4">
                                            <p>Payment is required to access all features.</p>
                                        </div>
                                        
                                        {!showPayment ? (
                                            <button
                                                onClick={() => {
                                                    setShowPayment(true);
                                                    setPaymentLoading(true);
                                                }}
                                                disabled={paymentLoading}
                                                className="w-full bg-[#BF3206] text-white px-6 py-4 rounded-lg hover:bg-[#a02a05] transition-colors flex items-center justify-center text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {paymentLoading ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CreditCardOutlined className="mr-3 text-xl" />
                                                        Make Payment (30 GEL)
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <div className="w-full">
                                                <div className="bg-blue-100 border border-blue-300 text-blue-700 px-4 py-3 rounded-lg mb-4">
                                                    <p className="font-semibold">Redirecting to Payment</p>
                                                    <p className="text-sm">You will be redirected to Flitt's secure payment page.</p>
                                                </div>
                                                
                                                <FlittPayment
                                                    userId={user.user_id}
                                                    userEmail={user.email}
                                                    amount={30}
                                                    currency="GEL"
                                                    onSuccess={(result) => {
                                                        console.log("Payment processed successfully:", result);
                                                        setHasPaid(true);
                                                        setShowPayment(false);
                                                        setPaymentLoading(false);
                                                    }}
                                                    onError={(error) => {
                                                        console.error("Payment processing error:", error);
                                                        setShowPayment(false);
                                                        setPaymentLoading(false);
                                                    }}
                                                    className="w-full"
                                                />
                                                
                                                <button
                                                    onClick={() => {
                                                        setShowPayment(false);
                                                        setPaymentLoading(false);
                                                    }}
                                                    className="mt-4 w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                                                >
                                                    Cancel Payment
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                      
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
