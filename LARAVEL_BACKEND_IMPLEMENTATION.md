# Laravel Backend Implementation for Forgot Password

## Laravel API Endpoints to Implement

### 1. Forgot Password Endpoint
**Route:** `POST /api/forgot-password`

**Controller:** `app/Http/Controllers/Auth/ForgotPasswordController.php`

```php
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ForgotPasswordController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        try {
            // Generate reset token
            $token = Str::random(64);
            $expiresAt = Carbon::now()->addHour(); // 1 hour expiry

            // Store reset token in database
            DB::table('users')
                ->where('email', $request->email)
                ->update([
                    'reset_token' => $token,
                    'reset_token_expiry' => $expiresAt,
                    'updated_at' => now()
                ]);

            // Get user data for email
            $user = DB::table('users')
                ->where('email', $request->email)
                ->first();

            // Send email
            $resetUrl = config('app.frontend_url') . '/auth/reset-password?token=' . $token;
            
            Mail::send('emails.password-reset', [
                'user' => $user,
                'resetUrl' => $resetUrl
            ], function ($message) use ($user) {
                $message->to($user->email, $user->name)
                        ->subject('Password Reset Request - Lineup');
            });

            return response()->json([
                'message' => 'Password reset email sent successfully',
                'status' => 'success'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to send reset email',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
```

### 2. Reset Password Endpoint
**Route:** `POST /api/reset-password`

**Controller:** `app/Http/Controllers/Auth/ResetPasswordController.php`

```php
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class ResetPasswordController extends Controller
{
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'password' => 'required|string|min:6|confirmed'
        ]);

        try {
            // Find user with valid reset token
            $user = DB::table('users')
                ->where('reset_token', $request->token)
                ->where('reset_token_expiry', '>', Carbon::now())
                ->first();

            if (!$user) {
                return response()->json([
                    'error' => 'Invalid or expired reset token'
                ], 400);
            }

            // Update password and clear reset token
            DB::table('users')
                ->where('id', $user->id)
                ->update([
                    'password' => Hash::make($request->password),
                    'reset_token' => null,
                    'reset_token_expiry' => null,
                    'updated_at' => now()
                ]);

            return response()->json([
                'message' => 'Password reset successfully',
                'status' => 'success'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to reset password',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
```

### 3. Email Template
**File:** `resources/views/emails/password-reset.blade.php`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Password Reset - Lineup</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #232222; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: #BF3206; font-size: 28px;">LINEUP</h1>
            <p style="margin: 5px 0 0 0; color: #C7C7C7; font-size: 14px;">Cultural & Entertainment Center</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-top: 0; font-size: 24px;">Password Reset Request</h2>
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
                Hello {{ $user->name }},
            </p>
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
                We received a request to reset your password for your Lineup account. If you made this request, click the button below to reset your password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{ $resetUrl }}" 
                   style="background-color: #BF3206; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; font-size: 16px;">
                    Reset Password
                </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; font-size: 14px;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="{{ $resetUrl }}" style="color: #BF3206; word-break: break-all;">{{ $resetUrl }}</a>
            </p>
            
            <p style="color: #666; line-height: 1.6; font-size: 14px;">
                This link will expire in 1 hour for security reasons.
            </p>
            
            <p style="color: #666; line-height: 1.6; font-size: 14px;">
                If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #232222; color: #C7C7C7; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2024 Lineup Cultural & Entertainment Center. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

### 4. Database Migration
**File:** `database/migrations/xxxx_xx_xx_xxxxxx_add_reset_token_to_users_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddResetTokenToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('reset_token')->nullable();
            $table->timestamp('reset_token_expiry')->nullable();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['reset_token', 'reset_token_expiry']);
        });
    }
}
```

### 5. Routes
**File:** `routes/api.php`

```php
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;

// Forgot Password Routes
Route::post('/forgot-password', [ForgotPasswordController::class, 'forgotPassword']);
Route::post('/reset-password', [ResetPasswordController::class, 'resetPassword']);
```

### 6. Environment Configuration
**File:** `.env`

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

### 7. Next.js Environment Variables
**File:** `.env.local`

```env
# Laravel API Configuration
LARAVEL_API_URL=http://localhost:8000
LARAVEL_API_TOKEN=your_api_token_if_needed

# Frontend URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Testing the Integration

1. **Start Laravel API server:**
   ```bash
   php artisan serve
   ```

2. **Start Next.js frontend:**
   ```bash
   npm run dev
   ```

3. **Test the flow:**
   - Navigate to `/en/auth/signIn`
   - Click "Forgot Password?"
   - Enter email address
   - Check Laravel logs for email sending
   - Check email for reset link
   - Test password reset

## Security Features

- ✅ Secure token generation (64 characters)
- ✅ Token expiration (1 hour)
- ✅ Password hashing with Laravel Hash
- ✅ Input validation
- ✅ SQL injection protection
- ✅ Token cleanup after use
- ✅ Professional email template
