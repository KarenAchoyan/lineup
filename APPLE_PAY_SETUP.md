# Apple Pay Integration Setup

This project now includes Apple Pay integration. Here's what has been implemented:

## Files Created/Modified

### API Endpoints
- `app/api/applepay/validate/route.js` - Handles Apple Pay merchant validation
- `app/api/applepay/pay/route.js` - Processes Apple Pay payments

### Components
- `components/paypal/ApplePayButton.jsx` - Apple Pay button component
- `components/paypal/PaymentExample.jsx` - Updated to include Apple Pay button

### Layout
- `app/[lang]/layout.js` - Added Apple Pay SDK script

## Environment Variables Required

Add these to your `.env.local` file:

```env
# Apple Pay Configuration
APPLE_PAY_MERCHANT_ID=merchant.com.lineup.ge
APPLE_PAY_DOMAIN=lineup.ge
LARAVEL_API_URL=https://your-laravel-backend.com
LARAVEL_API_TOKEN=your_api_token_here
```

## Features Implemented

1. **Apple Pay Button**: Native Apple Pay button that only shows on supported devices
2. **Merchant Validation**: API endpoint for Apple Pay merchant validation
3. **Payment Processing**: API endpoint to process Apple Pay payments
4. **Integration**: Seamlessly integrated with existing payment flow
5. **Error Handling**: Comprehensive error handling and user feedback
6. **Loading States**: Visual feedback during payment processing

## How It Works

1. The Apple Pay button only appears on devices that support Apple Pay
2. When clicked, it creates an Apple Pay session with the configured payment details
3. The merchant validation endpoint validates the session with Apple
4. Upon payment authorization, the payment is processed through your Laravel backend
5. Success/failure feedback is provided to the user

## Testing

- Apple Pay only works on Safari on macOS/iOS devices with Touch ID/Face ID
- For development, you can test the flow but actual payments require proper Apple Pay merchant setup
- The current implementation includes mock responses for development

## Production Setup

For production, you'll need to:

1. Register as an Apple Pay merchant
2. Obtain proper merchant certificates
3. Update the validation endpoint with real Apple Pay merchant validation
4. Configure your domain for Apple Pay
5. Test with real Apple Pay transactions

## Usage

The Apple Pay button is automatically included in the payment page alongside the existing PayPal/Flitt payment options. Users can choose their preferred payment method.
