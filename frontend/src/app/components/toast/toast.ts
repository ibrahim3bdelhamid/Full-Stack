import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  private _toastService = inject(ToastService);
  
  message = this._toastService.message;
}
