import { Component, inject, input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<any>();

  private _cartService = inject(CartService);
  private _toastServcie = inject(ToastService);
  private _modalService = inject(ModalService)

  viewDetails() {
    console.log('clicked, product id:', this.product()._id);
    this._modalService.open(this.product()._id);
  }

  addToCart(event:Event){
    event.stopPropagation();

    this._cartService.addToCart(this.product()._id,1).subscribe({
      next:()=>{
        this._cartService.refreshCart();
        this._toastServcie.show("Added to cart")
      },error:(err)=>{
        this._toastServcie.show(err.error?.message || 'Failed to add to cart', 'error');
      }
    })
  }
}
