"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircleOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const PaymentStatus = ({ userId, userToken, dict = {} }) => {
    const [status, setStatus] = useState(null); // null = loading, true = paid, false = not paid
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkPaymentStatus = async () => {
            if (!userId) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/payment-status?user_id=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStatus(data.has_paid);
                } else {
                    setStatus(false);
                }
            } catch (error) {
                console.error("Payment status check failed:", error);
                setStatus(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkPaymentStatus();
    }, [userId, userToken]);

    if (isLoading) {
        return (
            <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                    <LoadingOutlined className="animate-spin mr-2" />
                    <p>{dict?.checking_payment_status || 'Checking payment status...'}</p>
                </div>
            </div>
        );
    }

    if (status === true) {
        return (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                    <CheckCircleOutlined className="mr-2" />
                    <p className="font-semibold">{dict?.subscription_active || 'Subscription Active'}</p>
                </div>
            </div>
        );
    }

    if (status === false) {
        return (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                    <ExclamationCircleOutlined className="mr-2" />
                    <p className="font-semibold">{dict?.subscription_inactive || 'Subscription Inactive'}</p>
                </div>
            </div>
        );
    }

    return null;
};

export default PaymentStatus;
