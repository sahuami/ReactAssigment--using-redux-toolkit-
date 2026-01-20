# 🛒 React Product Store - Premium CRUD Edition

A **stunning, high-performance** React application that displays product data from the Fake Store API. This project demonstrates advanced state management using **Redux Toolkit (Manual Thunks)**, complete CRUD operations, robust authentication, and a **premium design system**.

---

## ⚡ Quick Start

### 🚀 Running Locally
1. **Install Dependencies**: `npm install`
2. **Start Development**: `npm run dev`
3. **Build for Production**: `npm run build`

### 🔑 Credentials
- **Username**: `user`
- **Password**: `password`
*State is persistent across page reloads using localStorage.*

---

## 🎨 Design System

**Brand Aesthetics:**
- 🟢 **Primary Green**: `#009B4D` - Modern, trustworthy, eco-friendly.
- 🟡 **Tangerine Yellow**: `#FFCC00` - Energetic, optimistic.
- 🤍 **Ivory**: `#FAF5E9` - Clean, elegant background layer.

**Premium Features:**
- ✨ **Gradient Mesh**: Dynamic backgrounds with animated floating orbs.
- 🔮 **Glassmorphism**: Backdrop blur effects for deep visual hierarchy.
- 🎭 **Micro-animations**: Smooth hover transitions, scale effects, and loading shimmers.
- 📱 **Responsive**: Pixel-perfect layout from mobile to ultra-wide displays.

---

## 🚀 Core Features

### 1. User Authentication
- Secure login flow with Redux state.
- **Persistence**: Login status saved to `localStorage`.
- Protected routes (App automatically redirects to login if unauthorized).

### 2. Intelligent Product Listing
- Optimized fetching using manual `createAsyncThunk`.
- Real-time **Search** (Bonus) by title or category.
- Dynamic **Category Filtering** (Bonus) with status indicators.
- Beautiful shimmer skeleton loaders for zero-layout-shift experience.

### 3. Advanced CRUD Operations
- **Create/Read**: Detailed views in modal dialogs with high-res imagery.
- **Update**: Manual merging of state to preserve fields (like image URLs) after API response.
- **Delete**: Confirmed deletion with immediate state synchronization.
- **Loading Indicators**: Button-level spinners for granular feedback.

---

## ⚙️ Technical Implementation

### State Management: Redux Toolkit
We moved from RTK Query to a **Manual Redux Setup** to showcase deep understanding of state lifecycles:
- **Product Slice**: Handles `items`, `currentProduct`, `status`, and `error`.
- **Async Thunks**: Discrete thunks for `fetchProducts`, `fetchProductById`, `updateProduct`, and `deleteProduct`.
- **Data Integrity**: Special logic in `updateProduct.fulfilled` merges API response with existing state to ensure no partial data loss (e.g., maintaining image URLs when the API only returns edited fields).

### Project Architecture
```text
src/
├── components/          # Reusable UI (ProductCard, DetailDialog)
├── features/            # Feature-centric Redux slices (Auth, Products)
├── pages/               # Page-level components (Login, Products)
├── hooks.ts             # Typed Redux hooks for AppDispatch/RootState
├── store.ts             # Central store configuration
└── index.css            # Global design tokens and tailwind utilities
```

---

## 🎯 Testing the Application

1. **Persistence Test**: Login, refresh the page, verify session remains active.
2. **Merging Logic Test**: Edit a product's price, verify the image and description remain intact in the list.
3. **Responsivity Test**: Resize the window to see the grid adapt from 1 to 4 columns.
4. **Error Handling**: Turn off internet and try to refresh; verify the user-friendly error UI.

---

## ✅ Assignment Checklist

- [x] **Redux Toolkit Integration**: Core state management.
- [x] **Protected Routes**: Navigation guards.
- [x] **Manual Thunks**: API interaction logic.
- [x] **CRUD Implementation**: Full lifecycle.
- [x] **Persistence**: Use of localStorage.
- [x] **Bonus Features**: Search & Category filters.
- [x] **Premium Design**: Gradient mesh & high-quality UI.
- [x] **TypeScript**: 100% type safety with split type imports.

---

**Built with ❤️ by Antigravity AI**
*Status: Production Ready* ✨
