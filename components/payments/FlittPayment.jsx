"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CreditCardOutlined, LoadingOutlined } from '@ant-design/icons';

const FlittPayment = ({ 
  userId, 
  userEmail, 
  amount = 30, 
  currency = "GEL", 
  onSuccess, 
  onError,
  className = "" 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);
  const [tokenRefreshAttempts, setTokenRefreshAttempts] = useState(0);


  const createCheckoutUrl = useCallback(async () => {
    try {
      console.log('Creating checkout URL...');
      setTokenRefreshAttempts(prev => prev + 1);
      
      // Add cache-busting parameter to ensure unique requests
      const cacheBuster = Date.now();
      
      const response = await fetch('/api/flitt/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          amount: amount * 100, // Convert to tetri
          currency: currency,
          order_desc: `Payment - ${amount} ${currency} (${cacheBuster})`
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create checkout URL');
      }

      // Validate the checkout URL
      if (!data.checkout_url) {
        throw new Error('No checkout URL received from server');
      }

      console.log('Checkout URL created successfully');
      return data;
    } catch (error) {
      console.error('Error creating checkout URL:', error);
      throw error;
    }
  }, [amount, currency]);

  const redirectToCheckout = useCallback(async (checkoutData) => {
    console.log('Redirecting to Flitt checkout...');
    console.log('Checkout data:', checkoutData);
    
    if (!checkoutData.checkout_url) {
      throw new Error('No checkout URL provided');
    }

    // In development mode with mock data, show success message instead of redirecting
    if (checkoutData.is_mock && process.env.NODE_ENV === 'development') {
      console.log('Development mode: Simulating successful payment');
      // Simulate successful payment
      setTimeout(() => {
        onSuccess?.({
          order_id: checkoutData.order_id,
          amount: amount,
          currency: currency,
          status: 'completed',
          is_mock: true
        });
      }, 1000);
      return;
    }

    // Redirect to Flitt checkout page
    window.location.href = checkoutData.checkout_url;
  }, [amount, currency, onSuccess]);

  // Redirect to checkout when payment data is available
  useEffect(() => {
    if (paymentData && paymentData.checkout_url) {
      console.log('Payment data available, redirecting to checkout...');
      // Small delay to ensure DOM is updated
      const timer = setTimeout(() => {
        redirectToCheckout(paymentData);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [paymentData, redirectToCheckout]);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Create checkout URL
      const checkoutData = await createCheckoutUrl();
      console.log('Checkout data received:', checkoutData);
      setPaymentData(checkoutData);

    } catch (err) {
      console.error('Payment initialization error:', err);
      setError(err.message);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flitt-payment-container ${className}`}>
      {!paymentData ? (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Payment
            </h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Amount:</span>
              <span className="text-xl font-bold text-[#BF3206]">
                {amount} {currency}
              </span>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <span>{error}</span>
                  <button
                    onClick={() => {
                      setError(null);
                      setPaymentData(null);
                    }}
                    className="ml-2 text-red-800 hover:text-red-900 underline text-sm"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full bg-[#BF3206] text-white px-6 py-3 rounded-lg hover:bg-[#a02a05] transition-colors flex items-center justify-center text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <LoadingOutlined className="mr-2" spin />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCardOutlined className="mr-2 text-xl" />
                  {process.env.NODE_ENV === 'development' ? 'Test Payment (Mock)' : 'Pay with Flitt'}
                </>
              )}
            </button>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2 text-center">
                <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                  🧪 Development Mode - Mock Payment
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Redirecting to Payment...
            </h3>
            <div className="text-center text-gray-600 mb-4">
              <p>You will be redirected to Flitt's secure payment page.</p>
              <p className="text-sm mt-2">Please complete your payment there.</p>
            </div>
            
              <div className="text-center py-8">
                <div className="bg-blue-100 border border-blue-300 text-blue-700 px-4 py-3 rounded-lg mb-4">
                <p className="font-semibold">Redirecting to Flitt Payment</p>
                <p className="text-sm">Please wait while we redirect you to the secure payment page.</p>
                </div>
                <button
                  onClick={() => {
                    setPaymentData(null);
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel Payment
                </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlittPayment;

