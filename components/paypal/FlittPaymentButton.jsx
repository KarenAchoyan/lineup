"use client";
import React, { useState } from 'react';
import { CreditCardOutlined, DollarOutlined } from '@ant-design/icons';
import FlittPayment from './FlittPayment';

const FlittPaymentButton = ({ 
    userId, 
    userEmail, 
    userToken,
    dict = {},
    className = "" 
}) => {
    const [showPayment, setShowPayment] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(3000);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [saveCard, setSaveCard] = useState(false);
    const [verificationMode, setVerificationMode] = useState(false);
    const [savedCards, setSavedCards] = useState([]);
    const [showCardManagement, setShowCardManagement] = useState(false);

    const paymentAmounts = [
        { amount: 300, label: '30 GEL', description: 'Monthly Subscription' },
        { amount: 100, label: '1 GEL', description: 'Card Verification Only' }
    ];

    const handlePaymentSuccess = async (paymentData) => {
        try {
            // Call your API to update payment status
            const response = await fetch('/api/flitt/payment-success', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    userId,
                    paymentData,
                    amount: selectedAmount,
                    saveCard,
                    verificationMode,
                    rectoken: paymentData?.rectoken
                })
            });

            if (response.ok) {
                setPaymentStatus('success');
                
                // If card was saved, add it to saved cards list
                if (saveCard && paymentData?.rectoken) {
                    const newCard = {
                        id: Date.now(),
                        rectoken: paymentData.rectoken,
                        last4: paymentData?.card_last4 || '****',
                        brand: paymentData?.card_brand || 'Card',
                        savedAt: new Date().toISOString()
                    };
                    setSavedCards(prev => [...prev, newCard]);
                }
                
                // You might want to refresh the page or update parent component
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
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

    const handleRecurringPayment = async (card) => {
        try {
            const response = await fetch('/api/recurring-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    amount: selectedAmount,
                    currency: 'GEL',
                    rectoken: card.rectoken,
                    userId,
                    userEmail
                })
            });

            if (response.ok) {
                setPaymentStatus('success');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                throw new Error('Failed to process recurring payment');
            }
        } catch (error) {
            console.error('Recurring payment error:', error);
            setPaymentStatus('error');
        }
    };

    const handleCardVerification = () => {
        setVerificationMode(true);
        setSaveCard(true);
        setSelectedAmount(100); // 1 GEL for verification
        setShowPayment(true);
    };

    if (paymentStatus === 'success') {
        return (
            <div className={`bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg ${className}`}>
                <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p>Payment successful! Your subscription has been activated.</p>
                </div>
            </div>
        );
    }

    if (showPayment) {
        return (
            <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Complete Payment</h3>
                    <button
                        onClick={() => setShowPayment(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ×
                    </button>
                </div>

                <div className="mb-4">
                    <h4 className="text-md font-medium text-gray-700 mb-3">Select Payment Amount:</h4>
                    <div className="grid grid-cols-1 gap-3">
                        {paymentAmounts.map((option) => (
                            <button
                                key={option.amount}
                                onClick={() => {
                                    setSelectedAmount(option.amount);
                                    if (option.amount === 100) {
                                        setVerificationMode(true);
                                        setSaveCard(true);
                                    } else {
                                        setVerificationMode(false);
                                    }
                                }}
                                className={`p-3 border rounded-lg text-left transition-colors ${
                                    selectedAmount === option.amount
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="font-semibold text-gray-800">{option.label}</div>
                                <div className="text-sm text-gray-600">{option.description}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Card Saving Options */}
                <div className="mb-4">
                    <h4 className="text-md font-medium text-gray-700 mb-3">Card Options:</h4>
                    <div className="space-y-3">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={saveCard}
                                onChange={(e) => setSaveCard(e.target.checked)}
                                className="mr-2"
                            />
                            <span className="text-sm text-gray-700">Save card for future payments</span>
                        </label>
                        
                        {saveCard && (
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={verificationMode}
                                    onChange={(e) => setVerificationMode(e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-700">Card verification only (1 GEL)</span>
                            </label>
                        )}
                    </div>
                </div>

                <FlittPayment
                    amount={selectedAmount}
                    currency="GEL"
                    merchantId={1549901}
                    userId={userId}
                    userEmail={userEmail}
                    saveCard={saveCard}
                    verification={verificationMode}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                />
            </div>
        );
    }

    // Card Management Modal
    if (showCardManagement) {
        return (
            <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Manage Saved Cards</h3>
                    <button
                        onClick={() => setShowCardManagement(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ×
                    </button>
                </div>

                {savedCards.length > 0 ? (
                    <div className="space-y-3">
                        {savedCards.map((card) => (
                            <div key={card.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-gray-800">{card.brand} •••• {card.last4}</p>
                                        <p className="text-sm text-gray-600">Saved on {new Date(card.savedAt).toLocaleDateString()}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRecurringPayment(card)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                                    >
                                        Pay with this card
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">No saved cards found</p>
                        <button
                            onClick={() => {
                                setShowCardManagement(false);
                                handleCardVerification();
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                            Verify and Save Card
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`${className}`}>
            <div className="space-y-3">
                <button
                    onClick={() => setShowPayment(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                    <CreditCardOutlined className="text-lg" />
                    <span>{dict?.make_payment || 'Make Payment'}</span>
                    <DollarOutlined className="text-lg" />
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={handleCardVerification}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                        <CreditCardOutlined className="text-sm" />
                        <span>Verify Card</span>
                    </button>
                    
                    <button
                        onClick={() => setShowCardManagement(true)}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                        <CreditCardOutlined className="text-sm" />
                        <span>Saved Cards</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlittPaymentButton;
