import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Product[]>(`${environment.apiUrl}/product`);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/product/${id}`);
    }

    getById(id: number) {
        return this.http.get<Product>(`${environment.apiUrl}/product/${id}`);
    }

    create(params: any) {
        return this.http.post(`${environment.apiUrl}/product`, params);
    }

    update(id: number, params: any) {
        return this.http.put(`${environment.apiUrl}/product/${id}`, params);
    }
}
