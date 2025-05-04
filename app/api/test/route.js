import { NextResponse } from 'next/server'

export async function handler(req) {
    return NextResponse.json(
        { message: "Method not allowed" }
    )
}
