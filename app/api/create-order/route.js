import { NextResponse } from 'next/server';

const CLIENT_ID = "AY7AFCTUPwYOEYbIvVtgA-P7NgncygaIL2aX3a0JcDoq4qTTtJBS-hX4_8On8C-v_jIH7xA5zkTlX5Xl";
const CLIENT_SECRET = "EKEOjL30gW4EkpQ3lGCF7VqPBSpMo-5VA__zUCFzRMA2jYYPiRwFLO7s7tqZ4U0vTtL-Jup15pjchiUj";
const PAYPAL_API_URL ='https://api-m.paypal.com';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const orderID = searchParams.get('orderID');
        const payerID = searchParams.get('payerID');
        const amount = searchParams.get('amount');
        const userEmail = searchParams.get('userEmail');
        const user_id = searchParams.get('user_id');

        // Validate required fields
        if (!orderID || !payerID || !amount || !userEmail) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Process the payment with the query parameters
        return await processPayment({
            orderID,
            payerID,
            amount,
            userEmail,
            user_id,
            status: 'COMPLETED',
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString()
        });
    } catch (error) {
        console.error('Payment processing error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to process payment',
                message: error.message
            },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        let body;
        try {
            body = await request.json();
        } catch (parseError) {
            return NextResponse.json(
                { 
                    error: 'Invalid JSON payload',
                    message: parseError.message 
                },
                { status: 400 }
            );
        }

        const { 
            orderID, 
            payerID, 
            amount, 
            userEmail, 
            status, 
            createTime, 
            updateTime,
            user_id
        } = body;

        // Validate required fields
        if (!orderID || !payerID || !amount || !userEmail) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        return await processPayment(body);
    } catch (error) {
        console.error('Payment processing error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to process payment',
                message: error.message
            },
            { status: 500 }
        );
    }
}

async function processPayment(paymentData) {
    const { orderID, payerID, amount, userEmail, status, createTime, updateTime, user_id } = paymentData;

    let paypalResponse;
    try {
        paypalResponse = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
            }
        });
    } catch (fetchError) {
        console.error('PayPal API request failed:', fetchError);
        return NextResponse.json(
            { 
                error: 'Failed to connect to PayPal API',
                message: fetchError.message
            },
            { status: 503 }
        );
    }

    if (!paypalResponse.ok) {
        const paypalError = await paypalResponse.json();
        console.error('PayPal verification failed:', paypalError);
        return NextResponse.json(
            { 
                error: 'Failed to verify payment with PayPal',
                details: paypalError
            },
            { status: 400 }
        );
    }

    let paypalData;
    try {
        paypalData = await paypalResponse.json();
    } catch (parseError) {
        console.error('Failed to parse PayPal response:', parseError);
        return NextResponse.json(
            { 
                error: 'Invalid response from PayPal',
                message: parseError.message
            },
            { status: 502 }
        );
    }

    console.log('PayPal verification successful:', paypalData);

    // Send payment data to Laravel backend
    console.log('Sending data to Laravel backend...');
    let response;
    try {
        response = await fetch(`https://lineup.dahk.am/api/paypal/order`, {
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
                user_id,
                paypal_data: paypalData
            }),
        });
    } catch (fetchError) {
        console.error('Laravel API request failed:', fetchError);
        return NextResponse.json(
            { 
                error: 'Failed to connect to backend service',
                message: fetchError.message
            },
            { status: 503 }
        );
    }

    let laravelResponse;
    try {
        laravelResponse = await response.json();
    } catch (parseError) {
        console.error('Failed to parse Laravel response:', parseError);
        return NextResponse.json(
            { 
                error: 'Invalid response from backend service',
                message: parseError.message
            },
            { status: 502 }
        );
    }

    if (!response.ok) {
        console.error('Laravel API error:', laravelResponse);
        return NextResponse.json(
            { 
                error: 'Failed to process payment', 
                details: laravelResponse 
            },
            { status: 500 }
        );
    }

    console.log('Payment processed successfully:', laravelResponse);
    return NextResponse.json({ 
        message: 'Payment processed successfully', 
        data: laravelResponse 
    });
}
