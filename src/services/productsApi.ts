import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
   id: number;
   title: string;
   price: number;
   category: string;
   description: string;
   image: string;
   rating?: {
      rate: number;
      count: number;
   };
}

export const productsApi = createApi({
   reducerPath: 'productsApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
   refetchOnFocus: true,
   refetchOnReconnect: true,
   tagTypes: ['Product'],
   endpoints: (builder) => ({
      getProducts: builder.query<Product[], void>({
         query: () => 'products',
         providesTags: (result) =>
            result
               ? [
                  ...result.map(({ id }) => ({ type: 'Product' as const, id })),
                  { type: 'Product' as const, id: 'LIST' },
               ]
               : [{ type: 'Product' as const, id: 'LIST' }],
      }),
      getProduct: builder.query<Product, string>({
         query: (id) => `products/${id}`,
         providesTags: (_result, _error, id) => [{ type: 'Product' as const, id }],
      }),
      updateProduct: builder.mutation<Product, Partial<Product> & { id: number }>({
         query: ({ id, ...patch }) => ({
            url: `products/${id}`,
            method: 'PUT',
            body: patch,
         }),
         async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
            const patchResult = dispatch(
               productsApi.util.updateQueryData('getProducts', undefined, (draft) => {
                  const product = draft.find((p) => p.id === id);
                  if (product) {
                     Object.assign(product, patch);
                  }
               })
            );
            const patchDetailResult = dispatch(
               productsApi.util.updateQueryData('getProduct', String(id), (draft) => {
                  if (draft) Object.assign(draft, patch);
               })
            );
            try {
               await queryFulfilled;
            } catch {
               patchResult.undo();
               patchDetailResult.undo();
            }
         },
      }),
      deleteProduct: builder.mutation<{ id: number }, number>({
         query: (id) => ({
            url: `products/${id}`,
            method: 'DELETE',
         }),
         async onQueryStarted(id, { dispatch, queryFulfilled }) {
            const patchResult = dispatch(
               productsApi.util.updateQueryData('getProducts', undefined, (draft) => {
                  return draft.filter((p) => p.id !== id);
               })
            );
            try {
               await queryFulfilled;
            } catch {
               patchResult.undo();
            }
         },
      }),
   }),
});

export const {
   useGetProductsQuery,
   useGetProductQuery,
   useUpdateProductMutation,
   useDeleteProductMutation,
} = productsApi;
