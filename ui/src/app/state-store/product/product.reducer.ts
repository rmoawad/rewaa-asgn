import { Action, createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Product } from '../../models/product';

export const productFeatureKey = 'product';

export interface ProductState {
  products: Product[];
}

export const initialState: ProductState = {
  products: [{ name: 'ee', price: 1, stockSize: 1, id: 1, description: 's' }]
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.addProduct,
    (state: ProductState, {product}) =>
      ({...state,
        products: [...state.products, product]
      })),
  on(ProductActions.updateProduct,
    (state: ProductState, {product}) =>
      ({...state,
        products: [...state.products.filter(p => p.id !== product.id), product]
      })),
  on(ProductActions.deleteProduct,
    (state: ProductState, {productId}) =>
      ({...state,
        products: [...state.products.filter(p => p.id !== productId)]
      })),
  on(ProductActions.setProductList,
    (state: ProductState, {productList}) => ({...state,
      products: productList
    })),
);

export function reducer(state: ProductState | undefined, action: Action): any {
  return productReducer(state, action);
}
