import { NextRequest, NextResponse } from "next/server";
import flitt from "@/lib/flitt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { order_id, amount, currency, order_desc } = body;

    // Validate required fields
    if (!order_id || !amount || !currency) {
      return NextResponse.json(
        { error: "order_id, amount, and currency are required" },
        { status: 400 }
      );
    }

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

    // Create checkout URL using Flitt
    console.log('Creating Flitt checkout with data:', { order_id, amount, currency, order_desc });
    const flittResponse = await flitt.createCheckoutUrl({
      order_id,
      amount,
      currency,
      order_desc: order_desc || `Order ${order_id}`
    });
    console.log('Flitt API response:', flittResponse);

    if (!flittResponse.success || !flittResponse.checkout_url) {
      throw new Error("Failed to create Flitt checkout URL");
    }

    return NextResponse.json({
      success: true,
      checkout_url: flittResponse.checkout_url,
      order_id: flittResponse.order_id
    });

  } catch (error) {
    console.error("Flitt createCheckout error:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || "Failed to create checkout",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }, 
      { status: 500 }
    );
  }
}
