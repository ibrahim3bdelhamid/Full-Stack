import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private api = inject(HttpClient)

  cartCount = signal<number>(0);
  cartItems = signal<any[]>([]);

  getCart():Observable<any>{
    return this.api.get('http://localhost:3000/cart');
  }

  addToCart(productId: string, amount: number = 1):Observable<any>{
    return this.api.post("http://localhost:3000/cart", { productId, amount });
  }

  updateCartItem(productId: string, amount: number) {
    return this.api.put(`http://localhost:3000/cart/${productId}`, { amount });
  }

  removeFromCart(productId: string) {
    return this.api.delete(`http://localhost:3000/cart/${productId}`);
  }

  checkout():Observable<any>{
    return this.api.post('http://localhost:3000/checkout', {});
  }

  refreshCart() {
    this.getCart().subscribe({
      next: (res: any) => {
        const products = res.cart?.products ?? [];
        this.cartItems.set(products);
        const total = products.reduce((sum: number, item: any) => sum + item.amount, 0);
        this.cartCount.set(total);
      },
      error: (err) => console.log(err)
    }); 
  }
}
