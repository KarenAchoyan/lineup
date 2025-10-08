import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/send-mail';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, trialEndDate, amount, currency = 'GEL', chargeDate, cancelUrl } = body || {};

        if (!email || !trialEndDate) {
            return NextResponse.json({ error: 'Missing required fields: email, trialEndDate' }, { status: 400 });
        }

        const willCharge = amount != null && chargeDate;
        const amountHuman = willCharge ? (Number(amount) / 100).toFixed(2) : null;
        const subject = 'Your trial period is ending soon';
        const chargeLine = willCharge
            ? `If you do not cancel, ${amountHuman} ${currency} will be charged on ${new Date(chargeDate).toLocaleDateString()}.`
            : 'If you do not cancel, billing will begin after your trial ends.';
        const cancelLine = cancelUrl ? `You can cancel here: ${cancelUrl}` : 'You can cancel from your account settings.';

        const text = `Your trial ends on ${new Date(trialEndDate).toLocaleDateString()}. ${chargeLine} ${cancelLine}`;
        const html = `
            <p>Dear customer,</p>
            <p>Your trial period will end on <strong>${new Date(trialEndDate).toLocaleDateString()}</strong>.</p>
            <p>${chargeLine}</p>
            <p>${cancelLine}</p>
        `;

        const info = await sendMail({ email, subject, text, html });
        if (!info) {
            return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Trial ending notification error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}


