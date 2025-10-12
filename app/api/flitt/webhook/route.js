import { NextResponse } from "next/server";
import flitt from "@/lib/flitt";

export async function POST(req) {
  try {
    const body = await req.json();
    const signature = req.headers.get('x-flitt-signature');

    // Verify webhook signature
    if (!flitt.verifyWebhookSignature(body, signature)) {
      console.warn("Invalid Flitt webhook signature");
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const { order_status, order_id, payment_id, amount, currency } = body;

    console.log("Flitt webhook received:", {
      order_status,
      order_id,
      payment_id,
      amount,
      currency
    });

    // Forward webhook to Laravel backend
    try {
      const backendResponse = await fetch(`${flitt.backendUrl}/flitt/webhook`, {
        method: 'GET', // Your Laravel route uses GET
        headers: {
          'Content-Type': 'application/json',
        },
        // Since your Laravel route uses GET, we'll pass the data as query params
        // or you might need to modify your Laravel route to accept POST with body
      });

      if (!backendResponse.ok) {
        console.warn("Failed to forward webhook to backend:", await backendResponse.text());
      } else {
        console.log("Webhook successfully forwarded to backend");
      }
    } catch (backendError) {
      console.warn("Backend webhook forwarding failed:", backendError);
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ 
      ok: false, 
      error: error.message 
    }, { status: 500 });
  }
}
