# React Product Store - Premium Edition

A **stunning, high-performance** React application that displays product data from the Fake Store API with complete CRUD operations, authentication, and optimized state management. Features a **premium design** with custom brand colors and modern UI/UX.

## 🎨 Design Theme

**Brand Colors:**
- 🟢 **Primary Green**: `#009B4D` - Modern, trustworthy, eco-friendly
- 🟡 **Tangerine Yellow**: `#FFCC00` - Energetic, optimistic, attention-grabbing  
- 🤍 **Ivory**: `#FAF5E9` - Clean, elegant, sophisticated background

**Design Features:**
- ✨ Gradient mesh backgrounds with animated floating elements
- 🔮 Glassmorphism effects for depth and modern aesthetics
- 🎭 Smooth micro-animations and hover effects
- 🌈 Premium color gradients throughout
- 📱 Fully responsive with mobile-first approach
- 🎯 Custom scrollbars and loading states

## 🚀 Features Implemented

### ✅ Core Requirements

#### 1. User Authentication
- Simple login page with UI/UX focus
- Credentials: `user` / `password`
- Protected routes - Products page only accessible after login
- **State Persistence**: Login status saved to `localStorage` for persistence across page reloads
- Logout functionality

#### 2. Data Fetching and List Display
- Fetches all products from `https://fakestoreapi.com/products`
- Responsive grid layout (1-4 columns based on screen size)
- Each product card displays:
  - Product image with hover zoom effect
  - Title (truncated with ellipsis)
  - Price (formatted as USD currency)
  - Category (capitalized)
  - Rating (stars with count)

#### 3. Product Detail View
- Modal dialog overlay for product details
- Fetches individual product data: `https://fakestoreapi.com/products/{id}`
- Displays:
  - Full product description
  - Rating (score and count with visual badge)
  - Large product image
  - All product metadata

#### 4. Product Update (PUT/PATCH)
- "Edit Product" button in detail view
- Inline editing form with fields:
  - Title
  - Price (number input)
  - Description (textarea)
  - Category
- **Optimistic Cache Updates**: After successful update, the product list automatically reflects changes without re-fetching
- Loading states during update

#### 5. Product Deletion
- "Delete Product" button in detail view
- **Confirmation Modal**: Requires user confirmation before deletion
- **Optimistic Cache Updates**: After deletion, product immediately removed from list
- Modal auto-closes after deletion

#### 6. UI / UX and Usability
- **Premium Design**: Stunning UI with gradient mesh backgrounds, glassmorphism, and custom brand colors
- **Animated Elements**: Floating background orbs, hover lift effects, and smooth transitions
- **Loading States**: Beautiful shimmer skeleton loaders with gradient effects
- **Error Handling**: User-friendly error messages with emoji icons and retry option
- **Search Functionality** (Bonus): Real-time search by product title or category with icon
- **Category Filter** (Bonus): Filter products by category with highlighted active state
- **Responsive Design**: Seamless experience on mobile, tablet, and desktop
- **Typography**: Inter font family for modern, clean readability
- **Micro-interactions**: Hover effects, scale animations, and color transitions

### ⚙️ Technical Requirements

#### 7. State Management & Caching
- **Redux Toolkit** with **RTK Query** for data fetching and state management
- **Intelligent Caching**:
  - API responses cached to prevent redundant network requests
  - Cache tags system for granular cache invalidation
  - Optimistic updates for seamless UX
  - Individual product queries cached separately from list

#### 8. Data Refresh on Window Focus (Revalidation)
- ✅ **Automatic Refetch**: Product data automatically refreshes when browser tab regains focus
- Configured via `refetchOnFocus: true` in RTK Query
- Also refetches on network reconnection (`refetchOnReconnect: true`)

#### 9. Performance Optimizations
- Component structure avoids unnecessary re-renders
- Memoized selectors with Redux
- Lazy loading of product details (only fetched when modal opens)
- Optimized images with object-fit
- TypeScript for type safety and better IDE performance

## 🛠️ Tech Stack

- **React 19** - Latest React with TypeScript
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **React Router v7** - Client-side routing
- **Tailwind CSS v3** - Utility-first styling
- **Shadcn UI** - High-quality accessible components
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icon system

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Usage

### 1. Login
1. Navigate to `http://localhost:5173`
2. Enter credentials:
   - Username: `user`
   - Password: `password`
3. Click "Sign In"

### 2. Browse Products
- View all products in a responsive grid
- Use the search bar to filter by title or category
- Click the refresh button to manually reload data
- Products automatically refresh when switching back to the tab

### 3. View Product Details
- Click on any product card to open the detail modal
- View complete product information
- See rating with visual badge

### 4. Edit Product
1. Open product details
2. Click "Edit Product"
3. Modify title, price, description, or category
4. Click "Save Changes"
5. Notice the product list updates immediately without reloading

### 5. Delete Product
1. Open product details
2. Click "Delete"
3. Confirm deletion
4. Product is immediately removed from the list

### 6. Logout
- Click "Logout" button in the header to return to login page

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   ├── ProductCard.tsx           # Product card component
│   └── ProductDetailDialog.tsx   # Product detail modal with edit/delete
├── features/
│   └── auth/
│       └── authSlice.ts          # Authentication state slice
├── pages/
│   ├── LoginPage.tsx             # Login page
│   └── ProductsPage.tsx          # Main products listing page
├── services/
│   └── productsApi.ts            # RTK Query API configuration
├── lib/
│   └── utils.ts                  # Utility functions (cn helper)
├── App.tsx                       # Main app with routing
├── store.ts                      # Redux store configuration
├── hooks.ts                      # Typed Redux hooks
├── main.tsx                      # App entry point
└── index.css                     # Global styles with Tailwind

## 🎨 Key Features Highlights

### Automatic Cache Management
The application uses RTK Query's intelligent caching:
- **Tag-based invalidation**: When a product is updated or deleted, only affected cache entries are invalidated
- **Optimistic updates**: UI updates immediately before server confirmation
- **Automatic rollback**: If server request fails, UI reverts to previous state

### Window Focus Refetch
When you switch browser tabs and come back:
1. RTK Query detects window focus
2. Automatically refetches product data
3. Updates UI with latest data from server
4. Ensures you always see current information

### Performance
- No unnecessary API calls due to smart caching
- Product list cached separately from individual products
- Component re-renders minimized with proper state scoping
- TypeScript prevents runtime errors

## 🔍 Testing the Application

1. **Login Persistence**: 
   - Login, then refresh the page
   - You should remain logged in

2. **Caching**: 
   - View a product detail
   - Close and reopen the same product
   - Notice it loads instantly from cache

3. **Optimistic Updates**:
   - Edit a product's title
   - Watch the product card update immediately
   - The change persists in the list

4. **Window Focus Revalidation**:
   - Keep the dev tools Network tab open
   - Switch to another tab for a few seconds
   - Switch back to the app
   - See the refetch request in Network tab

5. **Search**:
   - Type in the search box
   - Products filter in real-time
   - Try searching by category (e.g., "electronics")

## 📝 Notes

- The Fake Store API is a mock API, so updates and deletions don't persist on the server
- However, the application demonstrates proper cache management as if they did
- All CRUD operations work correctly with optimistic UI updates
- The app handles all network states: loading, success, and error

## 🎓 Assignment Completion Checklist

- ✅ User Authentication with localStorage persistence
- ✅ Protected routes
- ✅ Product list from API
- ✅ Product cards with image, title, price, category
- ✅ Product detail modal with full information
- ✅ Edit functionality with cache updates
- ✅ Delete functionality with confirmation
- ✅ Redux Toolkit + RTK Query for state management
- ✅ Intelligent caching
- ✅ Refetch on window focus
- ✅ Search/filter functionality (Bonus)
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design
- ✅ Clean, professional UI
- ✅ TypeScript for type safety
- ✅ Performance optimizations

## 🚀 Production Build

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.
