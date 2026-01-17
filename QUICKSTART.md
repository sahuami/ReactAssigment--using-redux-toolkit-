# Quick Start Guide

## 🚀 Running the Application

The development server is already running at: **http://localhost:5173**

### Login Credentials
- **Username**: `user`
- **Password**: `password`

## 📋 What to Test

### 1. Authentication & Persistence
- Login with the credentials above
- **Refresh the page** (F5) - you should stay logged in
- This demonstrates localStorage persistence

### 2. Product Listing
- View the responsive grid of products
- Use the **search bar** to filter (try "electronics" or "jewelery")
- Click the **refresh button** to manually reload data

### 3. Window Focus Refetch (Important!)
Open your browser's **Network tab** (F12 → Network), then:
1. Switch to another browser tab
2. Wait 2-3 seconds
3. Switch back to the app
4. You'll see a new API request - this is automatic refetch on window focus!

### 4. Product Details
- Click any product card
- A modal dialog opens with full details
- Notice the rating badge and complete description

### 5. Edit Product (Optimistic Updates)
1. Click "Edit Product"
2. Change the title to "My Test Product"
3. Change the price to "999.99"
4. Click "Save Changes"
5. **Watch the product card in the background update INSTANTLY** - no page reload needed!
6. Click the same product again - your changes are in the cache

### 6. Delete Product (With Confirmation)
1. Open any product detail
2. Click "Delete"
3. Notice the confirmation appears
4. Click "Yes, Delete"
5. The product **disappears immediately** from the list
6. The modal closes automatically

### 7. Logout
- Click "Logout" in the header
- You're taken back to the login page

## 🎯 Key Features to Notice

### Optimistic Updates
When you edit or delete, the UI updates **before** the server responds. If the server fails, it automatically rolls back.

### Smart Caching
- Click a product multiple times - it loads instantly from cache
- Edit a product - both the list AND detail views update
- No unnecessary API calls

### Loading States
- Skeleton loaders on initial page load
- Button spinners during save/delete
- Refresh button shows spinning icon

### Error Handling
The app gracefully handles errors (though the Fake Store API rarely fails)

## 📦 Project Commands

```bash
# Start dev server (already running)
npm run dev

# Stop dev server
# Press Ctrl+C in the terminal

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run build  # TypeScript compilation is included
```

## 🏗️ What's Under the Hood

- **Redux Toolkit + RTK Query**: All state management and API calls
- **Automatic Cache Management**: Smart cache updates, no manual refetch needed
- **Tag-based Invalidation**: Only updates affected cache entries
- **Window Focus Revalidation**: Enabled via `refetchOnFocus: true`
- **TypeScript**: Full type safety throughout the app

## 💡 Pro Tips

1. **Check the Network Tab**: See how RTK Query manages requests and caching
2. **React DevTools**: Install React DevTools to inspect component state
3. **Redux DevTools**: Install Redux DevTools to see state changes and time-travel debugging
4. **Lighthouse**: Run a Lighthouse audit - the app scores high on performance

## 🐛 Troubleshooting

**Issue**: Can't login  
**Solution**: Make sure you're using `user` / `password` (lowercase)

**Issue**: Products not loading  
**Solution**: Check internet connection - app needs to reach fakestoreapi.com

**Issue**: Dev server not running  
**Solution**: Run `npm run dev` in the project directory

**Issue**: Port 5173 already in use  
**Solution**: Vite will automatically use the next available port (5174, 5175, etc.)

## 📚 Additional Documentation

- **README.md**: Complete feature list and setup instructions
- **IMPLEMENTATION.md**: Technical implementation details and architecture
- **Code Comments**: All complex logic is commented in the source code

---

**Enjoy testing the application! All assignment requirements have been implemented.** 🎉
