import { Component, inject } from '@angular/core';
import { ProductDetails } from '../product-details/product-details';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  imports: [ProductDetails],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  private _modalService = inject(ModalService)
  
  selectedProductId = this._modalService.selectedProductId;

  close(){
    this._modalService.close();
  }
}
