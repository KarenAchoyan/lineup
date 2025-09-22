import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const paymentData = await request.json();

        if (!paymentData) {
            return NextResponse.json(
                { error: 'Payment data is required' },
                { status: 400 }
            );
        }

        // Extract payment information
        const { 
            token: { 
                paymentData: encryptedPaymentData,
                paymentMethod: { 
                    displayName, 
                    network, 
                    type 
                },
                transactionIdentifier 
            },
            billingContact,
            shippingContact
        } = paymentData;

        // In a real implementation, you would:
        // 1. Decrypt the payment data using your private key
        // 2. Process the payment with your payment processor
        // 3. Store the transaction details
        // 4. Send confirmation to your backend

        // For now, we'll simulate a successful payment
        const orderId = `APPLE_PAY_${Date.now()}_${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
        
        // Send payment data to Laravel backend (similar to PayPal integration)
        try {
            const laravelResponse = await fetch(`${process.env.LARAVEL_API_URL}/api/applepay/process`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}`
                },
                body: JSON.stringify({
                    order_id: orderId,
                    transaction_identifier: transactionIdentifier,
                    payment_method: {
                        displayName,
                        network,
                        type
                    },
                    encrypted_payment_data: encryptedPaymentData,
                    billing_contact: billingContact,
                    shipping_contact: shippingContact,
                    amount: 30, // Default amount in GEL
                    currency: 'GEL',
                    status: 'COMPLETED',
                    create_time: new Date().toISOString(),
                    update_time: new Date().toISOString()
                })
            });

            if (!laravelResponse.ok) {
                console.error('Laravel API error:', await laravelResponse.text());
                return NextResponse.json(
                    { success: false, error: 'Payment processing failed' },
                    { status: 500 }
                );
            }

            const laravelData = await laravelResponse.json();
            console.log('Apple Pay payment processed successfully:', laravelData);

            return NextResponse.json({ 
                success: true, 
                orderId,
                message: 'Payment processed successfully',
                data: laravelData
            });

        } catch (backendError) {
            console.error('Backend processing error:', backendError);
            return NextResponse.json(
                { success: false, error: 'Failed to process payment with backend' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Apple Pay payment error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process payment' },
            { status: 500 }
        );
    }
}
