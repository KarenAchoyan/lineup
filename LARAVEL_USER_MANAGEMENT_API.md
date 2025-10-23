# Laravel User Management API for Forgot Password

## Laravel API Endpoints (User Management Only)

### 1. Check User Email Endpoint
**Route:** `POST /api/users/check-email`

**Controller:** `app/Http/Controllers/UserController.php`

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function checkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        try {
            $user = DB::table('users')
                ->where('email', $request->email)
                ->select('id', 'name', 'email')
                ->first();

            if (!$user) {
                return response()->json([
                    'error' => 'User not found'
                ], 404);
            }

            return response()->json([
                'user' => $user,
                'status' => 'success'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Database error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function storeResetToken(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'reset_token' => 'required|string',
            'reset_token_expiry' => 'required|date'
        ]);

        try {
            DB::table('users')
                ->where('email', $request->email)
                ->update([
                    'reset_token' => $request->reset_token,
                    'reset_token_expiry' => $request->reset_token_expiry,
                    'updated_at' => now()
                ]);

            return response()->json([
                'message' => 'Reset token stored successfully',
                'status' => 'success'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to store reset token',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'password' => 'required|string|min:6'
        ]);

        try {
            // Find user with valid reset token
            $user = DB::table('users')
                ->where('reset_token', $request->token)
                ->where('reset_token_expiry', '>', now())
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

### 2. Routes
**File:** `routes/api.php`

```php
use App\Http\Controllers\UserController;

// User Management Routes
Route::post('/users/check-email', [UserController::class, 'checkEmail']);
Route::post('/users/store-reset-token', [UserController::class, 'storeResetToken']);
Route::post('/users/reset-password', [UserController::class, 'resetPassword']);
```

### 3. Database Migration
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

### 4. Environment Configuration
**File:** `.env`

```env
# Laravel API Configuration
APP_URL=http://localhost:8000

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## Next.js Environment Variables
**File:** `.env.local`

```env
# Laravel API Configuration
LARAVEL_API_URL=http://localhost:8000
LARAVEL_API_TOKEN=your_api_token_if_needed

# Gmail Configuration for Next.js
GMAIL_APP_PASSWORD=your_gmail_app_password

# Frontend URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## How It Works Now

### 1. Forgot Password Flow:
1. **User requests password reset** → Next.js frontend
2. **Next.js checks user exists** → Laravel API `/api/users/check-email`
3. **Next.js generates token** → Stores in Laravel via `/api/users/store-reset-token`
4. **Next.js sends email** → Directly from Next.js using nodemailer
5. **User receives email** → From lineup@gmail.com

### 2. Reset Password Flow:
1. **User clicks reset link** → Next.js frontend
2. **User enters new password** → Next.js frontend
3. **Next.js validates token** → Laravel API `/api/users/reset-password`
4. **Laravel updates password** → Database update only
5. **User redirected to sign-in** → Next.js frontend

## Benefits of This Approach

- ✅ **Email sending from Next.js** - Full control over email templates
- ✅ **Laravel for user management** - Database operations only
- ✅ **Separation of concerns** - Clear responsibilities
- ✅ **Flexible email templates** - Easy to modify in Next.js
- ✅ **Laravel security** - Password hashing and validation
- ✅ **Scalable architecture** - Independent services

## Testing Checklist

- [ ] Laravel API server running
- [ ] Next.js frontend running
- [ ] Database migration applied
- [ ] Gmail app password configured
- [ ] Environment variables set
- [ ] Test user email check
- [ ] Test token storage
- [ ] Test email sending
- [ ] Test password reset
- [ ] Test token validation

## API Endpoints Summary

| Endpoint | Method | Purpose | Next.js → Laravel |
|----------|--------|---------|-------------------|
| `/api/users/check-email` | POST | Check if user exists | ✅ |
| `/api/users/store-reset-token` | POST | Store reset token | ✅ |
| `/api/users/reset-password` | POST | Reset password | ✅ |

## Security Features

- ✅ Secure token generation (32 bytes)
- ✅ Token expiration (1 hour)
- ✅ Password hashing with Laravel Hash
- ✅ Input validation
- ✅ SQL injection protection
- ✅ Token cleanup after use
- ✅ Professional email template from Next.js
