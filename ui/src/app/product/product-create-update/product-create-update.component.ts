import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ProductService } from '../../services/product.service';
import { ProductState } from '../../state-store/product/product.reducer';
import { Product } from '../../models/product';
import {addProduct, updateProduct} from '../../state-store/product/product.actions';


@Component({
    templateUrl: './product-create-update.component.html',
    styleUrls: ['./product-create-update.component.scss']
})
export class ProductCreateUpdateComponent implements OnInit {
    loading = false;
    submitted = false;
    form!: FormGroup;
    success!: string;
    error!: string;
    messageTimeOutLong = 1500;

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private dialogRef: MatDialogRef<ProductCreateUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public id: number,
        private store: Store<ProductState>
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            stockSize: ['', Validators.required],
            price: ['', Validators.required],
            description: [''],
        });

        if (!!this.id) {
            this.productService.getById(this.id)
                .pipe(first())
                .subscribe(product => this.form.patchValue(product));
        }
    }

    get formFields() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (!this.id) {
            this.createProduct();
        } else {
            this.updateProduct();
        }
    }

    private createProduct() {
        this.productService.create(this.form.value)
            .pipe(first())
            .subscribe((product: Product) => {
                  this.store.dispatch(addProduct(product));
                  this.markSuccessOperation('Product is added');
              },
              err => this.showErrorMessage(err)
            ).add(() => this.loading = false);
    }

    private updateProduct() {
        this.productService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(
              (product: Product) => {
                this.store.dispatch(updateProduct(product));
                this.markSuccessOperation('Product is updated');
              },
                err => this.showErrorMessage(err)
            ).add(() => this.loading = false);
    }

    private markSuccessOperation(message: string) {
        this.success = message;
        setTimeout(() => this.close(), this.messageTimeOutLong);
    }

    private showErrorMessage(message: string) {
        this.error = message;
        setTimeout(() => delete this.error, this.messageTimeOutLong);
    }

    close() {
      this.dialogRef.close();
    }
}
