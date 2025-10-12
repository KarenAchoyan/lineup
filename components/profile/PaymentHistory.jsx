"use client";
import React, { useEffect, useState } from "react";
import { getCookie } from "@/utils/utils";
import { CreditCardOutlined, CalendarOutlined, CheckCircleOutlined } from "@ant-design/icons";

const PaymentHistory = ({ dict }) => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const authToken = getCookie('authToken');
        if (!authToken) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        const userData = JSON.parse(authToken);
        const userId = userData?.user_id;

        if (!userId) {
          setError("User not found");
          setLoading(false);
          return;
        }

        // Fetch from Laravel backend
        const response = await fetch(`https://lineup.dahk.am/api/payments/${userId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }

        const data = await response.json();
        setPayments(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const formatAmount = (amount, currency = 'GEL') => {
    return `${amount} ${currency}`;
  };

  return (
    <div className="bg-[#232222] pt-[160px] pb-[100px]">
      <div className='container m-auto bg-[#D9D9D91A] p-[20px] rounded-2xl border-t-2 border-[#BF3206] h-auto'>
        <div className="flex text-white font-bold mb-[50px]">
          <div className='w-full'>
            <h2 className='text-2xl text-[#C7C7C7]'>
              <CreditCardOutlined className="mr-2" />
              {dict.payment_history || 'Payment History'}
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BF3206]"></div>
            <span className="ml-3 text-[#C7C7C7]">Loading payments...</span>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
            <p>{error}</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 px-4 py-3 rounded-lg">
            <p>No payment history found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment, index) => (
              <div key={payment.id || index} className="bg-[#4d4c4c2b] rounded-lg p-4 border border-[#C7C7C7]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircleOutlined className="text-green-500 text-xl" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {payment.description || 'Monthly Subscription'}
                      </h3>
                      <div className="flex items-center text-[#C7C7C7] text-sm">
                        <CalendarOutlined className="mr-1" />
                        {formatDate(payment.create_time || payment.created_at)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#BF3206]">
                      {formatAmount(payment.amount, payment.currency)}
                    </div>
                    <div className="text-sm text-[#C7C7C7]">
                      Status: <span className="text-green-400 font-semibold capitalize">
                        {payment.status || 'Completed'}
                      </span>
                    </div>
                    {payment.payer_id && (
                      <div className="text-xs text-[#C7C7C7] mt-1">
                        Transaction ID: {payment.payer_id}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-[#C7C7C7]">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">Payment Information</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• All payments are processed securely through Flitt</li>
              <li>• You will receive email confirmations for each payment</li>
              <li>• Payment history is updated in real-time</li>
              <li>• Contact support if you have any questions about your payments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;

