"use client";
import React, { useEffect, useRef, useState } from 'react';
import { formatCurrency } from '@/utils/currency';
import SimplePaymentForm from './SimplePaymentForm';

const FlittPayment = ({ 
    amount = 300, 
    currency = "GEL", 
    merchantId = 1549901,
    onPaymentSuccess,
    onPaymentError,
    userId,
    userEmail,
    saveCard = false,
    verification = false,
    rectoken = null,
    className = ""
}) => {
    const checkoutRef = useRef(null);
    const initializedRef = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [useFallback, setUseFallback] = useState(false);

    useEffect(() => {
        let script = null;
        
        // Load Flitt checkout script
        const loadFlittScript = () => {
            // Check if script already exists
            const existingScript = document.querySelector('script[src*="flitt.com"]');
            if (existingScript) {
                if (window.checkout) {
                    initializePayment();
                } else {
                    existingScript.onload = initializePayment;
                }
                return;
            }

            // Try multiple script URLs
            const scriptUrls = [
                'https://pay.flitt.com/latest/checkout-vue/checkout.js',
                'https://checkout.flitt.com/checkout.js',
                'https://pay.flitt.com/checkout.js'
            ];

            const tryLoadScript = (urlIndex = 0) => {
                if (urlIndex >= scriptUrls.length) {
                    setError('All Flitt script URLs failed to load. Please check your internet connection.');
                    setUseFallback(true);
                    setIsLoading(false);
                    return;
                }

                script = document.createElement('script');
                script.src = scriptUrls[urlIndex];
                script.async = true;
                script.onload = () => {
                    console.log(`Flitt script loaded successfully from: ${scriptUrls[urlIndex]}`);
                    initializePayment();
                };
                script.onerror = (error) => {
                    console.error(`Failed to load Flitt script from ${scriptUrls[urlIndex]}:`, error);
                    if (urlIndex < scriptUrls.length - 1) {
                        console.log(`Trying next script URL...`);
                        tryLoadScript(urlIndex + 1);
                    } else {
                        setError('Failed to load Flitt payment system from all available sources.');
                        setUseFallback(true);
                        setIsLoading(false);
                    }
                };
                document.head.appendChild(script);
            };

            tryLoadScript();
        };

        const initializePayment = () => {
            if (!window.checkout) {
                console.error('Flitt checkout function not available');
                setError('Flitt payment system not available. Please refresh the page and try again.');
                setUseFallback(true);
                setIsLoading(false);
                return;
            }

            if (!checkoutRef.current) {
                console.error('Checkout container not available');
                return;
            }

            try {
                const options = {
                    options: {
                        methods: ["card"],
                        methods_disabled: [],
                        card_icons: ["mastercard", "visa"],
                        fields: false,
                        full_screen: false,
                        button: true,
                        hide_title: true,
                        hide_link: true,
                        email: false,
                        theme: {
                            type: "light",
                            preset: "reset"
                        }
                    },
                    params: {
                        merchant_id: merchantId,
                        currency: currency,
                        amount: amount,
                        user_id: userId,
                        email: userEmail,
                        // Add card saving parameters
                        ...(saveCard && { required_rectoken: "Y" }),
                        ...(verification && { verification: "Y" }),
                        ...(rectoken && { rectoken }),
                    },
                    css_variable: {
                        main: '#7d8ff8',
                        card_bg: '#353535',
                        card_shadow: '#9ADBE8'
                    }
                };

                console.log('Initializing Flitt checkout with options:', options);
                
                if (initializedRef.current) {
                    // Prevent double initialization which can cause DOM removal errors
                    console.log('Flitt checkout already initialized, skipping re-init');
                } else {
                    // Initialize Flitt checkout using element
                    window.checkout(checkoutRef.current, options);
                    initializedRef.current = true;
                }
                
                console.log('Flitt checkout initialized successfully');
                // Once initialized, we are not loading anymore
                setIsLoading(false);

                // Listen for Flitt postMessage events
                const onMessage = (event) => {
                    try {
                        const origin = event.origin || '';
                        if (!/flitt\.com$/i.test(new URL(origin).hostname)) {
                            return; // ignore non-Flitt messages
                        }
                    } catch (_) {
                        // If origin cannot be parsed, ignore
                        return;
                    }

                    const data = event.data;
                    if (!data) return;

                    // Heuristic success detection
                    const isSuccess = (typeof data === 'object') && (
                        data.status === 'success' ||
                        data.event === 'payment.success' ||
                        data.event_type === 'payment.completed' ||
                        Boolean(data.payment_id)
                    );
                    const isError = (typeof data === 'object') && (
                        data.status === 'error' || data.status === 'failed' || data.event === 'payment.failed' || data.error
                    );

                    if (isSuccess) {
                        handlePaymentSuccess(data);
                    } else if (isError) {
                        handlePaymentError(data);
                    }
                };

                window.addEventListener('message', onMessage);

                // Cleanup listener when component unmounts
                cleanupFns.push(() => window.removeEventListener('message', onMessage));
            } catch (err) {
                console.error('Flitt initialization error:', err);
                setError('Failed to initialize payment system. Please try again.');
                setUseFallback(true);
                setIsLoading(false);
            }
        };

        // Add a small delay to ensure DOM is ready
        const cleanupFns = [];
        const timer = setTimeout(() => {
            loadFlittScript();
        }, 100);

        // Hard timeout to avoid endless loading
        const safetyTimeout = setTimeout(() => {
            if (isLoading) {
                setError('Payment form took too long to load. Please retry.');
                setUseFallback(true);
                setIsLoading(false);
            }
        }, 10000);

        // Cleanup function
        return () => {
            clearTimeout(timer);
            clearTimeout(safetyTimeout);
            // Do not clear innerHTML; Flitt manages its DOM and clearing can throw errors
            while (cleanupFns.length) {
                const fn = cleanupFns.pop();
                try { fn && fn(); } catch (_) {}
            }
        };
    }, [amount, currency, merchantId, userId, userEmail, saveCard, verification, rectoken]);

    const handlePaymentSuccess = (paymentData) => {
        setPaymentStatus('success');
        setIsLoading(false);
        if (onPaymentSuccess) {
            onPaymentSuccess(paymentData);
        }
    };

    const handlePaymentError = (errorData) => {
        setPaymentStatus('error');
        setIsLoading(false);
        setError(errorData.message || 'Payment failed');
        if (onPaymentError) {
            onPaymentError(errorData);
        }
    };

    const handlePaymentClick = () => {
        // no-op: loading is managed by script init and checkout flow
        setError(null);
    };

    if (paymentStatus === 'success') {
        return (
            <div className={`bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded ${className}`}>
                <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p>Payment successful! Thank you for your purchase.</p>
                </div>
            </div>
        );
    }

    if (error && !useFallback) {
        return (
            <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded ${className}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p>{error}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => {
                                setError(null);
                                setRetryCount(0);
                                setUseFallback(false);
                                window.location.reload();
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        >
                            Retry Flitt
                        </button>
                        <button
                            onClick={() => {
                                setError(null);
                                setRetryCount(0);
                                setUseFallback(true);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                            Use Alternative Payment
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (useFallback) {
        return (
            <div className={className}>
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p>Using alternative payment method due to Flitt loading issues.</p>
                    </div>
                </div>
                <SimplePaymentForm
                    amount={amount}
                    currency={currency}
                    onPaymentSubmit={handlePaymentSuccess}
                />
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Details</h3>
                <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Amount: <span className="font-semibold">{formatCurrency(amount, currency)}</span></p>
                    <p className="text-sm text-gray-600">Currency: <span className="font-semibold">{currency}</span></p>
                    {verification && (
                        <p className="text-sm text-blue-600 font-semibold">🔒 Card Verification Mode</p>
                    )}
                    {saveCard && !verification && (
                        <p className="text-sm text-green-600 font-semibold">💳 Card will be saved for future payments</p>
                    )}
                    {rectoken && (
                        <p className="text-sm text-purple-600 font-semibold">🔄 Using saved card for payment</p>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <h4 className="text-md font-medium text-gray-700 mb-3">Secure Payment with Flitt</h4>
                <div 
                    ref={checkoutRef}
                    id="checkout-container"
                    className="min-h-[200px] border border-gray-200 rounded-lg p-4 bg-gray-50"
                    onClick={handlePaymentClick}
                >
                    {isLoading && (
                        <div className="flex items-center justify-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-2 text-gray-600">Loading payment form...</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-xs text-gray-500 text-center">
                <p>Powered by Flitt • Secure payment processing</p>
            </div>
        </div>
    );
};

export default FlittPayment;
