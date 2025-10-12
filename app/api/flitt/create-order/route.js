import { NextRequest, NextResponse } from "next/server";
import flitt from "@/lib/flitt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, currency, description, user_id, user_email } = body;

    // Validate required fields
    if (!amount || !user_id) {
      return NextResponse.json(
        { error: "Amount and user_id are required" },
        { status: 400 }
      );
    }

    // Create order data for Flitt
    const orderData = {
      amount: parseFloat(amount) * 100, // Convert to tetri
      currency: currency || "GEL",
      description: description || `Payment for user ${user_id}`,
      user_id: user_id,
      user_email: user_email || null
    };

    // Validate Flitt configuration
    if (!flitt.secretKey || !flitt.merchantId) {
      return NextResponse.json(
        { 
          success: false,
          error: "Flitt payment system is not properly configured. Please contact support." 
        },
        { status: 500 }
      );
    }

    // Create order token using Flitt
    console.log('Creating Flitt order with data:', orderData);
    const flittResponse = await flitt.createOrderToken(orderData);
    console.log('Flitt API response:', flittResponse);

    if (!flittResponse.success || !flittResponse.data?.token) {
      throw new Error("Failed to create Flitt order token");
    }

    // Store payment record in Laravel backend
    const paymentData = {
      user_id: user_id,
      amount: parseFloat(amount),
      currency: currency || "GEL",
      description: description || `Payment for user ${user_id}`,
      status: 'pending',
      payment_method: 'flitt',
      order_id: flittResponse.data.order_id,
      token: flittResponse.data.token
    };

    try {
      const backendResponse = await fetch(`${flitt.backendUrl}/paypal/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      if (!backendResponse.ok) {
        console.warn("Failed to store payment in backend:", await backendResponse.text());
      }
    } catch (backendError) {
      console.warn("Backend storage failed:", backendError);
    }

    return NextResponse.json({
      success: true,
      data: {
        token: flittResponse.data.token,
        order_id: flittResponse.data.order_id,
        merchant_id: flitt.merchantId,
        amount: orderData.amount,
        currency: orderData.currency
      }
    });

  } catch (error) {
    console.error("Flitt createOrder error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || "Failed to create order" 
      }, 
      { status: 500 }
    );
  }
}
