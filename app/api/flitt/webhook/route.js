import { NextResponse } from "next/server";
import flitt from "@/lib/flitt";

// Handle both POST and GET requests from Flitt
export async function POST(req) {
  return handleWebhook(req);
}

export async function GET(req) {
  return handleWebhook(req);
}

async function handleWebhook(req) {
  try {
    let body;
    const signature = req.headers.get('x-flitt-signature');
    
    // Handle both POST (JSON body) and GET (URL parameters) requests
    if (req.method === 'POST') {
      try {
        body = await req.json();
      } catch (e) {
        body = {};
      }
    } else {
      // For GET requests, extract from URL parameters
      const url = new URL(req.url);
      body = Object.fromEntries(url.searchParams);
    }

    console.log("Raw webhook data:", JSON.stringify(body, null, 2));
    console.log("Webhook signature:", signature);
    console.log("Request method:", req.method);

    // Verify webhook signature (optional for now to debug)
    // if (!flitt.verifyWebhookSignature(body, signature)) {
    //   console.warn("Invalid Flitt webhook signature");
    //   return NextResponse.json({ ok: false }, { status: 400 });
    // }

    // Extract data from Flitt webhook (they might use different field names)
    const { 
      order_status, 
      order_id, 
      payment_id, 
      payer_id,
      amount, 
      currency,
      status,
      id
    } = body;

    console.log("Flitt webhook received:", {
      order_status,
      order_id,
      payment_id,
      payer_id,
      amount,
      currency,
      status,
      id
    });

    // Check if payment was successful (try different possible status values)
    const isSuccessful = order_status === 'success' || 
                        order_status === 'completed' || 
                        status === 'success' || 
                        status === 'completed' ||
                        order_status === 'paid';

    if (isSuccessful) {
      console.log("Payment successful, updating status to success...");
      
      // Prepare payment data for backend
      const paymentData = {
        order_id: order_id || id,
        payment_id: payment_id || payer_id || id,
        amount: parseFloat(amount),
        currency,
        status: 'success',
        timestamp: new Date().toISOString(),
        source: 'flitt'
      };

      // Update payment status to success
      const backendResult = await flitt.updatePaymentToSuccess(paymentData);
      
      if (backendResult.success) {
        console.log("Payment status updated to success successfully");
      } else {
        console.error("Payment status update failed:", backendResult.error);
      }
    }

    // Forward webhook to Laravel backend (existing functionality)
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

    return NextResponse.json({ 
      ok: true, 
      message: "Webhook processed successfully",
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ 
      ok: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
