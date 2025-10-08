import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/send-mail';

export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, paymentData, amount, rectoken, consentAgreed, paymentType, verificationMode, saveCard, coverLetter } = body;

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
                timestamp: new Date().toISOString(),
                // Optional metadata
                payment_type: paymentType || 'subscription',
                verification_mode: Boolean(verificationMode),
                save_card: Boolean(saveCard),
                cover_letter: coverLetter || null,
                // Tokenization & consent flags
                rectoken: rectoken || paymentData?.rectoken || null,
                subscription_consent: Boolean(consentAgreed)
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || "Failed to process payment" },
                { status: response.status }
            );
        }

        // Try to send a confirmation email (non-blocking)
        try {
            if (userEmail || paymentData?.email) {
                await sendMail({
                    email: userEmail || paymentData?.email,
                    subject: 'Payment received',
                    text: `We have received your payment of ${(Number(amount)/100).toFixed(2)} GEL. Thank you!`,
                    html: `<p>We have received your payment of <strong>${(Number(amount)/100).toFixed(2)} GEL</strong>. Thank you!</p>`
                });
            }
        } catch (_) {
            // Ignore email errors
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
