import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { ProductListComponent } from './product/product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { ProductCreateUpdateComponent } from './product/product-create-update/product-create-update.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDetailsComponent} from '@app/product/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {productFeatureKey, productReducer} from '@app/state-store/product/product.reducer';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatDialogModule,
        StoreModule.forRoot({}, { }),
        StoreModule.forFeature(productFeatureKey, productReducer),
    ],
    declarations: [
        AppComponent,
        ProductListComponent,
        ProductCreateUpdateComponent,
        ProductDetailsComponent,
        LoginComponent,
    ],
    entryComponents: [ProductDetailsComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
