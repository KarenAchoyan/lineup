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
  const [isWidgetLoading, setIsWidgetLoading] = useState(false);
  const paymentContainerRef = useRef(null);
  const [resetKey, setResetKey] = useState(0);
  const [flittContainer, setFlittContainer] = useState(null);
  const [useExternalWidget, setUseExternalWidget] = useState(false);
  const [tokenRefreshAttempts, setTokenRefreshAttempts] = useState(0);

  // Load Flitt checkout script
  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="https://pay.flitt.com/latest/checkout-vue/checkout.js"]');
    if (existingScript) {
      console.log('Flitt checkout script already loaded');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://pay.flitt.com/latest/checkout-vue/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Flitt checkout script loaded successfully');
      console.log('window.checkout available:', typeof window.checkout);
    };
    script.onerror = (error) => {
      console.error('Failed to load Flitt checkout script:', error);
      setError('Failed to load payment system. Please check your internet connection and try again.');
    };
    document.head.appendChild(script);

    // Check if CSS is already loaded
    const existingLink = document.querySelector('link[href="https://pay.flitt.com/latest/checkout-vue/checkout.css"]');
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://pay.flitt.com/latest/checkout-vue/checkout.css';
      link.onerror = (error) => {
        console.warn('Failed to load Flitt CSS:', error);
      };
      document.head.appendChild(link);
    }

    // No cleanup needed - let the scripts persist for the session
  }, []);

  const refreshPaymentToken = useCallback(async () => {
    try {
      console.log('Refreshing payment token...');
      setTokenRefreshAttempts(prev => prev + 1);
      
      // Add cache-busting parameter to ensure unique requests
      const cacheBuster = Date.now();
      
      const response = await fetch('/api/flitt/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 30,
          currency: 'GEL',
          user_id: userId,
          user_email: userEmail,
          description: `Monthly subscription payment - 30 GEL (${cacheBuster})`,
          timestamp: cacheBuster // Add timestamp to ensure uniqueness
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to refresh payment token');
      }

      // Validate the new token
      if (!data.data.token || data.data.token.length !== 40) {
        throw new Error(`Invalid refreshed token: expected 40 characters, got ${data.data.token?.length || 0}`);
      }

      console.log('Payment token refreshed successfully');
      return data.data;
    } catch (error) {
      console.error('Error refreshing payment token:', error);
      throw error;
    }
  }, [userId, userEmail]);

  const initializeFlittCheckout = useCallback(async (paymentData) => {
    console.log('Attempting to initialize Flitt checkout...');
    console.log('window.checkout available:', typeof window.checkout);
    console.log('Payment data:', paymentData);
    
    if (window.checkout) {
      // Fix Flitt API configuration based on validation errors
      const options = {
        params: {
          merchant_id: parseInt(paymentData.merchant_id), // Must be integer
          token: paymentData.token // Must be exactly 40 characters
        }
      };

      // Validate token length (must be exactly 40 characters)
      if (!paymentData.token || paymentData.token.length !== 40) {
        throw new Error(`Invalid payment token: must be exactly 40 characters, got ${paymentData.token?.length || 0}`);
      }

      // Validate merchant_id is an integer
      if (!Number.isInteger(parseInt(paymentData.merchant_id))) {
        throw new Error(`Invalid merchant ID: must be an integer, got ${paymentData.merchant_id}`);
      }

      // Check if token might be expired (basic validation)
      const tokenAge = Date.now() - (paymentData.created_at ? new Date(paymentData.created_at).getTime() : 0);
      const maxTokenAge = 15 * 60 * 1000; // 15 minutes in milliseconds
      
      if (tokenAge > maxTokenAge) {
        console.warn('Payment token may be expired, age:', Math.round(tokenAge / 1000), 'seconds');
        // Don't throw error here, let Flitt handle it and show user-friendly message
      }

      console.log('Flitt checkout options:', options);

      // Create external widget that exists completely outside React's DOM tree
      setIsWidgetLoading(true);
      
      try {
        // Create a container that exists outside of React's component tree
        const externalContainer = document.createElement('div');
        externalContainer.style.position = 'fixed';
        externalContainer.style.top = '50%';
        externalContainer.style.left = '50%';
        externalContainer.style.transform = 'translate(-50%, -50%)';
        externalContainer.style.width = '600px';
        externalContainer.style.height = '500px';
        externalContainer.style.backgroundColor = 'white';
        externalContainer.style.border = '2px solid #BF3206';
        externalContainer.style.borderRadius = '12px';
        externalContainer.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        externalContainer.style.zIndex = '9999';
        externalContainer.setAttribute('data-flitt-external-widget', 'true');
        
        // Add a unique ID to prevent conflicts
        externalContainer.id = `flitt-external-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '15px';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#BF3206';
        closeButton.onclick = () => {
          document.body.removeChild(externalContainer);
          setUseExternalWidget(false);
          setPaymentData(null);
        };
        externalContainer.appendChild(closeButton);
        
        // Add title
        const title = document.createElement('h3');
        title.textContent = 'Complete Your Payment';
        title.style.margin = '20px';
        title.style.color = '#BF3206';
        title.style.textAlign = 'center';
        externalContainer.appendChild(title);
        
        // Create the actual widget container
        const widgetContainer = document.createElement('div');
        widgetContainer.style.width = '100%';
        widgetContainer.style.height = 'calc(100% - 80px)';
        widgetContainer.style.padding = '20px';
        widgetContainer.style.boxSizing = 'border-box';
        externalContainer.appendChild(widgetContainer);
        
        // Add to document body (completely outside React)
        document.body.appendChild(externalContainer);
        
        // Initialize Flitt in the external container with error handling
        try {
          window.checkout(widgetContainer, options);
          console.log('Flitt checkout initialized successfully in external widget');
        } catch (flittError) {
          console.error('Flitt checkout initialization error:', flittError);
          
          // Check for specific Flitt errors
          if (flittError.message && (flittError.message.includes('2006') || flittError.message.includes('Срок'))) {
            // Token expired - try to refresh it automatically
            if (tokenRefreshAttempts < 2) {
              console.log('Token expired, attempting to refresh...');
              try {
                const newPaymentData = await refreshPaymentToken();
                // Retry with new token
                setTimeout(() => {
                  initializeFlittCheckout(newPaymentData);
                }, 1000);
                return;
              } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                throw new Error('Payment token has expired and could not be refreshed. Please try again by clicking "Pay with Flitt" button.');
              }
            } else {
              throw new Error('Payment token has expired. Please try again by clicking "Pay with Flitt" button.');
            }
          } else {
            throw flittError;
          }
        }
        
        // Store the external container reference for cleanup
        setFlittContainer(externalContainer);
        setUseExternalWidget(true);
        
        // Wait a moment for the widget to render
        setTimeout(() => {
          setIsWidgetLoading(false);
        }, 2000);
        
      } catch (checkoutError) {
        console.error('Error creating external Flitt widget:', checkoutError);
        setIsWidgetLoading(false);
        setError('Failed to create payment form: ' + checkoutError.message);
      }
    } else {
      console.error('Flitt checkout function not available');
      setError('Flitt payment system not loaded. Please refresh the page and try again.');
    }
  }, []);

  // Initialize Flitt checkout when payment data is available
  useEffect(() => {
    if (paymentData && window.checkout) {
      // Small delay to ensure DOM is updated
      const timer = setTimeout(() => {
        initializeFlittCheckout(paymentData);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [paymentData, initializeFlittCheckout]);

  // Global error handler for DOM manipulation errors
  useEffect(() => {
    const handleGlobalError = (event) => {
      if (event.error && event.error.message && event.error.message.includes('removeChild')) {
        console.warn('Caught DOM manipulation error, ignoring:', event.error.message);
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleGlobalError);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleGlobalError);
    };
  }, []);

  // Cleanup effect to prevent DOM manipulation errors
  useEffect(() => {
    return () => {
      // Use a timeout to let React finish its cleanup first
      setTimeout(() => {
        try {
          // Find and remove any external Flitt widgets that might exist
          const externalWidgets = document.querySelectorAll('[data-flitt-external-widget="true"]');
          externalWidgets.forEach(widget => {
            if (widget && widget.parentNode) {
              try {
                widget.parentNode.removeChild(widget);
              } catch (removeError) {
                console.warn('Error removing external Flitt widget:', removeError);
              }
            }
          });
          
          // Also clear the React container if it exists
          if (paymentContainerRef.current) {
            try {
              paymentContainerRef.current.innerHTML = '';
            } catch (clearError) {
              console.warn('Error clearing payment container:', clearError);
            }
          }
        } catch (error) {
          console.warn('Error during cleanup:', error);
        }
      }, 100); // Small delay to let React finish
    };
  }, []);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Create order token with cache-busting
      const cacheBuster = Date.now();
      
      const response = await fetch('/api/flitt/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: currency,
          user_id: userId,
          user_email: userEmail,
          description: `Monthly subscription payment - ${amount} ${currency} (${cacheBuster})`,
          timestamp: cacheBuster // Add timestamp to ensure uniqueness
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create payment order');
      }

      // Validate the response data
      if (!data.data) {
        throw new Error('Invalid payment data received from server');
      }

      if (!data.data.token || data.data.token.length !== 40) {
        throw new Error(`Invalid payment token received: expected 40 characters, got ${data.data.token?.length || 0}`);
      }

      if (!data.data.merchant_id) {
        throw new Error('Missing merchant ID in payment data');
      }

      console.log('Payment data validated successfully:', data.data);
      setPaymentData(data.data);

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
              Monthly Subscription Payment
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
                      setFlittContainer(null);
                      setResetKey(prev => prev + 1);
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
                  Pay with Flitt
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Complete Your Payment
            </h3>
            <div className="text-center text-gray-600 mb-4">
              {useExternalWidget ? (
                <div>
                  <p>Payment window opened in a popup.</p>
                  <p className="text-sm mt-2">If you don't see the payment form, please check for popup blockers.</p>
                </div>
              ) : (
                <p>Please complete the payment using the form below</p>
              )}
            </div>
            
            {useExternalWidget ? (
              <div className="text-center py-8">
                <div className="bg-blue-100 border border-blue-300 text-blue-700 px-4 py-3 rounded-lg mb-4">
                  <p className="font-semibold">Payment window is open</p>
                  <p className="text-sm">Complete your payment in the popup window above.</p>
                </div>
                <button
                  onClick={() => {
                    // Close any external widgets
                    const externalWidgets = document.querySelectorAll('[data-flitt-external-widget="true"]');
                    externalWidgets.forEach(widget => {
                      if (widget && widget.parentNode) {
                        widget.parentNode.removeChild(widget);
                      }
                    });
                    setUseExternalWidget(false);
                    setPaymentData(null);
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel Payment
                </button>
              </div>
            ) : (
              <div 
                ref={paymentContainerRef}
                key={`payment-container-${resetKey}`}
                className="min-h-[400px] border rounded-lg p-4 relative"
                suppressHydrationWarning={true}
              >
                {isWidgetLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-lg z-10">
                    <div className="text-center">
                      <LoadingOutlined className="text-2xl text-[#BF3206] mb-2" spin />
                      <p className="text-gray-600">Loading payment form...</p>
                    </div>
                  </div>
                )}
                
                {/* Fallback content when widget fails to load */}
                {!isWidgetLoading && !flittContainer && (
                  <div className="text-center text-gray-500 py-8">
                    <p className="mb-4">Payment form is loading...</p>
                    <p className="text-sm">If the form doesn't appear, please:</p>
                    <ul className="text-sm mt-2 space-y-1">
                      <li>• Check your internet connection</li>
                      <li>• Refresh the page and try again</li>
                      <li>• Contact support if the issue persists</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlittPayment;

