"use client"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { getCookie } from "@/utils/utils";
import { convertGelToUsd, formatCurrency } from "@/utils/currency";

export default function PayPalButton({ amount, coverLetter, onSuccess, onError }) {
    const [error, setError] = useState(null);

    const getUserId = () => {
        const authToken = getCookie('authToken');
        if (authToken) {
            try {
                const userData = JSON.parse(authToken);
                return userData.user_id;
            } catch (err) {
                console.error('Error parsing auth token:', err);
                return null;
            }
        }
        return null;
    };

    const initialOptions = {
        "client-id": "AY7AFCTUPwYOEYbIvVtgA-P7NgncygaIL2aX3a0JcDoq4qTTtJBS-hX4_8On8C-v_jIH7xA5zkTlX5Xl",
        currency: "USD",
        intent: "capture",
        components: "buttons",
        "disable-funding": "paylater,venmo"
    };

    // Add 4% to amount
    const amountWithFee = amount * 1.04;
    // Convert GEL amount to USD
    const usdAmount = convertGelToUsd(amountWithFee);

    return (
        <div className="w-full max-w-md mx-auto">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <div className="mb-4 text-center">
                <p className="text-gray-600">
                    {formatCurrency(amount, 'GEL')} + 4% fee = {formatCurrency(amountWithFee, 'GEL')} = {formatCurrency(usdAmount, 'USD')}
                </p>
            </div>
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{ 
                        layout: "vertical",
                        color: "blue",
                        shape: "rect",
                        label: "pay"
                    }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: usdAmount,
                                        currency_code: "USD"
                                    }
                                }
                            ],
                            application_context: {
                                shipping_preference: "NO_SHIPPING",
                                user_action: "PAY_NOW",
                                brand_name: "Your Brand Name",
                                landing_page: "NO_PREFERENCE",
                                shipping_preference: "NO_SHIPPING",
                                billing_preference: "NO_BILLING"
                            }
                        });
                    }}
                    onApprove={async (data, actions) => {
                        try {
                            const details = await actions.order.capture();
                            const response = await fetch('/api/create-order', {
                                method: 'POST',
                                headers: { 
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                body: JSON.stringify({
                                    orderID: data.orderID,
                                    payerID: data.payerID,
                                    user_id: getUserId(),
                                    amount: details.purchase_units[0].amount.value,
                                    originalAmount: amountWithFee, // Store original GEL amount
                                    userEmail: details.payer.email_address,
                                    status: details.status,
                                    createTime: details.create_time,
                                    updateTime: details.update_time,
                                    coverLetter: coverLetter || '', // Add cover letter to the request
                                    paymentTime: new Date().toISOString() // Add payment time
                                })
                            });

                            if (!response.ok) {
                                const errorData = await response.json();
                                throw new Error(errorData.error || 'Failed to process payment');
                            }

                            const result = await response.json();
                            
                            if (onSuccess) {
                                onSuccess(result);
                            }
                        } catch (err) {
                            console.error('Payment processing error:', err);
                            setError(err.message || 'An error occurred during payment processing');
                            if (onError) {
                                onError(err);
                            }
                        }
                    }}
                    onError={(err) => {
                        console.error('PayPal Error:', err);
                        setError('Payment failed. Please try again.');
                        if (onError) {
                            onError(err);
                        }
                    }}
                    onCancel={() => {
                        console.log('Payment cancelled by user');
                        setError('Payment was cancelled');
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
}
