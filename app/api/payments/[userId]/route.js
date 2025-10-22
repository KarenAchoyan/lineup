import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { userId } = params;
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    console.log(`Fetching payment history for user: ${userId}`);

    // Fetch from Laravel backend
    const response = await fetch(`https://lineup.dahk.am/api/payments/${userId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Backend request failed: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { 
          error: "Failed to fetch payment history",
          status: response.status 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`Payment history fetched successfully for user: ${userId}`);

    return NextResponse.json(data);

  } catch (error) {
    console.error("Error fetching payment history:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error.message 
      },
      { status: 500 }
    );
  }
}
