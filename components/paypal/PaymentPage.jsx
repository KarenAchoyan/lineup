"use client";
import React, { useState, useEffect } from 'react';
import { CreditCardOutlined, DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import FlittPayment from './FlittPayment';
import { getCookie } from '@/utils/utils';
import { useRouter } from 'next/navigation';

const PaymentPage = ({ dict = {} }) => {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [selectedAmount, setSelectedAmount] = useState(30);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const paymentPlans = [
        {
            id: 'monthly',
            amount: 30,
            currency: 'GEL',
            period: 'Monthly',
            description: 'Full access to all features',
            features: ['Unlimited access', 'All courses', 'Priority support']
        }
    ];

    useEffect(() => {
        const checkAuth = () => {
            const authToken = getCookie('authToken');
            
            if (!authToken) {
                router.push('/auth/signIn');
                return;
            }
            
            try {
                const decodedToken = decodeURIComponent(authToken);
                const userData = JSON.parse(decodedToken);
                
                if (!userData || !userData.user_id) {
                    router.push('/auth/signIn');
                    return;
                }

                setUser(userData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error processing auth token:", error);
                router.push('/auth/signIn');
            }
        };

        checkAuth();
    }, [router]);

    const handlePaymentSuccess = async (paymentData) => {
        try {
            const response = await fetch('/api/flitt/payment-success', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    userId: user.user_id,
                    paymentData,
                    amount: selectedAmount
                })
            });

            if (response.ok) {
                setPaymentStatus('success');
                setTimeout(() => {
                    router.push('/profile');
                }, 3000);
            } else {
                throw new Error('Failed to update payment status');
            }
        } catch (error) {
            console.error('Payment success handling error:', error);
            setPaymentStatus('error');
        }
    };

    const handlePaymentError = (errorData) => {
        console.error('Payment error:', errorData);
        setPaymentStatus('error');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#232222] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    if (paymentStatus === 'success') {
        return (
            <div className="min-h-screen bg-[#232222] flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
                    <div className="text-center">
                        <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-4">Your subscription has been activated.</p>
                        <p className="text-sm text-gray-500">Redirecting to your profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#232222] pt-[160px] pb-[100px]">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4">
                            {dict?.payment_title || 'Choose Your Plan'}
                        </h1>
                        <p className="text-gray-300 text-lg">
                            {dict?.payment_subtitle || 'Select the perfect plan for your learning journey'}
                        </p>
                    </div>

                    {/* Payment Plans */}
                    <div className="grid grid-cols-1 gap-6 mb-8 max-w-md mx-auto">
                        {paymentPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-200 ${
                                    selectedAmount === plan.amount
                                        ? 'ring-2 ring-blue-500 transform scale-105'
                                        : 'hover:shadow-xl'
                                }`}
                                onClick={() => setSelectedAmount(plan.amount)}
                            >
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.period}</h3>
                                    <div className="text-3xl font-bold text-blue-600 mb-2">
                                        {plan.amount} {plan.currency}
                                    </div>
                                    <p className="text-gray-600 mb-4">{plan.description}</p>
                                    
                                    <ul className="text-left space-y-2 mb-6">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-sm text-gray-700">
                                                <CheckCircleOutlined className="text-green-500 mr-2" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    <button
                                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                                            selectedAmount === plan.amount
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {selectedAmount === plan.amount ? 'Selected' : 'Select Plan'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Payment Form */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-center mb-6">
                            <CreditCardOutlined className="text-2xl text-blue-600 mr-2" />
                            <h2 className="text-2xl font-bold text-gray-800">
                                {dict?.secure_payment || 'Secure Payment'}
                            </h2>
                        </div>

                        <FlittPayment
                            amount={selectedAmount}
                            currency="GEL"
                            merchantId={1549901}
                            userId={user.user_id}
                            userEmail={user.email}
                            onPaymentSuccess={handlePaymentSuccess}
                            onPaymentError={handlePaymentError}
                            className="max-w-2xl mx-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
