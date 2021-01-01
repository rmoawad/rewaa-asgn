import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product/product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { ProductCreateUpdateComponent } from './product/product-create-update/product-create-update.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'product', component: ProductListComponent},
    { path: 'product/add', component: ProductCreateUpdateComponent },
    { path: 'product/update/:id', component: ProductCreateUpdateComponent },
    // otherwise redirect to base
    { path: '**', redirectTo: 'product' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
