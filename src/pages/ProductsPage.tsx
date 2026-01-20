import { useState, useMemo, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailDialog } from '../components/ProductDetailDialog';
import { Button } from '../components/ui/button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../features/auth/authSlice';
import { LogOut, RefreshCw, ShoppingBag, Search, Filter, ChevronDown } from 'lucide-react';
import { Input } from '../components/ui/input';
import { fetchProducts } from '../features/products/productSlice';

export default function ProductsPage() {
 const dispatch = useAppDispatch();
 const { items: products, status, error } = useAppSelector((state) => state.products);

 const isLoading = status === 'loading' && products.length === 0;
 const isRefreshing = status === 'loading' && products.length > 0;
 const isError = status === 'failed';

 const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
 const [searchTerm, setSearchTerm] = useState('');
 const [selectedCategory, setSelectedCategory] = useState<string>('all');

 useEffect(() => {
  if (status === 'idle') {
   dispatch(fetchProducts());
  }
 }, [status, dispatch]);

 const handleRefresh = () => {
  dispatch(fetchProducts());
 };

 // Get unique categories
 const categories = useMemo(() => {
  if (!products) return [];
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
  return ['all', ...uniqueCategories];
 }, [products]);

 // Filter products
 const filteredProducts = useMemo(() => {
  if (!products) return [];
  return products.filter((p) => {
   const matchesSearch =
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase());
   const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
   return matchesSearch && matchesCategory;
  });
 }, [products, searchTerm, selectedCategory]);

 return (
  <div className="min-h-screen gradient-mesh">
   {/* Premium Header */}
   <header className="sticky top-0 z-40 w-full border-b border-primary/10 glass backdrop-blur-xl shadow-sm">
    <div className="container flex h-16 items-center justify-between px-4 md:px-6">
     <div className="flex items-center gap-3 font-bold text-xl">
      <div className="p-2 gradient-primary rounded-xl shadow-md">
       <ShoppingBag className="w-5 h-5 text-white" />
      </div>
      <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
       e-Store
      </span>
     </div>

     <div className="flex items-center gap-2 md:gap-4">
      <div className="hidden md:flex relative w-72">
       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
       <Input
        placeholder="Search products..."
        className="h-10 pl-10 border-primary/20 focus:border-primary bg-white/80"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
       />
      </div>
      <Button
       variant="ghost"
       size="icon"
       onClick={handleRefresh}
       title="Refresh Data"
       className="hover:bg-primary/10"
      >
       <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-primary' : ''}`} />
      </Button>
      <Button
       variant="outline"
       size="sm"
       onClick={() => dispatch(logout())}
       className="border-primary/20 hover:bg-primary/10 hover:border-primary"
      >
       <LogOut className="mr-2 h-4 w-4" />
       Logout
      </Button>
     </div>
    </div>
   </header>

   <main className="container px-4 md:px-6 py-6 md:py-10">
    {/* Mobile Search */}
    <div className="mb-6 md:hidden relative">
     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
     <Input
      placeholder="Search products..."
      className="pl-10 border-primary/20 focus:border-primary"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
     />
    </div>

    {/* Category Filter */}
    <div className="mb-8 glass-dark p-4 rounded-xl border border-primary/10">
     <div className="flex items-center gap-2 mb-3">
      <Filter className="w-4 h-4 text-primary" />
      <h3 className="font-semibold text-sm">Filter by Category</h3>
     </div>

     {/* Desktop View - Button Group */}
     <div className="hidden md:flex flex-wrap gap-2">
      {categories.map((category) => (
       <Button
        key={category}
        variant={selectedCategory === category ? 'default' : 'outline'}
        size="sm"
        onClick={() => setSelectedCategory(category)}
        className={
         selectedCategory === category
          ? 'gradient-primary text-white shadow-md'
          : 'border-primary/20 hover:border-primary hover:bg-primary/5'
        }
       >
        {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
       </Button>
      ))}
     </div>

     {/* Mobile View - Simple Dropdown */}
     <div className="md:hidden relative">
      <select
       value={selectedCategory}
       onChange={(e) => setSelectedCategory(e.target.value)}
       className="w-full h-10 pl-3 pr-10 appearance-none border border-primary/20 rounded-lg bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
      >
       {categories.map((category) => (
        <option key={category} value={category}>
         {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
        </option>
       ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
     </div>
    </div>

    {isLoading ? (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
       <div key={i} className="h-[380px] rounded-xl bg-white/50 animate-pulse shimmer" />
      ))}
     </div>
    ) : isError ? (
     <div className="flex flex-col items-center justify-center py-20 text-center glass-dark rounded-2xl border border-primary/10">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
       <span className="text-3xl">⚠️</span>
      </div>
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
       {error || 'Failed to load products. Please check your connection and try again.'}
      </p>
      <Button onClick={handleRefresh} className="gradient-primary text-white shadow-lg">
       <RefreshCw className="mr-2 h-4 w-4" />
       Try Again
      </Button>
     </div>
    ) : (
     <>
      <div className="flex items-center justify-between mb-6">
       <div>
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
         Products
        </h2>
        <p className="text-muted-foreground text-sm mt-1">Discover amazing products at great prices</p>
       </div>
       <div className="glass-dark px-4 py-2 rounded-full border border-primary/10">
        <span className="text-sm font-semibold text-primary">{filteredProducts?.length || 0}</span>
        <span className="text-xs text-muted-foreground ml-1">results</span>
       </div>
      </div>

      {filteredProducts?.length === 0 ? (
       <div className="text-center py-20 glass-dark rounded-2xl border border-primary/10">
        <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
         <span className="text-3xl">🔍</span>
        </div>
        <p className="text-muted-foreground text-lg">
         No products found matching <span className="font-semibold text-primary">"{searchTerm}"</span>
        </p>
        <Button
         variant="outline"
         className="mt-4 border-primary/20"
         onClick={() => {
          setSearchTerm('');
          setSelectedCategory('all');
         }}
        >
         Clear Filters
        </Button>
       </div>
      ) : (
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
         <ProductCard key={product.id} product={product} onClick={(p) => setSelectedProductId(p.id)} />
        ))}
       </div>
      )}
     </>
    )}
   </main>

   <ProductDetailDialog
    productId={selectedProductId}
    open={!!selectedProductId}
    onOpenChange={(open) => !open && setSelectedProductId(null)}
   />
  </div>
 );
}
