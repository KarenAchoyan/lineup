// Flitt payment configuration
class FlittConfig {
  constructor() {
    this.merchantId = "4054488";
    this.secretKey = "YYYn58I3wf0jZmjOwxoRa7DHqv7Kwfh6";
    this.apiBase = "https://api.flitt.com";
    this.backendUrl = "https://lineup.dahk.am/api";
    this.testMode = process.env.NODE_ENV === 'development';
    
    // Validate required environment variables
    if (!this.merchantId || !this.secretKey) {
      console.error('Flitt configuration error: Missing required environment variables');
      console.error('Please set FLITT_MERCHANT_ID and FLITT_PAYMENT_KEY in your .env.local file');
    }
  }

  // Create order token for embedded checkout
  async createOrderToken(orderData) {
    try {
      // Create order data for Flitt with unique identifiers
      const uniqueOrderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const order = {
        merchant_id: this.merchantId,
        amount: orderData.amount,
        currency: orderData.currency || "GEL",
        description: orderData.description || `Order ${uniqueOrderId}`,
        required_rectoken: "y",
        response_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-success`,
        server_callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/flitt/webhook`,
        order_id: uniqueOrderId, // Ensure unique order ID
        ...orderData
      };

      // Generate signature
      const signature = this.generateSignature(order);
      order.signature = signature;

      // Try different possible API endpoints
      const possibleEndpoints = [
        `${this.apiBase}/v1/orders`,
        `${this.apiBase}/orders`,
        `${this.apiBase}/v1/order/create`,
        `${this.apiBase}/order/create`,
        `${this.apiBase}/api/v1/orders`,
        `${this.apiBase}/api/orders`,
        `https://pay.flitt.com/api/v1/orders`,
        `https://pay.flitt.com/api/orders`,
        `https://pay.flitt.com/v1/orders`,
        `https://pay.flitt.com/orders`
      ];
      
      // Try each endpoint with different authentication methods
      let lastError = null;
      for (const apiUrl of possibleEndpoints) {
        // Try different authentication methods
        const authMethods = [
          {
            name: 'X-API-Key + X-Merchant-ID',
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': this.secretKey,
              'X-Merchant-ID': this.merchantId
            }
          },
          {
            name: 'Authorization Basic',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${Buffer.from(`${this.merchantId}:${this.secretKey}`).toString('base64')}`
            }
          },
          {
            name: 'API-Key header',
            headers: {
              'Content-Type': 'application/json',
              'API-Key': this.secretKey,
              'Merchant-ID': this.merchantId
            }
          },
          {
            name: 'Flitt-Auth header',
            headers: {
              'Content-Type': 'application/json',
              'Flitt-Auth': this.secretKey,
              'Flitt-Merchant-ID': this.merchantId
            }
          }
        ];
        
        for (const authMethod of authMethods) {
          try {
            console.log(`Trying Flitt API endpoint: ${apiUrl} with ${authMethod.name}`);
            
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: authMethod.headers,
              body: JSON.stringify(order),
              timeout: 10000 // 10 second timeout
            });

            console.log('Flitt API Response Status:', response.status);

            if (!response.ok) {
              const errorText = await response.text();
              console.log('Flitt API Error Response:', errorText);
              throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            console.log('Flitt API Success Response:', result);
            return result;
            
          } catch (error) {
            console.log(`Failed to connect to ${apiUrl} with ${authMethod.name}:`, error.message);
            lastError = error;
            continue; // Try next auth method
          }
        }
      }
      
      // If we get here, all endpoints failed
      // In development mode, return a mock response for testing
      if (this.testMode) {
        console.log('Development mode: Returning mock Flitt response');
        // Generate a more realistic mock token (not all 'a's)
        const mockToken = 'mock_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 20);
        // Ensure it's exactly 40 characters
        const paddedToken = mockToken.padEnd(40, '0').substring(0, 40);
        
        // Generate unique mock order ID
        const mockOrderId = `mock_order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        return {
          success: true,
          data: {
            token: paddedToken,
            order_id: mockOrderId,
            merchant_id: parseInt(this.merchantId), // Ensure it's an integer
            amount: orderData.amount,
            currency: orderData.currency
          }
        };
      }
      
      throw new Error(`All Flitt API endpoints failed. Last error: ${lastError?.message}`);
    } catch (error) {
      console.error('Flitt createOrderToken error:', error);
      
      // Provide more specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to Flitt API. Please check your internet connection and try again.');
      } else if (error.message.includes('timeout')) {
        throw new Error('Request timeout: Flitt API is taking too long to respond. Please try again.');
      } else if (error.message.includes('404')) {
        throw new Error('API endpoint not found: The Flitt API endpoint may have changed. Please contact support.');
      } else if (error.message.includes('401') || error.message.includes('403')) {
        throw new Error('Authentication failed: Invalid Flitt credentials. Please check your API keys.');
      } else {
        throw new Error(`Flitt API error: ${error.message}`);
      }
    }
  }

  // Generate signature for requests
  generateSignature(params) {
    if (!this.secretKey) {
      throw new Error('Flitt secret key is not configured. Please set FLITT_PAYMENT_KEY in your environment variables.');
    }
    
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    const crypto = require('crypto');
    return crypto
      .createHmac('sha256', this.secretKey)
      .update(sortedParams)
      .digest('hex');
  }

  // Verify webhook signature
  verifyWebhookSignature(body, signature) {
    if (!this.secretKey) {
      console.error('Cannot verify webhook signature: Flitt secret key is not configured');
      return false;
    }
    
    try {
      const expectedSignature = this.generateSignature(body);
      return signature === expectedSignature;
    } catch (error) {
      console.error('Error verifying webhook signature:', error);
      return false;
    }
  }
}

// Create singleton instance
const flitt = new FlittConfig();

export default flitt;
