import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, paymentData, amount } = body;

        if (!userId || !paymentData || !amount) {
            return NextResponse.json(
                { error: "Missing required fields: userId, paymentData, amount" },
                { status: 400 }
            );
        }

        // Here you would typically:
        // 1. Verify the payment with Flitt API
        // 2. Update your database with payment information
        // 3. Activate user subscription

        // For now, we'll forward the request to your existing backend
        const response = await fetch('https://lineup.dahk.am/api/paypal/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': request.headers.get('Authorization') || ''
            },
            body: JSON.stringify({
                user_id: userId,
                payment_data: paymentData,
                amount: amount,
                currency: 'GEL',
                payment_method: 'flitt',
                timestamp: new Date().toISOString()
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || "Failed to process payment" },
                { status: response.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Payment processed successfully",
            data: data
        });

    } catch (error) {
        console.error('Flitt payment success error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
