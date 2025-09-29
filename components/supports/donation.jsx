"use client"

import React, { useState } from 'react';
import { Input } from "antd";
import FlittPaymentButton from '@/components/paypal/FlittPaymentButton';

const Donation = ({dict, userId, userEmail, userToken}) => {
    const [amount, setAmount] = useState('');
    const [frequency, setFrequency] = useState('one-time');
    const [customAmount, setCustomAmount] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [error, setError] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');

    const handleAmountSelect = (value) => {
        setAmount(value);
        if (value === 'other') {
            setCustomAmount('');
            setShowPayment(false);
        } else {
            setShowPayment(true);
        }
    };

    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value);
        setShowPayment(false);
    };

    const handleConfirmAmount = () => {
        if (customAmount) {
            setAmount(customAmount);
            setShowPayment(true);
        }
    };

    const handleCoverLetterChange = (e) => {
        setCoverLetter(e.target.value);
    };

    const handlePaymentSuccess = (result) => {
        setPaymentStatus('success');
        console.log('Donation payment successful:', result);
    };

    const handlePaymentError = (error) => {
        setPaymentStatus('error');
        setError(error.message || 'Payment failed');
    };

    return (
        <>
            <div className="bg-[#211d1dfc] signIn-background py-[180px] pb-[50px]">
                <div className="flex items-center justify-center">
                    <div className="container bg-[#4d4c4c2b] mb-[50px] pt-[30px] rounded-lg shadow-xl p-8">
                        <h1 className="text-[40px] text-[#C7C7C7] text-center mb-5">{dict.donation}</h1>
                        <p className='text-[20px] text-[#C7C7C7] text-center'>{dict.donation_description}</p>

                        {paymentStatus === 'success' ? (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
                                <p>Thank you for your donation! Your payment was successful.</p>
                            </div>
                        ) : (
                            <>
                                {/* <div>
                                    <p className='text-center text-[#C7C7C7] text-[20px] mt-[30px] mb-[20px]'>{dict.frequency}</p>
                                    <div className='flex justify-center'>
                                        <div className='px-2'>
                                            <button 
                                                className={`px-[55px] hover:opacity-[50%] cursor-pointer py-[10px] ${frequency === 'one-time' ? 'bg-[#F15A2B]' : 'bg-[#C7C7C7]'} rounded-xl mx-2`}
                                                onClick={() => setFrequency('one-time')}
                                            >
                                                {dict.donation_description_2}
                                            </button>
                                        </div>
                                        <div className='px-2'>
                                            <button 
                                                className={`px-[55px] hover:opacity-[50%] cursor-pointer py-[10px] ${frequency === 'monthly' ? 'bg-[#F15A2B]' : 'bg-[#C7C7C7]'} rounded-xl mx-2`}
                                                onClick={() => setFrequency('monthly')}
                                            >
                                                {dict.donation_description_3}
                                            </button>
                                        </div>
                                    </div>
                                </div> */}
                                <div className='w-full pt-10'>
                                    <p className='text-center text-[#C7C7C7] text-[20px] mt-[30px] mb-[10px]'>{dict.the_amount}</p>
                                    <div className='flex justify-center w-full flex-wrap'>
                                        {['10', '20', '30', '40'].map((value) => (
                                            <div key={value} className='px-2'>
                                                <button 
                                                    className={`px-[55px] hover:opacity-[50%] cursor-pointer my-3 py-[10px] ${amount === value ? 'bg-[#F15A2B]' : 'bg-[#C7C7C7]'} rounded-xl mx-2`}
                                                    onClick={() => handleAmountSelect(value)}
                                                >
                                                    {value}GEL
                                                </button>
                                            </div>
                                        ))}
                                        <div className='px-2'>
                                            <button 
                                                className={`px-[55px] hover:opacity-[50%] cursor-pointer my-3 py-[10px] ${amount === 'other' ? 'bg-[#F15A2B]' : 'bg-[#C7C7C7]'} rounded-xl mx-2`}
                                                onClick={() => handleAmountSelect('other')}
                                            >
                                                {dict.other}
                                            </button>
                                        </div>
                                    </div>
                                    {amount === 'other' && (
                                        <div className="flex justify-center mt-4 gap-2 w-full sm:w-[77%] mx-auto">
                                            <Input
                                                type="number"
                                                placeholder="Enter amount in GEL"
                                                value={customAmount}
                                                onChange={handleCustomAmountChange}
                                                className="w-[200px] text-center"
                                            />
                                            <button 
                                                className="px-4 py-2 bg-[#F15A2B] text-white rounded-xl hover:opacity-[50%]"
                                                onClick={handleConfirmAmount}
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className='px-3 mt-5 cover-input w-full sm:w-[80%] mx-auto'>
                                    <Input.TextArea 
                                        placeholder='Cover letter'
                                        value={coverLetter}
                                        onChange={handleCoverLetterChange}
                                    />
                                </div>

                                {amount && showPayment && (
                                    <div className='flex justify-center px-3 mt-[30px]'>
                                        <FlittPaymentButton
                                            userId={userId || 'guest'}
                                            userEmail={userEmail || 'guest@lineup.ge'}
                                            userToken={userToken || 'guest-token'}
                                            dict={dict}
                                            className="w-full max-w-md"
                                            amount={parseFloat(amount) * 100} // Convert to tetri
                                            currency="GEL"
                                            onPaymentSuccess={handlePaymentSuccess}
                                            onPaymentError={handlePaymentError}
                                            coverLetter={coverLetter}
                                        />
                                    </div>
                                )}

                                {error && (
                                    <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                        {error}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Donation;