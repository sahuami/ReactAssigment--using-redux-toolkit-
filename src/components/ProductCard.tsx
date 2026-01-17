import type { Product } from '../services/productsApi';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Star } from 'lucide-react';

interface ProductCardProps {
 product: Product;
 onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
 return (
  <Card
   className="h-full flex flex-col overflow-hidden hover-lift cursor-pointer group bg-white border-primary/10 shadow-md hover:shadow-2xl transition-all duration-300"
   onClick={() => onClick(product)}
  >
   <div className="relative pt-[100%] bg-gradient-to-br from-muted/30 to-muted/10 m-4 rounded-xl overflow-hidden">
    <img
     src={product.image}
     alt={product.title}
     className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
    />
    <div className="absolute top-2 right-2 glass px-2 py-1 rounded-full">
     <span className="text-xs font-semibold text-primary capitalize">{product.category}</span>
    </div>
   </div>

   <CardHeader className="p-4 pt-2">
    <h3 className="font-semibold text-base line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors" title={product.title}>
     {product.title}
    </h3>
   </CardHeader>

   <CardContent className="p-4 pt-0 flex-grow">
    <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-yellow-100 px-2 py-1 rounded-lg w-fit">
     <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
     <span className="text-sm font-semibold text-yellow-700">{product.rating?.rate}</span>
     <span className="text-xs text-yellow-600">({product.rating?.count})</span>
    </div>
   </CardContent>

   <CardFooter className="p-4 pt-0 flex justify-between items-center mt-auto border-t border-primary/5">
    <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
     {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
    </span>
    <Button
     size="sm"
     className="gradient-accent text-foreground font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
     onClick={(e) => { e.stopPropagation(); onClick(product); }}
    >
     View
    </Button>
   </CardFooter>
  </Card>
 );
}
