import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        
        const response = await fetch("https://lineup.dahk.am/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                ...body,
                branch_id: body.branch_id,
                lesson_id: body.lesson_id
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || "Registration failed", errors: data.errors },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 