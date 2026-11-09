import { Product, Store, Category, Order, User, Coupon, MealKit } from '../types';

const API_BASE = '/api';

export const api = {
  async getStores(category?: string, search?: string): Promise<Store[]> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    const res = await fetch(`${API_BASE}/stores?${params.toString()}`);
    const data = await res.json();
    return data.data;
  },

  async getStoreById(id: string): Promise<Store & { products: Product[] }> {
    const res = await fetch(`${API_BASE}/stores/${id}`);
    const data = await res.json();
    return data.data;
  },

  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_BASE}/categories`);
    const data = await res.json();
    return data.data;
  },

  async getProducts(filters: Record<string, string | number | boolean> = {}): Promise<Product[]> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params.append(key, String(val));
      }
    });
    const res = await fetch(`${API_BASE}/products?${params.toString()}`);
    const data = await res.json();
    return data.data;
  },

  async getProductById(id: string): Promise<{ data: Product; related: Product[] }> {
    const res = await fetch(`${API_BASE}/products/${id}`);
    const data = await res.json();
    return data;
  },

  async getCoupons(): Promise<Coupon[]> {
    const res = await fetch(`${API_BASE}/coupons`);
    const data = await res.json();
    return data.data;
  },

  async validateCoupon(code: string, cartTotal: number): Promise<{ discountAmount: number; code: string; description: string }> {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, cartTotal })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Invalid coupon');
    return data.data;
  },

  async getMealKits(): Promise<MealKit[]> {
    const res = await fetch(`${API_BASE}/meal-kits`);
    const data = await res.json();
    return data.data;
  },

  async getAiRecommendations(query?: string, currentCart: Product[] = []): Promise<{ data: Product[]; insight: string }> {
    const res = await fetch(`${API_BASE}/ai/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, currentCart })
    });
    const data = await res.json();
    return data;
  },

  async getOrders(): Promise<Order[]> {
    const res = await fetch(`${API_BASE}/orders`);
    const data = await res.json();
    return data.data;
  },

  async getOrderById(id: string): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders/${id}`);
    const data = await res.json();
    return data.data;
  },

  async createOrder(orderPayload: any): Promise<{ data: Order; coinsEarned: number; currentCoins: number }> {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to place order');
    return data;
  },

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    return data.data;
  },

  async cancelOrder(orderId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/orders/${orderId}/cancel`, {
      method: 'POST'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Cannot cancel order');
  },

  async getCurrentUser(): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/me`);
    const data = await res.json();
    return data.data;
  },

  async login(email?: string, role?: string): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role })
    });
    const data = await res.json();
    return data.data;
  },

  async adminLogin(email: string, password: string): Promise<User> {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Authentication failed');
    return data.data;
  },

  async updateProfile(updates: any): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    return data.data;
  },

  async getAdminMetrics(): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/metrics`);
    const data = await res.json();
    return data.data;
  },

  async addAdminProduct(productData: any): Promise<Product> {
    const res = await fetch(`${API_BASE}/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    const data = await res.json();
    return data.data;
  },

  async toggleProductStock(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/admin/products/${id}/stock`, {
      method: 'PATCH'
    });
    const data = await res.json();
    return data.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'DELETE'
    });
  }
};

