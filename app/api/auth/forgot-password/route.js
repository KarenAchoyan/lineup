import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Check if user exists in Laravel API
        const userResponse = await fetch(`http://lineup.dahk.am/api/users/check-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN || ''}`
            },
            body: JSON.stringify({ email: email })
        });

        const userData = await userResponse.json();

        if (!userResponse.ok || !userData.user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        // Store reset token in Laravel database
        const tokenResponse = await fetch(`http://lineup.dahk.am/api/users/store-reset-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN || ''}`
            },
            body: JSON.stringify({
                email: email,
                reset_token: resetToken,
                reset_token_expiry: resetTokenExpiry.toISOString()
            })
        });

        if (!tokenResponse.ok) {
            return NextResponse.json({ error: 'Failed to store reset token' }, { status: 500 });
        }

        // Create transporter for Gmail
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: 'lineup@gmail.com',
                pass: 'rvtvtgfchplayibi'
            }
        });

        // Create reset URL
        const resetUrl = `${'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;

        // Email content
        const mailOptions = {
            from: 'lineup@gmail.com',
            to: email,
            subject: 'Password Reset Request - Lineup',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #232222; color: white; padding: 20px; text-align: center;">
                        <h1 style="margin: 0; color: #BF3206;">LINEUP</h1>
                        <p style="margin: 5px 0 0 0; color: #C7C7C7;">Cultural & Entertainment Center</p>
                    </div>
                    
                    <div style="padding: 30px; background-color: #f9f9f9;">
                        <h2 style="color: #333; margin-top: 0;">Password Reset Request</h2>
                        <p style="color: #666; line-height: 1.6;">
                            Hello ${userData.user.name},
                        </p>
                        <p style="color: #666; line-height: 1.6;">
                            We received a request to reset your password for your Lineup account. If you made this request, click the button below to reset your password:
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" 
                               style="background-color: #BF3206; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                Reset Password
                            </a>
                        </div>
                        
                        <p style="color: #666; line-height: 1.6; font-size: 14px;">
                            If the button doesn't work, copy and paste this link into your browser:<br>
                            <a href="${resetUrl}" style="color: #BF3206; word-break: break-all;">${resetUrl}</a>
                        </p>
                        
                        <p style="color: #666; line-height: 1.6; font-size: 14px;">
                            This link will expire in 1 hour for security reasons.
                        </p>
                        
                        <p style="color: #666; line-height: 1.6; font-size: 14px;">
                            If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
                        </p>
                    </div>
                    
                    <div style="background-color: #232222; color: #C7C7C7; padding: 20px; text-align: center; font-size: 12px;">
                        <p style="margin: 0;">© 2024 Lineup Cultural & Entertainment Center. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ 
            message: 'Password reset email sent successfully' 
        }, { status: 200 });

    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json({ 
            error: 'Internal server error' 
        }, { status: 500 });
    }
}
