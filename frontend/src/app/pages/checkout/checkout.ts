import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})

export class Checkout {
  private _cartService = inject(CartService);
  private _toastService = inject(ToastService);
  private router = inject(Router);

  cartItems = this._cartService.cartItems
  errorMessage = signal<string | null>(null);

  get total(): number {
    return this.cartItems().reduce((sum, item) => sum + (item.product.price * item.amount), 0);
  }

  placeOrder() {
    this._cartService.checkout().subscribe({
      next: (res: any) => {
        // Backend always replies with HTTP 200 and puts the real
        // outcome in `message` (e.g. "Cart is empty", "Not enough
        // stock for X"), so success has to be checked from the body.
        if (res.message !== "Order placed successfully") {
          this.errorMessage.set(res.message || 'Something went wrong on our end — please try again');
          return;
        }
        this._cartService.refreshCart();
        this._toastService.show('Order placed successfully', 'success', 1500);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Something went wrong on our end — please try again');
      }
    });
  }
}
