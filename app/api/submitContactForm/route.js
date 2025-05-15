import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { subject, phone, email, message } = await req.json();

    const externalApiResponse = await fetch("https://lineup.dahk.am/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        phone,
        email,
        message,
      }),
    });

    const data = await externalApiResponse.json();

    if (externalApiResponse.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(data, { status: externalApiResponse.status });
    }
  } catch (error) {
    console.error("Error in /api/submitContactForm:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
} 