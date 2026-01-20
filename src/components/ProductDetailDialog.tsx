import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProductById, updateProduct, deleteProduct, clearCurrentProduct } from '../features/products/productSlice';
import type { Product } from '../features/products/productSlice';
import { Loader2, Trash2, Edit2, Star } from 'lucide-react';

interface ProductDetailDialogProps {
 productId: number | null;
 open: boolean;
 onOpenChange: (open: boolean) => void;
}

export function ProductDetailDialog({ productId, open, onOpenChange }: ProductDetailDialogProps) {
 const dispatch = useAppDispatch();
 const { currentProduct: product, status } = useAppSelector((state) => state.products);

 const isLoading = status === 'loading' && !product;
 const isError = status === 'failed';
 const [localUpdating, setLocalUpdating] = useState(false);
 const [localDeleting, setLocalDeleting] = useState(false);

 const [isEditing, setIsEditing] = useState(false);
 const [editForm, setEditForm] = useState<Partial<Product>>({});
 const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);

 useEffect(() => {
  if (open && productId) {
   dispatch(fetchProductById(String(productId)));
  }
  if (!open) {
   dispatch(clearCurrentProduct());
   setIsEditing(false);
   setIsDeleteConfirming(false);
   setEditForm({});
  }
 }, [open, productId, dispatch]);

 useEffect(() => {
  if (product) {
   setEditForm({
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
   });
  }
 }, [product]);

 const handleUpdate = async () => {
  if (!productId) return;
  setLocalUpdating(true);
  try {
   await dispatch(
    updateProduct({
     id: productId,
     ...editForm,
     price: editForm.price !== undefined ? Number(editForm.price) : undefined,
    })
   ).unwrap();
   setIsEditing(false);
  } catch (err) {
   console.error('Failed to update product', err);
  } finally {
   setLocalUpdating(false);
  }
 };

 const handleDelete = async () => {
  if (!productId) return;
  setLocalDeleting(true);
  try {
   await dispatch(deleteProduct(productId)).unwrap();
   onOpenChange(false);
  } catch (err) {
   console.error('Failed to delete product', err);
  } finally {
   setLocalDeleting(false);
  }
 };

 if (!open && !productId) return null;

 return (
  <Dialog open={open} onOpenChange={onOpenChange}>
   <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto custom-scrollbar glass-dark border-primary/20">
    {isLoading ? (
     <div className="flex flex-col items-center justify-center p-12">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Loading product details...</p>
     </div>
    ) : isError || !product ? (
     <div className="text-center p-8">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
       <span className="text-3xl">❌</span>
      </div>
      <p className="text-lg font-semibold">Failed to load product details.</p>
      <p className="text-muted-foreground text-sm mt-2">Please try again later.</p>
     </div>
    ) : (
     <>
      <DialogHeader>
       <DialogTitle className="pr-8 text-2xl leading-snug bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        {isEditing ? '✏️ Edit Product' : product.title}
       </DialogTitle>
       {!isEditing && (
        <DialogDescription className="capitalize flex items-center gap-2 text-base">
         <span className="px-3 py-1 bg-primary/10 rounded-full text-primary font-medium">
          {product.category}
         </span>
        </DialogDescription>
       )}
      </DialogHeader>

      <div className="grid gap-6 py-6 md:grid-cols-2">
       <div className="relative aspect-square bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl border border-primary/10 p-6 flex items-center justify-center group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <img
         src={product.image}
         alt={product.title}
         className="max-w-full max-h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-300"
        />
       </div>

       <div className="flex flex-col gap-4">
        {isEditing ? (
         <div className="flex flex-col gap-4 glass p-4 rounded-xl">
          <div className="grid gap-2">
           <Label htmlFor="title" className="text-sm font-semibold">Title</Label>
           <Input
            id="title"
            value={editForm.title || ''}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            className="border-primary/30 focus:border-primary"
           />
          </div>
          <div className="grid gap-2">
           <Label htmlFor="price" className="text-sm font-semibold">Price ($)</Label>
           <Input
            id="price"
            type="number"
            step="0.01"
            value={editForm.price || ''}
            onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
            className="border-primary/30 focus:border-primary"
           />
          </div>
          <div className="grid gap-2">
           <Label htmlFor="category" className="text-sm font-semibold">Category</Label>
           <Input
            id="category"
            value={editForm.category || ''}
            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            className="border-primary/30 focus:border-primary"
           />
          </div>
          <div className="grid gap-2">
           <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
           <textarea
            id="description"
            className="flex min-h-[120px] w-full rounded-md border border-primary/30 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={editForm.description || ''}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
           />
          </div>
         </div>
        ) : (
         <div className="space-y-5">
          <div className="flex items-center justify-between glass p-4 rounded-xl">
           <div>
            <p className="text-sm text-muted-foreground mb-1">Price</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
             {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
            </p>
           </div>
           <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 py-2 rounded-xl">
            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
            <div className="flex flex-col">
             <span className="text-lg font-bold text-yellow-700">{product.rating?.rate}</span>
             <span className="text-xs text-yellow-600">({product.rating?.count} reviews)</span>
            </div>
           </div>
          </div>

          <div className="glass p-4 rounded-xl">
           <h4 className="font-semibold mb-2 text-primary">Description</h4>
           <p className="text-muted-foreground text-sm leading-relaxed">
            {product.description}
           </p>
          </div>
         </div>
        )}
       </div>
      </div>

      <DialogFooter className="flex-col sm:justify-between sm:flex-row gap-3 mt-2 border-t border-primary/10 pt-4">
       {isEditing ? (
        <>
         <Button
          variant="ghost"
          onClick={() => setIsEditing(false)}
          disabled={localUpdating}
          className="hover:bg-muted"
         >
          Cancel
         </Button>
         <Button
          onClick={handleUpdate}
          disabled={localUpdating}
          className="gradient-primary text-white shadow-lg hover:shadow-xl"
         >
          {localUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          💾 Save Changes
         </Button>
        </>
       ) : (
        <>
         {isDeleteConfirming ? (
          <div className="flex items-center gap-3 w-full sm:justify-end justify-center glass-dark p-3 rounded-xl border border-destructive/20">
           <span className="text-sm text-destructive font-semibold">⚠️ Are you sure?</span>
           <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDeleteConfirming(false)}
            className="hover:bg-muted"
           >
            No
           </Button>
           <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={localDeleting}
            className="shadow-lg"
           >
            {localDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Yes, Delete
           </Button>
          </div>
         ) : (
          <div className="flex w-full justify-between items-center gap-3">
           <Button
            variant="outline"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30 hover:border-destructive"
            onClick={() => setIsDeleteConfirming(true)}
           >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
           </Button>
           <Button
            onClick={() => setIsEditing(true)}
            className="gradient-primary text-white shadow-lg hover:shadow-xl"
           >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Product
           </Button>
          </div>
         )}
        </>
       )}
      </DialogFooter>
     </>
    )}
   </DialogContent>
  </Dialog>
 );
}
