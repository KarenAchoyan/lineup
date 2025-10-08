import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/send-mail';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, amount, currency = 'GEL', chargeDate, frequency = 'monthly' } = body || {};

        if (!email || !amount || !chargeDate) {
            return NextResponse.json({ error: 'Missing required fields: email, amount, chargeDate' }, { status: 400 });
        }

        const amountHuman = (Number(amount) / 100).toFixed(2);
        const subject = `Upcoming ${frequency} charge notice`;
        const text = `We will charge ${amountHuman} ${currency} on ${new Date(chargeDate).toLocaleDateString()} as part of your ${frequency} subscription.`;
        const html = `
            <p>Dear customer,</p>
            <p>This is a reminder that <strong>${amountHuman} ${currency}</strong> will be charged on <strong>${new Date(chargeDate).toLocaleDateString()}</strong> as part of your <strong>${frequency}</strong> subscription.</p>
            <p>If you have questions or wish to cancel, please visit your account settings.</p>
        `;

        const info = await sendMail({ email, subject, text, html });
        if (!info) {
            return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Upcoming charge notification error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}


