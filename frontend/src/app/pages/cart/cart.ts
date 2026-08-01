import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private _cartService = inject(CartService);

  cartItems = this._cartService.cartItems

  ngOnInit(): void {
    this._cartService.refreshCart();
  }

  updateQuantity(productId: string, newAmount: number) {
    if (newAmount < 1) return;
    this._cartService.updateCartItem(productId, newAmount).subscribe({
      next: () => this._cartService.refreshCart(),
      error: (err) => console.log(err.error?.message)
    });
  }

  removeItem(productId: string) {
    this._cartService.removeFromCart(productId).subscribe({
      next: () => this._cartService.refreshCart(),
      error: (err) => console.log(err.error?.message)
    });
  }


  get total(): number {
    return this.cartItems().reduce((sum, item) => sum + (item.product.price * item.amount), 0);
  }
}
