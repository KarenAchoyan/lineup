"use client"
import { useState } from 'react'; 
import PayPalButton from './PayPalButton';

export default function PaymentExample() {
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [error, setError] = useState(null);

    const handlePaymentSuccess = (result) => {
        setPaymentStatus('success');
        console.log('Payment successful:', result);
    };

    const handlePaymentError = (error) => {
        setPaymentStatus('error');
        setError(error.message);
        console.error('Payment failed:', error);
    };

    return (
        <div className="p-6  rounded-lg bg-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
            
            {paymentStatus === 'success' ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    <p>Payment successful! Thank you for your purchase.</p>
                </div>
            ) : (
                <>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Payment Details</h3>
                        <p className="text-gray-600">Amount: 30 GEL</p>
                    </div>

                    <PayPalButton
                          amount={1}
                        currency="GEL"
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                    />

                    {error && (
                        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}
                </>
            )}
        </div>
    );
} 