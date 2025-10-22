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
    console.log("Webhook received, sending fetch request to backend...");

    // Just send a simple fetch request to the backend
    try {
      const backendResponse = await fetch(`${flitt.backendUrl}/payment/changeToSuccess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'success',
          timestamp: new Date().toISOString(),
          source: 'webhook'
        })
      });

      if (!backendResponse.ok) {
        console.warn("Failed to send request to backend:", await backendResponse.text());
      } else {
        console.log("Request sent to backend successfully");
      }
    } catch (backendError) {
      console.warn("Backend request failed:", backendError);
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
