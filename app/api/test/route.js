import { NextResponse } from "next/server";
import db from "@/lib/database";

export async function GET(request) {
  try {
    console.log("Test API: Starting database test...");

    // Test database operations
    const testUserId = "test_user_123";
    const testUserEmail = "test@example.com";

    // Create test user
    const user = await db.createUser({
      user_id: testUserId,
      name: "Test User",
      email: testUserEmail,
      parent_name: "Test Parent"
    });

    console.log("Test user created:", user);

    // Test user retrieval
    const retrievedUser = await db.getUser(testUserId);
    console.log("Retrieved user:", retrievedUser);

    // Test environment variables
    const envCheck = {
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "not_set",
      NODE_ENV: process.env.NODE_ENV || "not_set"
    };

    console.log("Environment variables check:", envCheck);

    return NextResponse.json({
      success: true,
      message: "Database test completed successfully",
      test_results: {
        user_created: !!user,
        user_retrieved: !!retrievedUser,
        environment: envCheck
      },
      data: {
        user,
        retrieved_user: retrievedUser
      }
    });

  } catch (error) {
    console.error("Test API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Test failed",
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, user_id } = body;

    console.log("Test API POST: Received action:", action);

    switch (action) {
      case 'get_user_data':
        if (!user_id) {
          return NextResponse.json(
            { error: "user_id is required" },
            { status: 400 }
          );
        }

        const user = await db.getUser(user_id);

        return NextResponse.json({
          success: true,
          user
        });

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error("Test API POST error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Test failed",
        message: error.message
      },
      { status: 500 }
    );
  }
}