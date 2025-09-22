"use client";
import { useState, useEffect } from "react";
import { getCookie } from "@/utils/utils";

export default function ApplePayButton({ amount = 30, currency = "GEL" }) {
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const authToken = getCookie('authToken');
  const userData = authToken ? JSON.parse(authToken) : null;
  const userId = userData?.user_id;

  useEffect(() => {
    // Check if Apple Pay is available
    if (typeof window !== 'undefined' && window.ApplePaySession && ApplePaySession.canMakePayments()) {
      setIsAvailable(true);
    }
  }, []);

  const handleApplePay = async () => {
    if (!isAvailable) {
      alert('Apple Pay is not available on this device');
      return;
    }

    setLoading(true);
    
    try {
      const paymentRequest = {
        countryCode: "GE",
        currencyCode: currency,
        supportedNetworks: ["visa", "masterCard", "amex"],
        merchantCapabilities: ["supports3DS"],
        total: { 
          label: "Lineup.ge", 
          amount: amount.toString() 
        },
      };

      const session = new ApplePaySession(3, paymentRequest);

      // Step 1: Merchant validation
      session.onvalidatemerchant = async (event) => {
        try {
          const response = await fetch("/api/applepay/validate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ validationURL: event.validationURL }),
          });
          
          if (!response.ok) {
            throw new Error('Validation failed');
          }
          
          const merchantSession = await response.json();
          session.completeMerchantValidation(merchantSession);
        } catch (error) {
          console.error('Merchant validation error:', error);
          session.abort();
        }
      };

      // Step 2: Payment authorized
      session.onpaymentauthorized = async (event) => {
        try {
          const response = await fetch("/api/applepay/pay", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...event.payment,
              user_id: userId,
              amount: amount,
              currency: currency
            }),
          });
          
          const result = await response.json();
          
          if (result.success) {
            session.completePayment(ApplePaySession.STATUS_SUCCESS);
            // Redirect to success page or show success message
            window.location.href = '/thankyou';
          } else {
            session.completePayment(ApplePaySession.STATUS_FAILURE);
            alert('Payment failed. Please try again.');
          }
        } catch (error) {
          console.error('Payment processing error:', error);
          session.completePayment(ApplePaySession.STATUS_FAILURE);
          alert('Payment failed. Please try again.');
        }
      };

      // Handle session events
      session.oncancel = () => {
        console.log('Apple Pay session cancelled');
        setLoading(false);
      };

      session.onerror = (event) => {
        console.error('Apple Pay session error:', event);
        alert('An error occurred with Apple Pay. Please try again.');
        setLoading(false);
      };

      // Begin the Apple Pay session
      session.begin();
      
    } catch (error) {
      console.error('Apple Pay error:', error);
      alert('Failed to initialize Apple Pay. Please try again.');
      setLoading(false);
    }
  };

  if (!isAvailable) {
    return null; // Don't render button if Apple Pay is not available
  }

  return (
    <div className="apple-pay-container">
      {loading ? (
        <div 
          className="apple-pay-loading"
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: 0.7
          }}
        >
          <div className="spinner" style={{
            width: '20px',
            height: '20px',
            border: '2px solid #fff',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Processing...
        </div>
      ) : (
        <apple-pay-button
          buttonstyle="black"
          buttontype="pay"
          locale="en"
          onClick={handleApplePay}
          style={{
            width: '100%',
            height: '50px',
            borderRadius: '8px'
          }}
        ></apple-pay-button>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        apple-pay-button {
          --apple-pay-button-width: 100%;
          --apple-pay-button-height: 50px;
          --apple-pay-button-border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
