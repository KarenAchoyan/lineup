// Simple in-memory database for demo purposes
// In production, replace with actual database (MongoDB, PostgreSQL, etc.)

class Database {
  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.payments = new Map();
  }

  // User management
  async createUser(userData) {
    const userId = userData.user_id || Date.now().toString();
    const user = {
      user_id: userId,
      name: userData.name,
      email: userData.email,
      parent_name: userData.parent_name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    this.users.set(userId, user);
    return user;
  }

  async getUser(userId) {
    return this.users.get(userId) || null;
  }

  async updateUser(userId, updates) {
    const user = this.users.get(userId);
    if (!user) return null;
    
    const updatedUser = {
      ...user,
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Order management
  async createOrder(orderData) {
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const order = {
      order_id: orderId,
      user_id: orderData.user_id,
      amount: orderData.amount,
      currency: orderData.currency,
      description: orderData.description,
      flitt_order_id: orderData.flitt_order_id,
      flitt_token: orderData.flitt_token,
      status: 'created',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    this.orders.set(orderId, order);
    return order;
  }

  async getOrder(orderId) {
    return this.orders.get(orderId) || null;
  }

  async getOrderByFlittId(flittOrderId) {
    for (const [orderId, order] of this.orders) {
      if (order.flitt_order_id === flittOrderId) {
        return order;
      }
    }
    return null;
  }

  async updateOrder(orderId, updates) {
    const order = this.orders.get(orderId);
    if (!order) return null;
    
    const updatedOrder = {
      ...order,
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    this.orders.set(orderId, updatedOrder);
    return updatedOrder;
  }

  // Payment management
  async createPayment(paymentData) {
    const paymentId = `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const payment = {
      payment_id: paymentId,
      user_id: paymentData.user_id,
      order_id: paymentData.order_id,
      amount: paymentData.amount,
      currency: paymentData.currency,
      payment_method: paymentData.payment_method,
      status: 'completed',
      transaction_id: paymentData.transaction_id,
      created_at: new Date().toISOString()
    };
    
    this.payments.set(paymentId, payment);
    return payment;
  }

  async getPaymentsByUserId(userId) {
    const userPayments = [];
    for (const [paymentId, payment] of this.payments) {
      if (payment.user_id === userId) {
        userPayments.push(payment);
      }
    }
    return userPayments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  async hasUserPaid(userId) {
    const user = await this.getUser(userId);
    if (!user) return false;
    
    // Check if user has any completed payments
    const userPayments = await this.getPaymentsByUserId(userId);
    const hasCompletedPayment = userPayments.some(payment => payment.status === 'completed');
    
    return hasCompletedPayment;
  }
}

// Create singleton instance
const db = new Database();

export default db;
