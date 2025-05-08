"use client"
import React, { useEffect, useState } from "react";
import { getCookie } from "@/utils/utils";

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

        const response = await fetch(`/api/payments?userId=${userId}`, {
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

  return (
    <div className="bg-[#232222] pt-[160px] pb-[100px]">
      <div className='container m-auto bg-[#D9D9D91A] p-[20px] rounded-2xl border-t-2 border-[#BF3206] h-auto'>
        <div className="flex text-white font-bold mb-[50px]">
          <div className='w-full'>
            <h2 className='text-2xl text-[#C7C7C7]'>{dict.payment_history || 'Payment History'}</h2>
          </div>
        </div>

        {loading ? (
          <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-white'>
            <p className='ml-5'>{dict.loading || 'Loading payment history...'}</p>
          </div>
        ) : error ? (
          <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-red-500'>
            <p className='ml-5'>{error}</p>
          </div>
        ) : payments.length === 0 ? (
          <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-white'>
            <p className='ml-5'>{dict.no_payments || 'No payment history found'}</p>
          </div>
        ) : (
          <div className="content">
            {payments.map((payment) => (
              <div key={payment.id} className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-white'>
                <div className='ml-5 flex items-center justify-between w-full pr-5'>
                  <div className="flex items-center space-x-8">
                    <span className="text-[#C7C7C7]">{dict.order_id || 'Order ID'}: {payment.order_id}</span>
                    <span className="text-[#C7C7C7]">{dict.amount || 'Amount'}: ${payment.amount}</span>
                    <span className="text-[#C7C7C7]">{dict.date || 'Date'}: {new Date(payment.create_time).toLocaleString()}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    payment.status === 'COMPLETED' 
                      ? 'bg-[#4CAF50] text-white' 
                      : 'bg-[#FFC107] text-black'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory; 