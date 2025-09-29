import { NextResponse } from "next/server";
import crypto from "crypto";
import FlittPay from "@flittpayments/flitt-node-js-sdk";

export async function POST(request) {
  try {
    const { 
      amount, 
      currency, 
      order_id, 
      order_desc, 
      user_id, 
      userEmail,
      rectoken
    } = await request.json();

    if (!amount || !currency || !rectoken) {
      return NextResponse.json(
        { error: "Missing required fields: amount, currency, and rectoken are required" },
        { status: 400 }
      );
    }

    // Normalize/prepare values
    const merchantId = process.env.FLITT_MERCHANT_ID || "4054488";
    const secretKey = process.env.FLITT_SECRET_KEY || "wYdSnGkTGhQUqBWhEhilf7j9tOIdKFze";
    const merchantUrl = "https://www.lineup.ge";

    const normalizedAmount = Number(amount);
    if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const currencyCode = String(currency || "GEL").toUpperCase();
    const amountString = currencyCode === "GEL"
      ? String(Math.round(normalizedAmount))
      : normalizedAmount.toFixed(2);

    // Ensure order id and description validity
    const generatedOrderId = `LINEUP-REC-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const finalOrderId = String(order_id || generatedOrderId).replace(/[^A-Z0-9-_]/gi, "").slice(0, 64);
    const finalOrderDesc = String(order_desc || "Recurring Payment").slice(0, 250);

    const signatureString = `${merchantId}|${amountString}|${currencyCode}|${secretKey}`;
    const signature = crypto.createHash("sha1").update(signatureString).digest("hex");
    const callbackQuery = new URLSearchParams({
      ...(user_id ? { user_id: String(user_id) } : {}),
      ...(userEmail ? { email: String(userEmail) } : {}),
      order_id: finalOrderId,
    }).toString();

    // Create order in Laravel backend
    const response = await fetch(`https://lineup.dahk.am/api/paypal/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}`
      },
      body: JSON.stringify({
        order_id: finalOrderId,
        payer_id: 123,
        amount,
        email: userEmail,
        status: "cache",
        user_id,
        payment_type: "recurring"
      }),
    });

    const payload = {
      request: {
        merchant_id: String(merchantId),
        amount: amountString,
        currency: currencyCode,
        order_id: finalOrderId,
        order_desc: finalOrderDesc,
        server_callback_url: `${merchantUrl}/api/flitt/webhook?${callbackQuery}`,
        response_url: `${merchantUrl}/api/flitt/webhook?${callbackQuery}`,
        signature,
        rectoken: String(rectoken), // Use saved card token for recurring payment
      },
    };

    // Prefer Flitt SDK if available
    try {
      const flitt = new FlittPay({ merchantId: Number(merchantId), secretKey });
      const sdkData = await flitt.Checkout({
        order_id: finalOrderId,
        order_desc: finalOrderDesc,
        currency: currencyCode,
        amount: String(amountString),
        rectoken: String(rectoken),
      });

      const token = sdkData?.response?.token || sdkData?.token || null;
      const checkoutUrl = sdkData?.response?.checkout_url || sdkData?.checkout_url || null;
      const paymentId = sdkData?.response?.payment_id || sdkData?.payment_id || null;
      
      if (!token && !checkoutUrl) {
        return NextResponse.json(
          { error: "No token or checkout_url in SDK response", details: sdkData },
          { status: 400 }
        );
      }

      return NextResponse.json({ 
        token, 
        checkout_url: checkoutUrl, 
        payment_id: paymentId,
        is_recurring: true,
        rectoken_used: rectoken
      });
    } catch (sdkErr) {
      // Fallback to direct HTTP
      try {
        const flittResponse = await fetch(
          "https://pay.flitt.com/api/checkout/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(payload),
            cache: "no-store",
          }
        );

        if (!flittResponse.ok) {
          let errorBody;
          try {
            errorBody = await flittResponse.json();
          } catch {
            errorBody = await flittResponse.text();
          }
          console.error("Flitt error:", errorBody);
          return NextResponse.json(
            { error: "Failed to create recurring payment token", details: errorBody, payload },
            { status: 400 }
          );
        }

        const data = await flittResponse.json();

        const finishOrder = await fetch(
          "https://lineup.dahk.am/api/flitt/webhook",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
          }
        );

        return NextResponse.json({
          token: data?.response?.token ?? null,
          checkout_url: data?.response?.checkout_url ?? null,
          payment_id: data?.response?.payment_id ?? null,
          is_recurring: true,
          rectoken_used: rectoken
        });
      } catch (httpErr) {
        console.error("Flitt HTTP error:", httpErr);
        return NextResponse.json(
          { error: "Failed to create recurring payment token", details: httpErr?.message || httpErr },
          { status: 500 }
        );
      }
    }
  } catch (err) {
    console.error("Recurring payment error:", err?.message || err);
    return NextResponse.json(
      { error: "Failed to create recurring payment token" },
      { status: 500 }
    );
  }
}
