# Flitt Payment System Integration

This document describes the Flitt payment system integration with embedded variant for the Lineup application.

## Overview

The Flitt payment system has been integrated using the embedded variant with the following configuration:

```javascript
var Options = {
  options: {
    methods: ["card"],
    methods_disabled: [],
    card_icons: ["mastercard", "visa"],
    fields: false,
    full_screen: false,
    button: true,
    hide_title: true,
    hide_link: true,    
    email: false,
    theme: {
      type: "light",
      preset: "reset"
    }
  },
  params: {
    merchant_id: 1549901,
    required_rectoken: "y",
    currency: "GEL",
    amount: 500
  },
  css_variable: {
    main: '#7d8ff8',
    card_bg: '#353535',
    card_shadow: '#9ADBE8'
  }
};
checkout("#checkout-container", Options);
```

## Components Created

### 1. FlittPayment.jsx
- Main payment component with embedded Flitt checkout
- Handles payment initialization and status
- Supports custom styling and error handling
- Located: `components/paypal/FlittPayment.jsx`

### 2. FlittPaymentButton.jsx
- Payment button component for profile page
- Includes amount selection (500, 1000, 2000 GEL)
- Handles payment success/error callbacks
- Located: `components/paypal/FlittPaymentButton.jsx`

### 3. PaymentPage.jsx
- Standalone payment page with plan selection
- Full payment flow with multiple subscription options
- Located: `components/paypal/PaymentPage.jsx`

### 4. PaymentStatus.jsx
- Reusable component for displaying payment status
- Shows active/inactive subscription status
- Located: `components/paypal/PaymentStatus.jsx`

## API Routes

### 1. Payment Success Handler
- Route: `/api/flitt/payment-success`
- Method: POST
- Handles successful payment processing
- Updates user subscription status
- Located: `app/api/flitt/payment-success/route.js`

### 2. Webhook Handler
- Route: `/api/flitt/webhook`
- Method: POST
- Processes Flitt webhook events
- Handles payment.completed, payment.failed, payment.refunded
- Located: `app/api/flitt/webhook/route.js`

## Integration Points

### Profile Page Integration
The profile page (`components/profile/main.jsx`) has been updated to include:

1. **Payment Status Display**: Shows current subscription status
2. **Payment Button**: Appears when user hasn't paid
3. **Success Message**: Shows when subscription is active

### Payment Plans
Three subscription tiers are available:
- **Monthly**: 500 GEL
- **Quarterly**: 1000 GEL (33% savings)
- **Annual**: 2000 GEL (50% savings)

## Configuration

### Merchant Settings
- **Merchant ID**: 1549901
- **Currency**: GEL (Georgian Lari)
- **Required Recurring Token**: Yes

### Styling
- **Primary Color**: #7d8ff8 (Blue)
- **Card Background**: #353535 (Dark Gray)
- **Card Shadow**: #9ADBE8 (Light Blue)

## Usage Examples

### Basic Payment Component
```jsx
import FlittPayment from '@/components/paypal/FlittPayment';

<FlittPayment
  amount={500}
  currency="GEL"
  merchantId={1549901}
  userId={user.user_id}
  userEmail={user.email}
  onPaymentSuccess={handleSuccess}
  onPaymentError={handleError}
/>
```

### Payment Button in Profile
```jsx
import FlittPaymentButton from '@/components/paypal/FlittPaymentButton';

<FlittPaymentButton
  userId={user.user_id}
  userEmail={user.email}
  userToken={user.token}
  dict={dict}
/>
```

### Payment Status Display
```jsx
import PaymentStatus from '@/components/paypal/PaymentStatus';

<PaymentStatus
  userId={user.user_id}
  userToken={user.token}
  dict={dict}
/>
```

## Security Considerations

1. **Token Validation**: All API calls include user authentication tokens
2. **Webhook Verification**: Webhook signatures should be verified (implementation needed)
3. **HTTPS Required**: Flitt requires HTTPS for production
4. **Data Validation**: All payment data is validated before processing

## Testing

### Test Environment
- Use Flitt's test merchant ID for development
- Test with different payment amounts
- Verify webhook handling

### Production Deployment
1. Update merchant ID to production value
2. Configure webhook URLs
3. Enable HTTPS
4. Test with real payment methods

## Error Handling

The system includes comprehensive error handling for:
- Payment initialization failures
- Network connectivity issues
- Invalid payment data
- Webhook processing errors
- User authentication failures

## Future Enhancements

1. **Webhook Signature Verification**: Implement proper signature validation
2. **Payment History**: Add detailed payment history tracking
3. **Refund Handling**: Implement refund processing
4. **Multi-currency Support**: Add support for other currencies
5. **Subscription Management**: Add subscription modification features

## Support

For Flitt-specific issues, refer to:
- Flitt Documentation: [Flitt Docs]
- Merchant Support: Contact Flitt support team
- Technical Issues: Check browser console for errors

## Files Modified/Created

### New Files
- `components/paypal/FlittPayment.jsx`
- `components/paypal/FlittPaymentButton.jsx`
- `components/paypal/PaymentPage.jsx`
- `components/paypal/PaymentStatus.jsx`
- `app/api/flitt/payment-success/route.js`
- `app/api/flitt/webhook/route.js`
- `app/[lang]/payment/page.jsx`
- `FLITT_PAYMENT_SETUP.md`

### Modified Files
- `components/profile/main.jsx` - Added Flitt payment integration
