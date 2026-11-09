# LocalMart – Next-Generation Local E-commerce Platform

**LocalMart** is a premium, modern, and fully functional hyperlocal store e-commerce application designed to digitally empower local neighborhood retailers and artisan producers, offering customers an ultra-convenient 15-minute delivery experience comparable to platforms like Blinkit, Zepto, and modern Shopify storefronts.

---

## 🌟 Key Features & Innovations

### 1. Modern Visual Identity & UI/UX
- **Aesthetic Design System:** Clean visual hierarchy, glassmorphism, soft drop shadows, and fresh Emerald & Amber color accents.
- **Light & Dark Mode:** Native toggle with persistent theme preference across sessions.
- **Responsive Layout:** Optimized for desktop monitors, laptops, tablets, and mobile smartphones.
- **Framer Motion Micro-Interactions:** Smooth transitions on hover, cart operations, modals, and checkout progress.

### 2. Smart Homepage & Discovery
- **Neighborhood Location Selector:** Seamlessly switch delivery clusters (Indiranagar, Koramangala, Domlur, HSR Layout, Whitefield) with instant delivery time calculations (10–15 mins).
- **Interactive Hero Carousel:** Highlights seasonal harvest (Ratnagiri Alphonso mangoes, organic hydroponic greens, 7 AM morning sourdough).
- **Smart Deals & Flash Sales:** Live countdown timer with fire badges and up to 30% discount highlights.
- **Visual Category Grid:** Quick access to Fresh Produce, Bakery & Dairy, Gourmet Staples, Snacks & Cold Brews, and Wellness Chemist.
- **AI Chef & Grocery Kit Builder:** 1-click recipe kit ordering (e.g., *Paneer Butter Masala Dinner Kit*, *Healthy Morning Breakfast Basket*) and interactive prompt assistant.
- **Local Store Finder:** Interactive directory of verified family-owned shops with distance, ratings, address, contact, and store-specific shelf browsing.

### 3. Intelligent Shopping Cart & Smart Checkout
- **Slide-Over Basket Drawer:** Live quantity adjustments, item removals, and instant subtotal recalculation.
- **Free Delivery Milestone Bar:** Visual progress meter encouraging basket size optimization (Free delivery above ₹249).
- **Promo Coupon Engine:** Validates promo codes like `WELCOME50`, `LOCALMART20`, `FREEDEL`, and `SUPER100` with 1-click apply chips.
- **Digital Loyalty Coins (LocalCoins):** Earn 5% back on every purchase; redeem coins dynamically via a dedicated slider to deduct from your bill.
- **Multi-Step Checkout:** Address selection, delivery speed slot (Instant 15-25m, Evening, Tomorrow Morning), and payment mode (COD / Simulated Express Razorpay UPI).
- **Confetti Celebration:** Rewarding animation on order placement with unique order ID (`LM-XXXXX`).

### 4. Live Order Tracking & Quick Reorder
- **Interactive Order Tracking:** Real-time animated status stepper (*Order Placed* → *Store Packed* → *Out for Delivery* → *Delivered*).
- **Live Simulator Button:** Interactive "*Simulate Next Step*" button to advance delivery status in real-time.
- **Delivery Partner Spotlight:** Live runner details (Name, vehicle info, star rating, direct call button).
- **1-Click Quick Reorder:** Instantly repopulate past order baskets for lightning-fast repeat purchases.

### 5. Side-by-Side Product Comparison
- Compare up to 4 items simultaneously across unit pricing, customer ratings, merchant origin, stock levels, and nutritional highlights.

### 6. Admin & Merchant Dashboard
- Switch seamlessly between customer storefront and the **Admin Command Center**.
- **Real-Time KPIs:** Gross Revenue, Total Orders, Active Store Partners, Average Delivery ETA, and 4.88★ Customer Satisfaction.
- **Weekly Sales Velocity Chart:** Visual revenue bar chart across days of the week.
- **Live Order Fulfillment Queue:** View customer orders and transition fulfillment stages.
- **Product & Inventory Master:** Add new products with image, price, and specs; toggle stock in/out of stock; delete obsolete listings.
- **Coupon Manager:** View and manage active discount codes.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend:** Node.js, Express.js REST API architecture.
- **Data & State:** In-memory reactive state with rich seed data for stores, products, coupons, users, and orders, with full persistent localStorage support.
- **PWA:** Web App Manifest (`manifest.json`) and Service Worker (`sw.js`) for app-like installability.

---

## 🚀 Getting Started

### 1. Run the Full-Stack Production Application (Recommended)

Open a **PowerShell or Command Prompt** window and run:

```powershell
cd "c:\Users\shreya suresh\LocalMart – Local Store E-commerce Platform"
node server/src/index.js
```

The server will automatically try port **5000**, and fall back to **3001** or **3002** if already in use.  
Open the URL printed in the console (e.g. `http://localhost:5000` or `http://localhost:3001`).

> **If port 5000 is in use by something else**, find and free it:
> ```powershell
> netstat -ano | findstr ":5000"
> # Then: taskkill /PID <PID> /F
> ```

### 2. Development Mode (Hot Reload)

**Terminal 1 — Backend:**
```powershell
cd "c:\Users\shreya suresh\LocalMart – Local Store E-commerce Platform\server"
npm run dev
```

**Terminal 2 — Frontend:**
```powershell
cd "c:\Users\shreya suresh\LocalMart – Local Store E-commerce Platform\client"
npm run dev
```
Open **http://localhost:5173** in your browser.

> **Note:** If your backend started on 3001 instead of 5000, update the proxy target in  
> `client/vite.config.ts` → change `target: 'http://localhost:5000'` to `'http://localhost:3001'`

---

## 🔐 Admin Portal Login

Navigate to `http://localhost:<PORT>` → click **"Admin Portal"** in the top navbar.

| Role | Email | Password |
|------|-------|----------|
| Platform Admin | `admin@localmart.in` | `admin123` |
| Store Partner | `rajesh.store@localmart.in` | `store123` |


