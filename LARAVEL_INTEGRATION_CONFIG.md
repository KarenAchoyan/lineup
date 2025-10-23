# Laravel Integration Configuration

## Next.js Environment Variables

Create or update your `.env.local` file with the following variables:

```env
# Laravel API Configuration
LARAVEL_API_URL=http://localhost:8000
LARAVEL_API_TOKEN=your_api_token_if_needed

# Frontend URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Laravel Environment Variables

Add to your Laravel `.env` file:

```env
# Frontend URL for reset links
FRONTEND_URL=http://localhost:3000

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=lineup@gmail.com
MAIL_PASSWORD=your_gmail_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=lineup@gmail.com
MAIL_FROM_NAME="Lineup Cultural & Entertainment Center"
```

## API Endpoints Summary

### Next.js Frontend → Laravel Backend

1. **Forgot Password Request:**
   - Frontend: `POST /api/auth/forgot-password`
   - Laravel: `POST /api/forgot-password`
   - Data: `{ email: string }`

2. **Reset Password:**
   - Frontend: `POST /api/auth/reset-password`
   - Laravel: `POST /api/reset-password`
   - Data: `{ token: string, password: string }`

## Database Schema

The Laravel backend needs these fields in the `users` table:

```sql
ALTER TABLE users 
ADD COLUMN reset_token VARCHAR(255) NULL,
ADD COLUMN reset_token_expiry TIMESTAMP NULL;
```

## Testing Checklist

- [ ] Laravel API server running on port 8000
- [ ] Next.js frontend running on port 3000
- [ ] Database migration applied
- [ ] Email configuration working
- [ ] Environment variables set
- [ ] API endpoints responding
- [ ] Email sending successfully
- [ ] Password reset working

## Troubleshooting

### Common Issues:

1. **CORS Issues:**
   - Add CORS middleware to Laravel
   - Configure allowed origins

2. **Email Not Sending:**
   - Check Gmail app password
   - Verify SMTP settings
   - Check Laravel logs

3. **API Connection Issues:**
   - Verify LARAVEL_API_URL
   - Check Laravel server status
   - Test API endpoints directly

4. **Token Issues:**
   - Check database for token storage
   - Verify token expiration
   - Check URL encoding
