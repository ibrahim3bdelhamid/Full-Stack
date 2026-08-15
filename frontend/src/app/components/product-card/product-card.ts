import { Component, computed, inject, input, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { ModalService } from '../../services/modal.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<any>();

  fallbackImage = 'https://placehold.co/400x400/FFEFDE/994114.png?text=No+Image';

  justAdded = signal(false);

  private _cartService = inject(CartService);
  private _toastServcie = inject(ToastService);
  private _modalService = inject(ModalService)
  private _wishlistService = inject(WishlistService);

  effectivePrice = computed(() => {
    const p = this.product();
    if (p?.discountPercent > 0) {
      return Math.round(p.price * (1 - p.discountPercent / 100));
    }
    return p?.price;
  });

  badgeLabel = computed(() => {
    const p = this.product();
    if (!p?.badge) return null;
    if (p.badge === 'SALE') return `SALE -${p.discountPercent}%`;
    if (p.badge === 'BEST_SELLER') return 'BEST SELLER';
    return p.badge;
  });

  ratingStars = computed(() => {
    const rating = Math.round(this.product()?.rating ?? 0);
    return { full: rating, empty: 5 - rating };
  });

  isWishlisted = computed(() => this._wishlistService.isWishlisted(this.product()?._id));

  starsArray(n: number): number[] {
    return new Array(Math.max(0, n)).fill(0);
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.src !== this.fallbackImage) {
      img.src = this.fallbackImage;
    }
  }

  viewDetails() {
    this._modalService.open(this.product()._id);
  }

  toggleWishlist(event: Event) {
    event.stopPropagation();
    this._wishlistService.toggle(this.product()._id);
  }

  addToCart(event: Event) {
    event.stopPropagation();

    this._cartService.addToCart(this.product()._id, 1).subscribe({
      next: () => {
        this._cartService.refreshCart();
        this._toastServcie.show(`${this.product().name} added to cart!`);
        this.justAdded.set(true);
        setTimeout(() => this.justAdded.set(false), 1800);
      }, error: (err) => {
        this._toastServcie.show(err.error?.message || 'Failed to add to cart', 'error');
      }
    })
  }
}
