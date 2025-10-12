import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('authorization');

    // Forward request to Laravel backend
    const response = await fetch('https://lineup.dahk.am/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader || '',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error proxying request to Laravel:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
