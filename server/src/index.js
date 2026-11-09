import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  mockStores,
  mockCategories,
  mockProducts,
  mockCoupons,
  mockMealKits,
  mockUsers,
  mockOrders
} from './data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend assets from client/dist if present
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// In-memory mutable state for runtime operations
let stores = [...mockStores];
let products = [...mockProducts];
let coupons = [...mockCoupons];
let orders = [...mockOrders];
let users = [...mockUsers];
let currentUser = users[0]; // Default to Aarav Sharma (Customer)

// ----------------- STORES -----------------
app.get('/api/stores', (req, res) => {
  const { category, search } = req.query;
  let result = [...stores];

  if (category && category !== 'all') {
    result = result.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/stores/:id', (req, res) => {
  const store = stores.find(s => s.id === req.params.id);
  if (!store) {
    return res.status(404).json({ success: false, message: 'Store not found' });
  }
  const storeProducts = products.filter(p => p.storeId === req.params.id);
  res.json({ success: true, data: { ...store, products: storeProducts } });
});

// ----------------- CATEGORIES -----------------
app.get('/api/categories', (req, res) => {
  res.json({ success: true, data: mockCategories });
});

// ----------------- PRODUCTS -----------------
app.get('/api/products', (req, res) => {
  const {
    category,
    storeId,
    search,
    minPrice,
    maxPrice,
    inStockOnly,
    rating,
    sort,
    tag
  } = req.query;

  let result = [...products];

  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }

  if (storeId) {
    result = result.filter(p => p.storeId === storeId);
  }

  if (tag) {
    result = result.filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
  }

  if (inStockOnly === 'true') {
    result = result.filter(p => p.stock > 0);
  }

  if (minPrice) {
    result = result.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    result = result.filter(p => p.price <= Number(maxPrice));
  }

  if (rating) {
    result = result.filter(p => p.rating >= Number(rating));
  }

  if (search) {
    const q = search.toLowerCase().trim();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.storeName.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (sort === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'popular') {
    result.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  res.json({
    success: true,
    total: result.length,
    data: result
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  // Related products from same category or store
  const related = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.storeId === product.storeId))
    .slice(0, 4);

  res.json({
    success: true,
    data: product,
    related
  });
});

// ----------------- COUPONS -----------------
app.get('/api/coupons', (req, res) => {
  res.json({ success: true, data: coupons });
});

app.post('/api/coupons/validate', (req, res) => {
  const { code, cartTotal } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Coupon code required' });
  }

  const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
  }

  if (cartTotal < coupon.minOrderValue) {
    return res.status(400).json({
      success: false,
      message: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue}`
    });
  }

  let discountAmount = 0;
  if (coupon.discountPercent > 0) {
    discountAmount = Math.min(
      Math.round((cartTotal * coupon.discountPercent) / 100),
      coupon.maxDiscount
    );
  } else {
    discountAmount = coupon.flatDiscount;
  }

  res.json({
    success: true,
    data: {
      code: coupon.code,
      discountAmount,
      description: coupon.description
    }
  });
});

// ----------------- MEAL KITS / AI CHEF -----------------
app.get('/api/meal-kits', (req, res) => {
  const enrichedKits = mockMealKits.map(kit => {
    const kitProducts = kit.productIds.map(id => products.find(p => p.id === id)).filter(Boolean);
    return { ...kit, products: kitProducts };
  });
  res.json({ success: true, data: enrichedKits });
});

// ----------------- AI RECOMMENDATIONS & SMART CHAT -----------------
app.post('/api/ai/recommend', (req, res) => {
  const { query, currentCart = [] } = req.body;
  
  // Suggest based on items in cart or mood/recipe prompt
  let suggestions = [];
  if (query) {
    const q = query.toLowerCase();
    suggestions = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    );
  } else if (currentCart.length > 0) {
    const cartCategories = currentCart.map(item => item.category);
    suggestions = products.filter(p =>
      !currentCart.some(c => c.id === p.id) &&
      cartCategories.includes(p.category)
    );
  }

  if (suggestions.length === 0) {
    suggestions = products.filter(p => p.featured || p.isTrending).slice(0, 4);
  }

  res.json({
    success: true,
    data: suggestions.slice(0, 4),
    insight: "Curated based on fresh availability in your Indiranagar delivery cluster."
  });
});

// ----------------- ORDERS -----------------
app.get('/api/orders', (req, res) => {
  // If role is store_owner, filter by store
  if (currentUser && currentUser.role === 'store_owner' && currentUser.storeId) {
    const storeOrders = orders.filter(o => o.storeId === currentUser.storeId);
    return res.json({ success: true, data: storeOrders });
  }
  // If role is customer, show only their orders
  if (currentUser && currentUser.role === 'customer') {
    const userOrders = orders.filter(o => o.userId === currentUser.id);
    return res.json({ success: true, data: userOrders });
  }
  // Admin sees all
  res.json({ success: true, data: orders });
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.json({ success: true, data: order });
});

app.post('/api/orders', (req, res) => {
  const {
    items,
    storeId,
    storeName,
    itemTotal,
    deliveryFee,
    discount,
    couponApplied,
    coinsRedeemed,
    total,
    paymentMethod,
    deliveryAddress,
    slot
  } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
  }

  const newOrderId = `LM-${Math.floor(10000 + Math.random() * 90000)}`;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Deduct coins if redeemed, and award 5% coins for next purchase
  const coinsEarned = Math.round(total * 0.05);
  if (currentUser) {
    currentUser.coins = Math.max(0, currentUser.coins - (coinsRedeemed || 0) + coinsEarned);
  }

  // Reduce product stock
  items.forEach(item => {
    const prod = products.find(p => p.id === item.productId || p.id === item.id);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
    }
  });

  const newOrder = {
    id: newOrderId,
    createdAt: now.toISOString(),
    userId: currentUser ? currentUser.id : "user-1",
    customerName: currentUser ? currentUser.name : "Aarav Sharma",
    customerPhone: currentUser ? currentUser.phone : "+91 98201 44552",
    storeId: storeId || "store-1",
    storeName: storeName || "Green Grocers & Farm Fresh",
    status: "Confirmed",
    deliveryPartner: {
      name: "Ramesh Nayak (Hero #402)",
      phone: "+91 98860 91823",
      vehicle: "Hero Electric Optima",
      rating: 4.9
    },
    items,
    itemTotal,
    deliveryFee: deliveryFee || 0,
    discount: discount || 0,
    couponApplied: couponApplied || null,
    coinsRedeemed: coinsRedeemed || 0,
    coinsEarned,
    total,
    paymentMethod: paymentMethod || "Cash on Delivery",
    paymentStatus: paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
    deliveryAddress: deliveryAddress || "12th Main Rd, Indiranagar, Bengaluru - 560038",
    slot: slot || "Instant (15-25 mins)",
    timeline: [
      { step: "Order Placed", time: timeStr, completed: true },
      { step: "Store Accepted & Packed", time: "Pending", completed: false },
      { step: "Out for Delivery", time: "Pending", completed: false },
      { step: "Delivered", time: "Pending", completed: false }
    ]
  };

  orders.unshift(newOrder);

  res.status(201).json({
    success: true,
    message: "Order placed successfully!",
    data: newOrder,
    coinsEarned,
    currentCoins: currentUser ? currentUser.coins : 380
  });
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  order.status = status;
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (status === 'Packed') {
    order.timeline[1].completed = true;
    order.timeline[1].time = now;
  } else if (status === 'Out for Delivery') {
    order.timeline[1].completed = true;
    order.timeline[2].completed = true;
    order.timeline[2].time = now;
  } else if (status === 'Delivered') {
    order.timeline.forEach(t => t.completed = true);
    order.timeline[3].time = now;
    order.paymentStatus = 'Paid';
  }

  res.json({ success: true, data: order });
});

app.post('/api/orders/:id/cancel', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  if (order.status === 'Delivered') {
    return res.status(400).json({ success: false, message: 'Delivered orders cannot be cancelled' });
  }

  order.status = 'Cancelled';
  res.json({ success: true, message: 'Order cancelled successfully', data: order });
});

// ----------------- AUTHENTICATION -----------------
app.get('/api/auth/me', (req, res) => {
  res.json({ success: true, data: currentUser });
});

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }

  const cleanEmail = email.toLowerCase().trim();

  // Platform Admin
  if (cleanEmail === 'admin@localmart.in' && (password === 'admin123' || password === 'admin')) {
    const adminUser = users.find(u => u.role === 'admin') || {
      id: 'user-3',
      name: 'Admin Team',
      email: 'admin@localmart.in',
      role: 'admin',
      phone: '+91 80 4000 8888',
      coins: 9999,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    };
    currentUser = adminUser;
    return res.json({ success: true, message: 'Admin authentication successful', data: currentUser });
  }

  // Store Partner / Merchant
  if (cleanEmail === 'rajesh.store@localmart.in' && (password === 'store123' || password === 'store')) {
    const storeUser = users.find(u => u.role === 'store_owner') || {
      id: 'user-2',
      name: 'Rajesh Kumar (Store Partner)',
      email: 'rajesh.store@localmart.in',
      role: 'store_owner',
      phone: '+91 98450 12890',
      storeId: 'store-1',
      coins: 500,
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80'
    };
    currentUser = storeUser;
    return res.json({ success: true, message: 'Store Partner authentication successful', data: currentUser });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials. Use admin@localmart.in / admin123 or rajesh.store@localmart.in / store123'
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;
  let found = null;

  if (role) {
    found = users.find(u => u.role === role);
  } else if (email) {
    found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  if (!found) {
    // If not found, create guest / customer
    found = {
      id: `user-${Date.now()}`,
      name: email ? email.split('@')[0] : 'Valued Customer',
      email: email || 'customer@localmart.in',
      role: 'customer',
      phone: '+91 98800 00000',
      coins: 100,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      savedAddresses: [
        {
          id: 'addr-default',
          label: 'Home',
          name: email ? email.split('@')[0] : 'Valued Customer',
          phone: '+91 98800 00000',
          flat: 'Apartment 101, Palm Grove',
          area: '100ft Road, Indiranagar',
          city: 'Bengaluru',
          pincode: '560038',
          isDefault: true
        }
      ]
    };
    users.push(found);
  }

  currentUser = found;
  res.json({ success: true, message: 'Logged in successfully', data: currentUser });
});

app.put('/api/auth/profile', (req, res) => {
  const { name, phone, address } = req.body;
  if (!currentUser) {
    return res.status(401).json({ success: false, message: 'Not logged in' });
  }

  if (name) currentUser.name = name;
  if (phone) currentUser.phone = phone;
  if (address) {
    if (!currentUser.savedAddresses) currentUser.savedAddresses = [];
    const newAddr = {
      id: `addr-${Date.now()}`,
      ...address,
      isDefault: currentUser.savedAddresses.length === 0
    };
    currentUser.savedAddresses.push(newAddr);
  }

  res.json({ success: true, data: currentUser });
});

// ----------------- ADMIN DASHBOARD -----------------
app.get('/api/admin/metrics', (req, res) => {
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrders = orders.length;
  const activeStores = stores.length;
  const totalProducts = products.length;
  const lowStockItems = products.filter(p => p.stock < 10);

  // Daily revenue chart mock data
  const revenueHistory = [
    { day: "Mon", revenue: 14200, orders: 38 },
    { day: "Tue", revenue: 18900, orders: 49 },
    { day: "Wed", revenue: 16400, orders: 42 },
    { day: "Thu", revenue: 21500, orders: 56 },
    { day: "Fri", revenue: 29800, orders: 78 },
    { day: "Sat", revenue: 38400, orders: 98 },
    { day: "Sun", revenue: 42100, orders: 114 }
  ];

  const categoryShare = [
    { name: "Fresh Produce", percentage: 38 },
    { name: "Dairy & Bakery", percentage: 28 },
    { name: "Gourmet Staples", percentage: 18 },
    { name: "Snacks & Drinks", percentage: 16 }
  ];

  res.json({
    success: true,
    data: {
      totalRevenue: totalRevenue + 181300, // Cumulative demo revenue
      totalOrders: totalOrders + 475,
      activeStores,
      totalProducts,
      avgDeliveryMinutes: 17,
      customerSatisfaction: 4.88,
      lowStockItems,
      revenueHistory,
      categoryShare
    }
  });
});

app.post('/api/admin/products', (req, res) => {
  const { name, category, storeId, price, originalPrice, unit, description, stock, image, badge } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ success: false, message: 'Name, price and category required' });
  }

  const store = stores.find(s => s.id === storeId) || stores[0];

  const newProduct = {
    id: `prod-${Date.now()}`,
    name,
    category,
    storeId: store.id,
    storeName: store.name,
    price: Number(price),
    originalPrice: Number(originalPrice || price),
    unit: unit || '1 pack',
    rating: 5.0,
    reviewsCount: 1,
    stock: Number(stock || 10),
    image: image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    badge: badge || 'New Arrival',
    tags: [category, 'Local Store'],
    description: description || 'Fresh high-quality item from your neighborhood store.',
    specifications: {
      "Source": store.name,
      "Packaging": "Eco-friendly recyclable"
    },
    nutrition: null,
    featured: false,
    isTrending: true
  };

  products.unshift(newProduct);
  res.status(201).json({ success: true, message: 'Product added successfully', data: newProduct });
});

app.put('/api/admin/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  products[idx] = { ...products[idx], ...req.body };
  res.json({ success: true, data: products[idx] });
});

app.patch('/api/admin/products/:id/stock', (req, res) => {
  const prod = products.find(p => p.id === req.params.id);
  if (!prod) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  prod.stock = prod.stock > 0 ? 0 : 25; // Toggle in/out of stock
  res.json({ success: true, data: prod });
});

app.delete('/api/admin/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const deleted = products.splice(idx, 1);
  res.json({ success: true, message: 'Product removed', data: deleted[0] });
});

// Fallback all non-API GET requests to client/dist/index.html
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  } else {
    res.status(404).json({ success: false, message: 'API route not found' });
  }
});

// Start server — scan ports until a free one is found
const PREFERRED_PORTS = [5000, 3001, 3002, 4000, 4001, 4500, 8080, 8081, 8888, 9000];

const startServer = (portList) => {
  if (portList.length === 0) {
    console.error('✖  No free port found in the candidate list. Please free a port and restart.');
    process.exit(1);
  }

  const [port, ...rest] = portList;
  const server = app.listen(port, () => {
    console.log('');
    console.log('══════════════════════════════════════════════════');
    console.log(`  🛒  LocalMart is running!`);
    console.log(`  🌐  Open: http://localhost:${port}`);
    console.log(`  🔐  Admin Portal → click "Admin Portal" in navbar`);
    console.log(`      Email:    admin@localmart.in`);
    console.log(`      Password: admin123`);
    console.log('══════════════════════════════════════════════════');
    console.log('');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠  Port ${port} is in use — trying ${rest[0] ?? 'next'}...`);
      startServer(rest);
    } else {
      throw err;
    }
  });
};

startServer(PREFERRED_PORTS);
