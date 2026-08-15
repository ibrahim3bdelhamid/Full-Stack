import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { WishlistService } from '../../services/wishlist.service';

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
  fallbackImage = 'https://placehold.co/400x400/FFEFDE/994114.png?text=No+Image';

  selectedSize = signal<string | null>(null);
  quantity = signal(1);
  justAdded = signal(false);

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.src !== this.fallbackImage) {
      img.src = this.fallbackImage;
    }
  }

  private _productsService = inject(ProductsService)
  private _cartService = inject(CartService)
  private _toastService = inject(ToastService)
  private _wishlistService = inject(WishlistService)

  effectivePrice = computed(() => {
    const p = this.product();
    if (p?.discountPercent > 0) {
      return Math.round(p.price * (1 - p.discountPercent / 100));
    }
    return p?.price;
  });

  ratingStars = computed(() => {
    const rating = Math.round(this.product()?.rating ?? 0);
    return { full: rating, empty: 5 - rating };
  });

  isWishlisted = computed(() => this._wishlistService.isWishlisted(this.product()?._id));

  starsArray(n: number): number[] {
    return new Array(Math.max(0, n)).fill(0);
  }

  toggleWishlist() {
    this._wishlistService.toggle(this.product()._id);
  }

  selectSize(size: string) {
    this.selectedSize.set(size);
  }

  increaseQty() {
    const max = this.product()?.stock ?? 99;
    this.quantity.update(q => Math.min(q + 1, max));
  }

  decreaseQty() {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  ngOnInit(): void {
    this._productsService.getProductById(this.id()).subscribe({
      next:(res:any)=>{
        if (!res.product) {
          this.notFound.set(true);
          return;
        }
        this.product.set(res.product);
        if (res.product.sizes?.length) {
          this.selectedSize.set(res.product.sizes[0]);
        }
      },error:(err)=>{
        this.notFound.set(true);
      }
    })
  }
  addToCart() {
    this._cartService.addToCart(this.product()._id, this.quantity()).subscribe({
      next: () => {
        this._cartService.refreshCart();
        this._toastService.show(`${this.product().name} added to cart!`);
        this.justAdded.set(true);
        setTimeout(() => this.justAdded.set(false), 1800);
      },
      error: (err) => {
        this._toastService.show(err.error?.message || 'Failed to add to cart', 'error');
      }
    });
  }

}
