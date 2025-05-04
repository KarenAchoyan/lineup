"use client"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export default function PayPalButton({ amount, onSuccess, onError }) {
    const [error, setError] = useState(null);

    const initialOptions = {
        "client-id": "AY7AFCTUPwYOEYbIvVtgA-P7NgncygaIL2aX3a0JcDoq4qTTtJBS-hX4_8On8C-v_jIH7xA5zkTlX5Xl",
        currency: "USD",
        intent: "capture",
        components: "buttons",
        "disable-funding": "paylater,venmo"
    };


    return (
        <div className="w-full max-w-md mx-auto">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
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
                                        value: amount.toString(),
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
                                    amount: details.purchase_units[0].amount.value,
                                    userEmail: details.payer.email_address,
                                    status: details.status,
                                    createTime: details.create_time,
                                    updateTime: details.update_time
                                }),
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
