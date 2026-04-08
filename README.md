# 🛍️ E-Commerce Shopping Cart (Frontend - SPA)

## 📌 Project Overview

This repository contains the **frontend** of a Single Page Application (SPA) for an e-commerce shopping cart system. The application allows users to browse products, filter and sort them, view product details in a modal, and manage a shopping cart dynamically without page reloads.

The frontend communicates with a RESTful backend API and provides a smooth, responsive, and modern user experience.

---

## 🔗 Related Repository

The backend for this project is maintained in a separate repository:

- Backend Repository: (https://github.com/Ruzit/Assignment1_Backend.git)

---

## 🚀 Features

### 🛍️ Product Features

- Display products dynamically from backend
- Search products by name
- Filter by category
- Sort by price and name
- Product detail modal (no page navigation)

### 🛒 Cart Features

- Add items to cart
- Update quantity
- Remove items
- Clear cart
- Live cart summary (total items & price)
- Cart count indicator in navbar

### 🎨 UI/UX Features

- Fully Single Page Application (SPA)
- No page reloads (dynamic state updates)
- Hover effects on product cards
- Category badges for products
- Image loading skeleton + fallback
- Toast notifications for user feedback
- Responsive layout (mobile-friendly)

---

## 🧰 Tech Stack

- React (Vite)
- Axios
- CSS (custom styling)

---

## 📁 Folder Structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── ProductList.jsx
│   ├── ProductCard.jsx
│   ├── ProductModal.jsx
│   ├── Cart.jsx
│   ├── CartItem.jsx
│   ├── CartSummary.jsx
│   ├── FilterBar.jsx
│   └── Toast.jsx
├── services/
│   └── api.js
├── assets/
│   └── products/
├── App.jsx
└── index.css
```

---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
npm install
```

---

### 2. Start development server

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 🔌 Backend Connection

Make sure backend is running at:

```text
http://localhost:5001
```

API base URL is configured in:

```js
src / services / api.js;
```

---

## 🎯 SPA Behavior

This application behaves as a Single Page Application because:

- Only one HTML page is used
- Components dynamically update the UI
- Product details are shown using a modal
- Cart updates without page reload
- Filtering and sorting update content dynamically

---

## ⚠️ Challenges Faced

- Handling broken image URLs → solved using local assets
- Managing shared state between components → implemented centralized updates
- Preventing UI flicker during cart updates → optimized state handling
- Implementing dynamic filtering and sorting → used query parameters with backend API
- Improving user feedback → replaced alerts with toast notifications

---

## 🔮 Future Improvements

- User authentication
- Checkout and payment integration
- Wishlist feature
- Dark mode
- Pagination

---

## 👤 Author

**Rujeet Prajapati**
