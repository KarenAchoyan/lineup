"use client";
import React, { useState } from 'react';
import { CreditCardOutlined, DollarOutlined } from '@ant-design/icons';

const SimplePaymentForm = ({ 
    amount = 300, 
    currency = "GEL",
    onPaymentSubmit,
    className = "" 
}) => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Here you would normally process the payment
            // For now, we'll just simulate a successful payment
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            if (onPaymentSubmit) {
                onPaymentSubmit({
                    amount,
                    currency,
                    status: 'success',
                    transactionId: 'TXN_' + Date.now()
                });
            }
        } catch (error) {
            console.error('Payment error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Details</h3>
                <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Amount: <span className="font-semibold">{amount} {currency}</span></p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                    </label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                        </label>
                        <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                        </label>
                        <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                    </label>
                    <input
                        type="text"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <CreditCardOutlined />
                            <span>Pay {amount} {currency}</span>
                            <DollarOutlined />
                        </>
                    )}
                </button>
            </form>

            <div className="text-xs text-gray-500 text-center mt-4">
                <p>This is a demo payment form. In production, use a secure payment processor.</p>
            </div>
        </div>
    );
};

export default SimplePaymentForm;
