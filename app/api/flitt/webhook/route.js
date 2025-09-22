import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        
        // Verify webhook signature if Flitt provides one
        const signature = request.headers.get('x-flitt-signature');
        
        // Log the webhook for debugging
        console.log('Flitt webhook received:', body);
        
        // Process different webhook events
        switch (body.event_type) {
            case 'payment.completed':
                await handlePaymentCompleted(body);
                break;
            case 'payment.failed':
                await handlePaymentFailed(body);
                break;
            case 'payment.refunded':
                await handlePaymentRefunded(body);
                break;
            default:
                console.log('Unknown webhook event type:', body.event_type);
        }

        return NextResponse.json({ received: true });

    } catch (error) {
        console.error('Flitt webhook error:', error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}

async function handlePaymentCompleted(paymentData) {
    try {
        // Forward to your backend
        const response = await fetch('https://lineup.dahk.am/api/flitt/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_type: 'payment.completed',
                payment_data: paymentData,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            console.error('Failed to forward payment completed webhook');
        }
    } catch (error) {
        console.error('Error handling payment completed:', error);
    }
}

async function handlePaymentFailed(paymentData) {
    try {
        // Forward to your backend
        const response = await fetch('https://lineup.dahk.am/api/flitt/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_type: 'payment.failed',
                payment_data: paymentData,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            console.error('Failed to forward payment failed webhook');
        }
    } catch (error) {
        console.error('Error handling payment failed:', error);
    }
}

async function handlePaymentRefunded(paymentData) {
    try {
        // Forward to your backend
        const response = await fetch('https://lineup.dahk.am/api/flitt/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_type: 'payment.refunded',
                payment_data: paymentData,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            console.error('Failed to forward payment refunded webhook');
        }
    } catch (error) {
        console.error('Error handling payment refunded:', error);
    }
}