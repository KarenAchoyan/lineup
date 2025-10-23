# Forgot Password Functionality Test

## Test Checklist

### 1. Database Setup
- [ ] Run the migration SQL to add reset_token fields
- [ ] Verify users table has reset_token and reset_token_expiry columns

### 2. Environment Setup
- [ ] Add GMAIL_APP_PASSWORD to .env.local
- [ ] Add NEXT_PUBLIC_BASE_URL to .env.local
- [ ] Restart development server

### 3. Frontend Testing
- [ ] Navigate to `/en/auth/signIn`
- [ ] Click "Forgot Password?" link
- [ ] Enter valid email address
- [ ] Check for success message
- [ ] Verify email was sent

### 4. Email Testing
- [ ] Check inbox for email from lineup@gmail.com
- [ ] Verify email has proper styling
- [ ] Click reset link in email
- [ ] Verify redirect to reset password page

### 5. Reset Password Testing
- [ ] Enter new password
- [ ] Confirm password
- [ ] Submit form
- [ ] Check for success message
- [ ] Verify redirect to sign-in page

### 6. Security Testing
- [ ] Try expired token (wait 1+ hour)
- [ ] Try invalid token
- [ ] Try weak password
- [ ] Verify token cleanup after use

### 7. Multi-language Testing
- [ ] Test in English (/en/auth/forgot-password)
- [ ] Test in Georgian (/ge/auth/forgot-password)
- [ ] Test in Armenian (/hy/auth/forgot-password)
- [ ] Test in Russian (/ru/auth/forgot-password)

### 8. Responsive Testing
- [ ] Test on mobile devices
- [ ] Test on tablet devices
- [ ] Test on desktop
- [ ] Verify all buttons and forms work

## Expected Results
- ✅ Email sent from lineup@gmail.com
- ✅ Professional email template
- ✅ Secure token generation
- ✅ 1-hour token expiration
- ✅ Password hashing
- ✅ Multi-language support
- ✅ Responsive design
- ✅ Error handling
- ✅ Success messages
- ✅ Clean URLs

## Common Issues
1. **Email not sending**: Check Gmail app password
2. **Database errors**: Run migration SQL
3. **Token expired**: Request new reset link
4. **Styling issues**: Check CSS classes
5. **Language issues**: Check dictionary files
