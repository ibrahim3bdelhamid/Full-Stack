import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  selectedProductId = signal<string | null>(null);

  open(productId: string) {
    this.selectedProductId.set(productId);
  }

  close() {
    this.selectedProductId.set(null);
  }

}
