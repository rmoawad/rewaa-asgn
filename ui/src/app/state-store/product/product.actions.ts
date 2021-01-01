import { createAction } from '@ngrx/store';
import { Product } from '../../models/product';

export const addProduct = createAction(
  '[Product] Add Product',
  (product: Product) => ({product})
);

export const updateProduct = createAction(
  '[Product] Update Product',
  (product: Product) => ({product})
);

export const deleteProduct = createAction(
  '[number] Delete Product',
  (productId: number) => ({productId})
);

export const setProductList = createAction(
  '[Product[]] Set Product List',
  (productList: Product[]) => ({productList})
);
