// Flitt payment configuration using official SDK approach
class FlittConfig {
  constructor() {
    this.merchantId = process.env.FLITT_MERCHANT_ID || 4054488;
    this.secretKey = process.env.FLITT_SECRET_KEY || "wYdSnGkTGhQUqBWhEhilf7j9tOIdKFze";
    this.apiBase = process.env.FLITT_API_BASE || "https://pay.flitt.com/api";
    this.backendUrl = process.env.BACKEND_URL || "https://lineup.dahk.am/api";
    this.testMode = process.env.NODE_ENV === 'development';
    
    // Initialize official Flitt SDK
    try {
      const FlittPay = require('@flittpayments/flitt-node-js-sdk');
      this.flittSDK = new FlittPay({
        merchantId: this.merchantId,
        secretKey: this.secretKey
      });
      console.log('Official Flitt SDK initialized successfully');
    } catch (error) {
      console.warn('Could not initialize official Flitt SDK:', error.message);
      this.flittSDK = null;
    }
    
    // Validate required environment variables
    if (!this.merchantId || !this.secretKey) {
      console.error('Flitt configuration error: Missing required environment variables');
      console.error('Please set FLITT_MERCHANT_ID and FLITT_SECRET_KEY in your .env.local file');
    }
  }

  // Create checkout URL using the official Flitt redirect approach
  async createCheckoutUrl(orderData) {
    try {
      const { order_id, amount, currency, order_desc } = orderData;

      // Try using official SDK first
      if (this.flittSDK) {
        try {
          console.log('Attempting to use official Flitt SDK...');
          const requestData = {
            order_id: order_id,
            order_desc: order_desc || `Order ${order_id}`,
            currency: currency,
            amount: amount.toString()
          };
          
          const result = await this.flittSDK.Checkout(requestData);
          console.log('Official SDK result:', result);
          
          if (result && result.checkout_url) {
            return {
              success: true,
              checkout_url: result.checkout_url,
              order_id: order_id
            };
          }
        } catch (sdkError) {
          console.warn('Official SDK failed, falling back to manual implementation:', sdkError.message);
        }
      }

      // Fallback to manual implementation
      console.log('Using manual Flitt API implementation...');

      // Generate signature using the official format: merchant_id + order_id + amount + currency + secret_key
      const signatureString = `${this.merchantId}${order_id}${amount}${currency}${this.secretKey}`;
      const crypto = require('crypto');
      const signature = crypto.createHash('sha1').update(signatureString).digest('hex');
      
      console.log('Flitt Signature Debug:', {
        merchantId: this.merchantId,
        order_id,
        amount,
        currency,
        secretKey: this.secretKey.substring(0, 4) + '...',
        signatureString: signatureString.substring(0, 20) + '...',
        signature
      });

      // Create form data for the redirect endpoint
      const baseUrl = 'https://www.lineup.ge/api';
      const formData = new URLSearchParams({
        order_id: order_id,
        merchant_id: this.merchantId.toString(),
        order_desc: order_desc || `Order ${order_id}`,
        amount: amount.toString(),
        currency: currency,
        response_url: `${baseUrl}/payment-success`,
        webhook_url: `${baseUrl}/api/flitt/webhook`,
        signature: signature
      });

      console.log('Sending form data to Flitt redirect endpoint:', formData.toString());

      // Use the redirect endpoint as per official documentation
      const response = await fetch(`${this.apiBase}/checkout/redirect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      console.log('Flitt API Response status:', response.status);
      console.log('Flitt API Response headers:', Object.fromEntries(response.headers.entries()));

      // Check if we got a redirect response (302)
      if (response.status === 302) {
        const redirectUrl = response.headers.get('Location');
        console.log('Flitt redirect URL:', redirectUrl);
        
        if (redirectUrl) {
          return {
            success: true,
            checkout_url: redirectUrl,
            order_id: order_id
          };
        }
      }

      // If not a redirect, check for error response
      const responseText = await response.text();
      console.log('Flitt API Response body:', responseText);

      // Parse error response if it's HTML
      if (responseText.includes('<html>') || responseText.includes('error')) {
        throw new Error(`Flitt API error: ${response.status} - ${responseText}`);
      }

      throw new Error(`Unexpected response: ${response.status} - ${responseText}`);

    } catch (error) {
      console.error('Flitt createCheckoutUrl error:', error);
      
      // In development mode, return a mock response for testing
      if (this.testMode) {
        console.log('Development mode: Returning mock Flitt response');
        return {
          success: true,
          checkout_url: `https://www.lineup.ge/payment-success?mock=true&order_id=${orderData.order_id}`,
          order_id: orderData.order_id,
          is_mock: true
        };
      }
      
      throw new Error(`Flitt API error: ${error.message}`);
    }
  }

  // Generate signature for requests using SHA1 (official format)
  generateSignature(order_id, amount, currency) {
    if (!this.secretKey) {
      throw new Error('Flitt secret key is not configured. Please set FLITT_SECRET_KEY in your environment variables.');
    }
    
    // Official format: merchant_id + order_id + amount + currency + secret_key
    const signatureString = `${this.merchantId}${order_id}${amount}${currency}${this.secretKey}`;
    const crypto = require('crypto');
    return crypto.createHash('sha1').update(signatureString).digest('hex');
  }

  // Verify webhook signature using SHA1
  verifyWebhookSignature(body, signature) {
    if (!this.secretKey) {
      console.error('Cannot verify webhook signature: Flitt secret key is not configured');
      return false;
    }
    
    try {
      const { order_id, amount, currency } = body;
      const expectedSignature = this.generateSignature(order_id, amount, currency);
      return signature === expectedSignature;
    } catch (error) {
      console.error('Error verifying webhook signature:', error);
      return false;
    }
  }

  // Notify backend about successful payment
  async notifyBackendPayment(paymentData) {
    try {
      console.log('Notifying backend about successful payment:', paymentData);
      
      const response = await fetch(`${this.backendUrl}/paypal/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend payment notification failed:', response.status, errorText);
        return {
          success: false,
          error: `Backend request failed: ${response.status} - ${errorText}`
        };
      }

      const result = await response.json();
      console.log('Backend payment notification successful:', result);
      
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('Error notifying backend about payment:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Update payment status to success
  async updatePaymentToSuccess(paymentData) {
    try {
      console.log('Updating payment status to success:', paymentData);
      
      const response = await fetch(`${this.backendUrl}/payment/changeToSuccess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend payment status update failed:', response.status, errorText);
        return {
          success: false,
          error: `Backend request failed: ${response.status} - ${errorText}`
        };
      }

      const result = await response.json();
      console.log('Backend payment status update successful:', result);
      
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('Error updating payment status:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Create singleton instance
const flitt = new FlittConfig();

export default flitt;
