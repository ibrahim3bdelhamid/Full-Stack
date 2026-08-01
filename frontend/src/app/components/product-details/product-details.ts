import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit{

  id = input.required<string>();

  product = signal<any>(null);
  notFound = signal(false);

  private _productsService = inject(ProductsService)
  private _cartService = inject(CartService)
  private _toastService = inject(ToastService)

  ngOnInit(): void {
    this._productsService.getProductById(this.id()).subscribe({
      next:(res:any)=>{
        if (!res.product) {
          this.notFound.set(true);
          return;
        }
        this.product.set(res.product);
      },error:(err)=>{
        this.notFound.set(true);
      }
    })
  }
  addToCart() {
    this._cartService.addToCart(this.product()._id, 1).subscribe({
      next: () => {
        this._cartService.refreshCart();
        this._toastService.show('Added to cart!');
      },
      error: (err) => {
        this._toastService.show(err.error?.message || 'Failed to add to cart', 'error');
      }
    });
  }
  
}
