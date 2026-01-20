# React Product Store - Premium Edition

A **stunning, high-performance** React application that displays product data from the Fake Store API with complete CRUD operations, authentication, and manual state management using Redux Toolkit. Features a **premium design** with custom brand colors and modern UI/UX.

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
- Fetches all products from `https://fakestoreapi.com/products` using `createAsyncThunk`
- Responsive grid layout (1-4 columns based on screen size)
- Each product card displays:
  - Product image with hover zoom effect
  - Title (truncated with ellipsis)
  - Price (formatted as USD currency)
  - Category (capitalized)
  - Rating (stars with count)

#### 3. Product Detail View
- Modal dialog overlay for product details
- Fetches individual product data manually: `https://fakestoreapi.com/products/{id}`
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
- **Manual State Update**: After successful update, the Redux store is manually updated to reflect changes, ensuring field merging (e.g., keeping the image URL)
- Loading states during update

#### 5. Product Deletion
- "Delete Product" button in detail view
- **Confirmation Modal**: Requires user confirmation before deletion
- **Manual Store Sync**: After deletion, product is manually filtered out from the Redux store
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

#### 7. State Management
- **Redux Toolkit** core used for all state management
- **Manual Async Thunks**: `createAsyncThunk` used for all API communication
- **State Logic**: 
  - Centralized product state with loading, success, and error tracking
  - Manual merging of fields during updates to prevent data loss
  - Efficient filtering for deletions

#### 8. Performance Optimizations
- Component structure avoids unnecessary re-renders
- Memoized selectors with Redux
- TypeScript for type safety and better IDE performance
- Optimized images with object-fit

## 🛠️ Tech Stack

- **React 19** - Latest React with TypeScript
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe development
- **Redux Toolkit** - Core state management and async logic
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

### 3. View Product Details
- Click on any product card to open the detail modal
- View complete product information
- See rating with visual badge

### 4. Edit Product
1. Open product details
2. Click "Edit Product"
3. Modify title, price, description, or category
4. Click "Save Changes"
5. Notice the product list updates immediately while preserving non-edited fields (like image)

### 5. Delete Product
1. Open product details
2. Click "Delete"
3. Confirm deletion
4. Product is immediately removed from the Redux store and list UI

### 6. Logout
- Click "Logout" button in the header to return to login page

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── ProductCard.tsx           # Product card component
│   └── ProductDetailDialog.tsx   # Product detail modal with edit/delete
├── features/
│   ├── auth/
│   │   └── authSlice.ts          # Authentication state slice
│   └── products/
│       └── productSlice.ts       # Manual Redux state management (Thunks + Reducers)
├── pages/
│   ├── LoginPage.tsx             # Login page
│   └── ProductsPage.tsx          # Main products listing page
├── lib/
│   └── utils.ts                  # Utility functions
├── App.tsx                       # Main app with routing
├── store.ts                      # Redux store configuration
├── hooks.ts                      # Typed Redux hooks
├── main.tsx                      # App entry point
└── index.css                     # Global styles with Tailwind
```

## 🎨 Key Features Highlights

### Manual State Management
The application demonstrates clean manual state management using Redux Toolkit:
- **Async Thunks**: Handles the full lifecycle of API requests (pending, fulfilled, rejected)
- **State Merging**: Ensures that when a product is updated, fields not returned by the API (like the image URL) are preserved in the local state
- **UI Consistency**: Global state ensures that changes in the detail modal are immediately reflected in the main product grid

### Performance
- Minimal API calls by managing state locally after initial fetch
- Component re-renders minimized with proper state scoping
- TypeScript prevents runtime errors during development

## 📝 Notes

- The Fake Store API is a mock API, so updates and deletions don't persist on the server
- The application implements manual syncing to ensure the UI stays updated despite API limitations
- The app handles all network states: loading, success, and error

## 🎓 Assignment Completion Checklist

- ✅ User Authentication with localStorage persistence
- ✅ Protected routes
- ✅ Product list from API via manual Thunks
- ✅ Product cards with image, title, price, category
- ✅ Product detail modal with full information
- ✅ Edit functionality with manual state merging
- ✅ Delete functionality with confirmation and store sync
- ✅ Redux Toolkit for core state management
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
