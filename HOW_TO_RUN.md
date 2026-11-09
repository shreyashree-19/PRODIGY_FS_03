# 🚀 How to Run LocalMart

## ✅ Prerequisites
Make sure you have these installed:
- **Node.js** v18 or higher → https://nodejs.org
- **npm** (comes with Node.js)

---

## 📦 Step 1 — Install Dependencies (First Time Only)

Open **PowerShell** or **Command Prompt** and run:

```powershell
# Install server dependencies
cd "c:\Users\shreya suresh\LocalMart – Local Store E-commerce Platform\server"
npm install

# Install client dependencies
cd "c:\Users\shreya suresh\LocalMart – Local Store E-commerce Platform\client"
npm install
```

---

## ▶️ Step 2 — Build the Frontend (First Time / After Changes)

```powershell
cd "c:\Users\shreya suresh\LocalMart – Local Store E-commerce Platform\client"
npm run build
```

You should see: `✓ built in X.XXs`

---

## 🌐 Step 3 — Start the Server

```powershell
cd "c:\Users\shreya suresh\LocalMart – Local Store E-commerce Platform"
node server/src/index.js
```

The server will print the URL to open:

```
══════════════════════════════════════════════════
  🛒  LocalMart is running!
  🌐  Open: http://localhost:5000
  🔐  Admin Portal → click "Admin Portal" in navbar
      Email:    admin@localmart.in
      Password: admin123
══════════════════════════════════════════════════
```

> **Note:** If port 5000 is in use, it auto-tries 3001 → 4000 → 8080 etc.
> Just open whichever URL is printed.

---

## 🔐 Admin Portal Login

1. Open the app in your browser
2. Click **"Admin Portal"** in the top-right of the navbar
3. Use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Platform Admin | `admin@localmart.in` | `admin123` |
| Store Partner | `rajesh.store@localmart.in` | `store123` |

---

## 🔄 Development Mode (Hot Reload)

Run both terminals **at the same time**:

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

Then open **http://localhost:5173** in your browser.

---

## 🛠️ Troubleshooting

| Problem | Fix |
|---------|-----|
| `EADDRINUSE` / port in use | Server auto-picks another port. Just use the printed URL. |
| `node: command not found` | Install Node.js from https://nodejs.org |
| White screen / blank page | Run `npm run build` in the `client/` folder first |
| Admin login not working | Credentials are checked locally — no server needed. Use `admin@localmart.in` / `admin123` |
| `npm install` fails | Make sure you have internet and run it inside the correct folder |

---

## 📁 Project Structure

```
LocalMart/
├── server/              ← Express.js backend (REST API)
│   └── src/
│       ├── index.js     ← Main server file
│       └── data/
│           └── mockData.js
├── client/              ← React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/  ← All UI components
│   │   ├── context/     ← Global state (cart, user, etc.)
│   │   └── services/    ← API calls
│   └── dist/            ← Built frontend (served by Express)
├── HOW_TO_RUN.md        ← This file
└── README.md            ← Full feature documentation
```

