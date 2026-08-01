import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  constructor(private api:HttpClient){ }

  getAllProducts():Observable<any>{
    return this.api.get<any>("http://localhost:3000/products");
  }

  // The backend only exposes GET /products (the full list) — there is no
  // GET /products/:id (or /product/:id) route on the server, so we fetch
  // the full list and pick the matching item out of it instead of hitting
  // a route that doesn't exist.
  getProductById(id: string): Observable<{ product: any }>{
    return this.getAllProducts().pipe(
      map((res: any) => ({
        product: (res.product ?? []).find((p: any) => p._id === id) ?? null
      }))
    );
  }

}


