import { NextResponse } from 'next/server';

const CLIENT_ID = "AY7AFCTUPwYOEYbIvVtgA-P7NgncygaIL2aX3a0JcDoq4qTTtJBS-hX4_8On8C-v_jIH7xA5zkTlX5Xl";
const CLIENT_SECRET = "EKEOjL30gW4EkpQ3lGCF7VqPBSpMo-5VA__zUCFzRMA2jYYPiRwFLO7s7tqZ4U0vTtL-Jup15pjchiUj";
const PAYPAL_API_URL ='https://api-m.paypal.com';


export async function POST(request) {
    try {
        const body = await request.json();
        const { 
            orderID, 
            payerID, 
            amount, 
            userEmail, 
            status, 
            createTime, 
            updateTime
        } = body;

        // Log incoming request data
        console.log('Received payment request:', {
            orderID,
            payerID,
            amount,
            userEmail,
            status
        });

        // Validate required fields
        if (!orderID || !payerID || !amount || !userEmail) {
            console.error('Missing required fields:', { orderID, payerID, amount, userEmail });
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Verify the payment with PayPal
        console.log('Verifying payment with PayPal...');
        const paypalResponse = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
            }
        });

        if (!paypalResponse.ok) {
            const paypalError = await paypalResponse.json();
            console.error('PayPal verification failed:', paypalError);
            return NextResponse.json(
                { error: 'Failed to verify payment with PayPal' },
                { status: 400 }
            );
        }

        const paypalData = await paypalResponse.json();
        console.log('PayPal verification successful:', paypalData);

        // Send payment data to Laravel backend
        console.log('Sending data to Laravel backend...');
        const response = await fetch(`https://lineup.dahk.am/api/paypal/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}`
            },
            body: JSON.stringify({
                order_id: orderID,
                payer_id: payerID,
                amount,
                email: userEmail,
                status,
                create_time: createTime,
                update_time: updateTime,
                paypal_data: paypalData
            }),
        });

        const laravelResponse = await response.json();

        if (!response.ok) {
            console.error('Laravel API error:', laravelResponse);
            return NextResponse.json(
                { error: 'Failed to process payment', details: laravelResponse },
                { status: 500 }
            );
        }

        console.log('Payment processed successfully:', laravelResponse);
        return NextResponse.json({ 
            message: 'Payment processed successfully', 
            data: laravelResponse 
        });
    } catch (error) {
        console.error('Payment processing error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to process payment',
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}
