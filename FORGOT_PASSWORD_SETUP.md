# Forgot Password Functionality Setup Guide

## Overview
This guide explains how to set up the complete forgot password functionality for the Lineup application.

## Features Implemented
- ✅ Forgot Password Request Page
- ✅ Email Sending from lineup@gmail.com
- ✅ Password Reset Page
- ✅ Secure Token-based Reset
- ✅ Multi-language Support
- ✅ Responsive Design

## Setup Instructions

### 1. Database Migration
Run the following SQL commands to add reset token fields to your users table:

```sql
-- Add reset token fields to users table
ALTER TABLE users 
ADD COLUMN reset_token VARCHAR(255) NULL,
ADD COLUMN reset_token_expiry DATETIME NULL;

-- Add index for better performance
CREATE INDEX idx_reset_token ON users(reset_token);
CREATE INDEX idx_reset_token_expiry ON users(reset_token_expiry);
```

### 2. Environment Variables
Add the following to your `.env.local` file:

```env
# Email Configuration (Gmail)
GMAIL_APP_PASSWORD=your_gmail_app_password

# Application URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Gmail App Password Setup
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to "App passwords" section
4. Generate a new app password for "Mail"
5. Use this password as `GMAIL_APP_PASSWORD` in your environment variables

### 4. File Structure Created
```
app/
├── api/auth/
│   ├── forgot-password/route.js
│   └── reset-password/route.js
├── [lang]/auth/
│   ├── forgot-password/page.jsx
│   └── reset-password/page.jsx
components/auth/
├── forgotPassword.jsx
└── resetPassword.jsx
```

## How It Works

### 1. Forgot Password Flow
1. User clicks "Forgot Password?" on sign-in page
2. User enters email address
3. System generates secure reset token
4. Email sent from lineup@gmail.com with reset link
5. User receives email with reset link

### 2. Reset Password Flow
1. User clicks reset link in email
2. User enters new password
3. System validates token and updates password
4. User redirected to sign-in page

## Security Features
- ✅ Secure token generation (32 bytes)
- ✅ Token expiration (1 hour)
- ✅ Password hashing with bcrypt
- ✅ Token cleanup after use
- ✅ Input validation
- ✅ SQL injection protection

## Email Template
The email includes:
- Lineup branding
- Secure reset link
- Expiration notice
- Professional styling
- Mobile-responsive design

## Multi-language Support
All text is translated for:
- English (en)
- Georgian (ge)
- Armenian (hy)
- Russian (ru)

## Testing
1. Start your development server
2. Navigate to `/auth/signIn`
3. Click "Forgot Password?"
4. Enter a valid email address
5. Check email for reset link
6. Click reset link and set new password

## Troubleshooting

### Email Not Sending
- Check Gmail app password is correct
- Verify 2FA is enabled on Gmail account
- Check spam folder

### Database Errors
- Ensure migration SQL was run
- Check database connection
- Verify table structure

### Token Issues
- Check token expiration (1 hour limit)
- Verify URL encoding
- Check database for token storage

## Production Deployment
1. Update `NEXT_PUBLIC_BASE_URL` to your production domain
2. Use production database
3. Set up proper email monitoring
4. Test email delivery

## Support
For issues or questions, check:
1. Console logs for errors
2. Network tab for API calls
3. Database for token storage
4. Email delivery logs
