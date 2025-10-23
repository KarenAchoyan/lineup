import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json({ 
                error: 'Token and password are required' 
            }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ 
                error: 'Password must be at least 6 characters long' 
            }, { status: 400 });
        }

        // Call Laravel API to validate token and reset password
        const laravelResponse = await fetch(`${process.env.LARAVEL_API_URL}/api/users/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN || ''}`
            },
            body: JSON.stringify({
                token: token,
                password: password
            })
        });

        const data = await laravelResponse.json();

        if (laravelResponse.ok) {
            return NextResponse.json({ 
                message: 'Password reset successfully',
                data: data 
            }, { status: 200 });
        } else {
            return NextResponse.json({ 
                error: data.error || data.message || 'Failed to reset password' 
            }, { status: laravelResponse.status });
        }

    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json({ 
            error: 'Internal server error' 
        }, { status: 500 });
    }
}
