# Flitt Payment System Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Flitt Payment Configuration
FLITT_MERCHANT_ID=4054488
FLITT_PAYMENT_KEY=wYdSnGkTGhQUqBWhEhilf7j9tOIdKFze
FLITT_API_BASE=https://pay.flitt.com/api

# Backend API URL
BACKEND_URL=https://lineup.dahk.am/api

# Next.js Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Installation

Install the required package:

```bash
npm install @flittpayments/flitt-node-js-sdk
```

## Laravel Backend Integration

The payment system is configured to work with your existing Laravel backend:

### API Endpoints Used:
- `POST /api/flitt/create-checkout` - Create Flitt checkout URL
- `GET /api/payments/check-status` - Check payment status
- `GET /api/flitt/webhook` - Handle payment webhooks
- `GET /api/payments/{userId}` - Get user payment history

### Payment Flow:
1. User clicks "Make Payment" button on profile page
2. Frontend creates order token via Flitt API
3. Payment record is stored in Laravel backend
4. User completes payment through Flitt checkout
5. Flitt sends webhook to update payment status
6. Payment history is displayed from Laravel backend

## Features

### ✅ Completed:
- Flitt payment integration
- Profile page payment button
- Payment status checking
- Payment history display
- Success page
- Webhook handling
- Laravel backend integration

### 🔧 Configuration:
- Payment amount: 30 GEL
- Currency: GEL
- Payment method: Flitt
- Payment model

## Testing

1. Set up environment variables
2. Install dependencies
3. Run the development server
4. Navigate to profile page
5. Click "Make Payment" button
6. Complete test payment through Flitt

## Troubleshooting

### Common Issues:
1. **Environment variables not set**: Make sure all required env vars are configured
2. **Backend connection failed**: Check if Laravel backend is running and accessible
3. **Flitt scripts not loading**: Check network connectivity and script URLs
4. **Payment status not updating**: Verify webhook endpoint is working

### Debug Steps:
1. Check browser console for errors
2. Verify API endpoints are responding
3. Check Laravel backend logs
4. Test payment flow in Flitt sandbox mode

