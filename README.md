# <img src="./src/assets/logo.svg" width="40" /> TazaDeal – Your online Local Market.

TazaDeal is a multi-vendor eCommerce platform focused on real-time grocery price tracking from local markets. Vendors can list fresh products with daily prices. Buyers can compare, review, and make secure purchases—all while building community trust.

## ✅ Purpose

To empower local vendors and buyers with a transparent and community-driven marketplace that reflects **live market prices**, authentic vendor listings, and secure transactions.

---

🔗 **Live Preview**: [https://tazadeal-2c294.web.app](https://tazadeal-2c294.web.app)

---

## 🚀 Key Features

- 🛒 Explore real-time product prices from local markets
- ✅ Vendor verification system and admin approval
- 📈 Price history chart & product comparison
- 👥 Role-based access: Admin, Vendor, Buyer
- 📦 Add to Watchlist feature (per user)
- ✨ Butter-smooth UI with Framer Motion & Tailwind CSS
- 🔍 **Explore Products** – Filter, sort, and browse all local items by category, price, or date
- 📈 **Price History** – Each product includes historical price tracking
- 💳 **Secure Purchase** – Integrated with **Stripe** for secure online payments
- 🔐 **Authentication** – Firebase Auth (JWT-based)
- ⭐ **User Reviews** – Buyers can leave reviews; vendors can reply
- 📋 **Watchlist** – Save your favorite items to a private watchlist
- 🧮 **Vendor Dashboard** – Track your products, orders, and earnings
- ⚙️ **Admin Panel** – Manage users, products, approvals, and roles
- 📊 **Price Comparison** – Compare past and current prices of a product visually (Recharts)
- 📅 **Date Filtering** – Browse products by specific market date
- 🌍 **Responsive Design** – Optimized for all screen sizes

---

## 🧱 Tech Stack

**Frontend Framework**:  
- `React` + `React Router v6`  
- `Tailwind CSS` + `DaisyUI`  
- `Framer Motion` for animation  
- `TanStack Query` for fetching & caching  
- `Axios` with `useAxiosSecure` interceptor  
- `Stripe` for payments  
- `Firebase Auth` for user management  
- `JWT` (manual via HTTP-only cookie)

**Charting & UI**:  
- `Recharts` for price trends  
- `React Icons`,   
- `React Datepicker`  
- `SweetAlert2`, `Toast notifications`

---

## 📦 Installed Dependencies

```json
"@dr.pogodin/react-helmet": "^3.0.2",
"@stripe/react-stripe-js": "^3.7.0",
"@stripe/stripe-js": "^7.4.0",
"@tailwindcss/vite": "^4.1.11",
"@tanstack/react-query": "^5.81.5",
"axios": "^1.10.0",
"date-fns": "^4.1.0",
"firebase": "^11.10.0",
"framer-motion": "^12.23.0",
"react": "^19.1.0",
"react-datepicker": "^8.4.0",
"react-dom": "^19.1.0",
"react-helmet": "^6.1.0",
"react-hook-form": "^7.60.0",
"react-icons": "^5.5.0",
"react-rating": "^2.0.5",
"react-router": "^7.6.3",
"react-toastify": "^11.0.5",
"recharts": "^3.0.2",
"sweetalert2": "^11.22.2",
"swiper": "^11.2.10"
```

## 📁 Folder Structure (Client)
<pre>
📦 src
├── 📁 assets # Static assets & images
├── 📁 Components # Reusable components
│   ├── Common # shared.
│   ├── Product # SingleProduct, Details, etc.
│   ├── Reviews # Review section
│   └── UI # Pagination, Toasts, Spinners
├── 📁 Context # Global state providers and context
├── 📁 Firebase # Firebase config & initialization
├── 📁 Hooks # Custom hooks (e.g., useAxiosSecure, useWatchlistCount)
├── 📁 Layout # Layout wrappers (Dashboard, Main, Auth Layouts)
├── 📁 Libs # Animation utilities and constants
├── Pages/                 # Route-level pages
│   ├── Auth/              # Login/Register pages
│   ├── Dashboard/         # Vendor/Admin-specific dashboards
│   └── ...                # Other public pages (Home, Products, etc.)
├── 📁 Routes # React Router configuration
├── App.jsx # Root component
├── main.jsx # Entry point
├── index.css
├── index.html
├── app.css
├── package.json
├── vite.config.js

</pre>

---

## 🔐 Auth Flow

- Firebase handles authentication (email/password)
- After login, a custom JWT token is generated and stored in localStorage
- Token is sent via Axios headers to authenticate private endpoints

---

## 🔐 Environment Variables (`.env.local`)

```env
VITE_API_URL=https://your-backend-api.com
VITE_STRIPE_PK_KEY=pk_test_xxxxxxxxxxxxxxx
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx
```


## 🧪 Future Improvements

- Add search & filter with fuzzy matching
- Real-time chat between buyer and vendor (WhatsApp Integration)
- Admin dashboard analytics
- Order confirmation mailer (Nodemailer or 3rd-party)

## 👨‍💻 Author
Monisha Rema

🎯 Junior MERN Stack Developer | Passionate about building scalable apps

🌐 [LinkedIn](https://www.linkedin.com/in/monisha-rema-web-developer/) | [GitHub](https://github.com/monishaRema) | [Portfolio](https://portfolio-monisha.surge.sh/)


💡 “TazaDeal – empowering community markets through trust, tech, and transparency.”