import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product ;
  loading = true;
  constructor(
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public productId: number,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getById(this.productId)
      .pipe(first()).subscribe((res: Product) => {
        this.product = res;
        this.loading = false;
      });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
