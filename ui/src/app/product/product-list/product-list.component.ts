import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { ProductDetailsComponent } from '@app/product/product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductCreateUpdateComponent } from '../product-create-update/product-create-update.component';
import { ProductState } from '../../state-store/product/product.reducer';
import { selectProducts } from '../../state-store/product/product.selectors';
import { deleteProduct, setProductList } from '../../state-store/product/product.actions';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
    loading = false;
    products$: Observable<Product[]>;

    constructor(private productService: ProductService,
                public dialog: MatDialog,
                private store: Store<ProductState>) {
      this.products$ = store.select(selectProducts);
    }

    ngOnInit() {
        this.loading = true;
        this.productService.getAll().pipe(first()).subscribe(products => {
            this.store.dispatch(setProductList(products));
            this.loading = false;
        });
    }

    deleteProduct(id: number) {
        this.productService.delete(id)
          .pipe(first())
          .subscribe(() =>  this.store.dispatch(deleteProduct(id)));
    }

    viewDetails(id: number) {
        this.dialog.open(
            ProductDetailsComponent,
            {
                width: '50%',
                data: id
            });
    }

    createOrUpdateProduct(id: number) {
        this.dialog.open(
            ProductCreateUpdateComponent,
          {
                width: '50%',
                data: id
          });
    }
}
