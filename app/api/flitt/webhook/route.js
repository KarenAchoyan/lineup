import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Extract user data from cookies
    const cookies = request.headers.get('cookie') || '';
    const cookieMap = {};
    cookies.split(';').forEach(cookie => {
      const [key, value] = cookie.trim().split('=');
      if (key && value) {
        cookieMap[key] = decodeURIComponent(value);
      }
    });

    // Extract user_id from URL query params or cookies
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id') || cookieMap.user_id || cookieMap.userId;
    const email = searchParams.get('email') || cookieMap.email || cookieMap.userEmail;
    const orderId = searchParams.get('order_id') || cookieMap.order_id;

    let body;
    try {
      body = await request.json();
    } catch (e) {
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = { raw: text };
      }
    }

    // Normalize and enrich body
    const flitt = typeof body === 'object' && body ? body : {};
    const response = flitt.response || flitt || {};
    const paymentId = response.payment_id || flitt.payment_id || null;
    const amount = response.amount || flitt.amount || null;
    const currency = response.currency || flitt.currency || null;
    const status = response.response_status || flitt.response_status || flitt.status || null;
    const token = response.token || flitt.token || null;

    // Get additional user data from cookies
    const userName = cookieMap.userName || cookieMap.name;
    const userPhone = cookieMap.userPhone || cookieMap.phone;
    const userRole = cookieMap.userRole || cookieMap.role;

    const forwardPayload = {
      gateway: 'flitt',
      order_id: orderId || response.order_id || flitt.order_id || null,
      payment_id: paymentId,
      amount,
      currency,
      status,
      token,
      user_id: userId || null,
      email: email || null,
      name: userName || null,
      phone: userPhone || null,
      role: userRole || null,
      create_time: new Date().toISOString(),
      update_time: new Date().toISOString(),
      flitt_data: flitt,
    };

    // Forward to backend with auth if provided
    const backendUrl = "https://lineup.dahk.am/api/flitt/webhook";
    const resp = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LARAVEL_API_TOKEN ? { Authorization: `Bearer ${process.env.LARAVEL_API_TOKEN}` } : {}),
      },
      body: JSON.stringify(forwardPayload),
    });

    let data;
    try {
      data = await resp.json();
    } catch {
      data = await resp.text();
    }

    if (!resp.ok) {
      return NextResponse.json({ error: "Backend rejected webhook", details: data }, { status: 400 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Flitt webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}


