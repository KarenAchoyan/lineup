import { NextRequest, NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { userId } = params;
    const authHeader = request.headers.get('authorization');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // Forward request to Laravel backend
    const response = await fetch(`https://lineup.dahk.am/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader || '',
      },
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error proxying request to Laravel:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
