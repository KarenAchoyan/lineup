import { NextResponse } from "next/server";
import flitt from "@/lib/flitt";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json(
        { error: "user_id is required" },
        { status: 400 }
      );
    }

    // Check payment status from Laravel backend
    try {
      const backendResponse = await fetch(`${flitt.backendUrl}/paypals/check-payment?user_id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!backendResponse.ok) {
        throw new Error('Backend payment check failed');
      }

      const backendData = await backendResponse.json();
      
      return NextResponse.json({
        success: true,
        has_paid: backendData.has_paid,
        source: 'backend'
      });

    } catch (backendError) {
      console.warn("Backend payment check failed, using fallback:", backendError);
      
      // Fallback to local database if backend is unavailable
      const db = await import("@/lib/database");
      const hasPaid = await db.default.hasUserPaid(userId);
      
      return NextResponse.json({
        success: true,
        has_paid: hasPaid,
        source: 'fallback'
      });
    }

  } catch (error) {
    console.error("Payment status check error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to check payment status"
      },
      { status: 500 }
    );
  }
}
