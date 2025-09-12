import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      // Flitt may send form-encoded; try text
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = { raw: text };
      }
    }

    // Forward to backend (adjust URL as needed)
    const backendUrl = process.env.FLITT_WEBHOOK_FORWARD_URL || "https://lineup.dahk.am/api/flitt/webhook";
    const resp = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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


