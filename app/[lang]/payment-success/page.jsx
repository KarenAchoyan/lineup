"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircleOutlined, HomeOutlined } from '@ant-design/icons';

export default function PaymentSuccessPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get payment details from URL parameters
    const orderId = searchParams.get('order_id');
    const amount = searchParams.get('amount');
    const currency = searchParams.get('currency');
    const status = searchParams.get('status');

    if (orderId && amount && currency) {
      setPaymentDetails({
        orderId,
        amount,
        currency,
        status: status || 'success'
      });
    }
    
    setLoading(false);
  }, [searchParams]);

  const lang = params?.lang || "en";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#232222] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BF3206]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#232222] pt-[160px] pb-[100px]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-[#D9D9D91A] rounded-2xl border-t-2 border-[#BF3206] p-8">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <CheckCircleOutlined className="text-6xl text-green-500" />
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-white mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-xl text-[#C7C7C7] mb-6">
              Thank you for your payment. Your subscription has been activated.
            </p>

            {/* Payment Details */}
            {paymentDetails && (
              <div className="bg-[#4d4c4c2b] rounded-lg p-6 mb-6 text-left">
                <h3 className="text-lg font-semibold text-white mb-4">Payment Details</h3>
                <div className="space-y-2 text-[#C7C7C7]">
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-mono">{paymentDetails.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-semibold text-[#BF3206]">
                      {paymentDetails.amount} {paymentDetails.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-400 font-semibold capitalize">
                      {paymentDetails.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">What's Next?</h4>
              <ul className="text-blue-700 text-left space-y-1">
                <li>• Your payment has been processed successfully</li>
                <li>• You now have access to all premium features</li>
                <li>• You will receive a confirmation email shortly</li>
                <li>• Your subscription is active for this month</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push(`/${lang}/profile`)}
                className="bg-[#BF3206] text-white px-6 py-3 rounded-lg hover:bg-[#a02a05] transition-colors flex items-center justify-center font-medium"
              >
                <HomeOutlined className="mr-2" />
                Go to Profile
              </button>
              
              <button
                onClick={() => router.push(`/${lang}`)}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center font-medium"
              >
                <HomeOutlined className="mr-2" />
                Back to Home
              </button>
            </div>

            {/* Support Info */}
            <div className="mt-8 pt-6 border-t border-[#C7C7C7]">
              <p className="text-[#C7C7C7] text-sm">
                Need help? Contact our support team or check your email for detailed information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

