import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private platformId = inject(PLATFORM_ID);

  private ids = signal<Set<string>>(this.loadFromStorage());

  private loadFromStorage(): Set<string> {
    if (!isPlatformBrowser(this.platformId)) {
      return new Set();
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  }

  private persist() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.ids()]));
  }

  isWishlisted(productId: string): boolean {
    return this.ids().has(productId);
  }

  toggle(productId: string) {
    const next = new Set(this.ids());
    if (next.has(productId)) {
      next.delete(productId);
    } else {
      next.add(productId);
    }
    this.ids.set(next);
    this.persist();
  }
}
